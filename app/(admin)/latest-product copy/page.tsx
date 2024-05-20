"use client";
import React, { useEffect, useState } from "react";

export interface ProductInterface {
  _id: any;
  productname: string;
  count: string;
}

const LatestProduct = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [productname, setProductName] = useState("");
  const [count, setCount] = useState("");
  const [pId, setPId] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/productdatas");
    const result = await response.json();
    setProducts(result);
  };

  const addproducts = async (productname: any, count: any) => {
    const res = await fetch(`http://localhost:5000/api/createProducts`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        productname,
        count,
      }),
    });
    const json = await res.json();
    setProducts([...products, json]);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    addproducts(productname, count);
    setProductName("");
    setCount("");
    fetchProducts();
  };

  const startEdit = async (product: ProductInterface) => {
    setProductName(product.productname);
    setCount(product.count);
    setPId(product._id);
  };

  const editroducts = async (id: any, productname: any, count: any) => {
    const res = await fetch(`http://localhost:5000/api/editProducts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        productname,
        count,
      }),
    });
    const json = await res.json();
    const { product } = json;
    const updatedPost = products.map((item) => {
      if (item._id === id) {
        return {
          _id: product._id,
          productname: product.productname,
          count: product.count,
        };
      }
      return item;
    });
    setProducts(updatedPost);
    setProductName("");
    setCount("");
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    editroducts(pId, productname, count);
  };

  const deleteHandler = async (id: any) => {
    const res = await fetch(`http://localhost:5000/api/deleteProducts/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (res.ok) {
      console.log("Product deleted:", result);
      setProducts(products.filter((product) => product._id !== id));
    } else {
      console.error("Failed to delete product:", result.message);
    }
  };

  return (
    <div>
      <div className="mb-3 font-bold">Create Product</div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <div className="text-sm mb-1">Product Name</div>
          <input
            type="text"
            className="border h-9 w-full outline-0 p-3"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="text-sm mb-1">Count</div>
          <input
            type="text"
            className="border h-9 w-full outline-0 p-3"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className="mb-3 gap-2 flex">
          <button className="bg-blue-500 p-2 text-white">submit</button>
          <button
            className="bg-blue-500 p-2 text-white"
            onClick={handleEditSubmit}
          >
            update
          </button>
        </div>
      </form>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {products.map((product: any) => {
          const { _id, productname, count } = product;
          return (
            <div key={_id} className="border p-2 shadow">
              <div className="font-bold">Product Name: {productname}</div>
              <div>Total Items: {count}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => startEdit(product)}>Edit</button>
                <button
                  className="text-red-500"
                  onClick={() => deleteHandler(_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestProduct;
