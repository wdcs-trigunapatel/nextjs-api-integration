"use client";
import { createProductFormSchema } from "@/constants/ValidationSchema";
import { PAGINATION, TOAST } from "@/constants/commanConstants";
import Notification from "@/services/notification";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "debounce";

export interface ProductInterface {
  _id?: any;
  productname: string;
  count: number;
}
// const resolver: Resolver<ProductInterface> = async (values) => {
//   const errors: Record<string, any> = {};
//   if (!values.productname) {
//     errors.productname = {
//       type: "required",
//       message: "Product name is required.",
//     };
//   }

//   if (!values.count) {
//     errors.count = {
//       type: "required",
//       message: "Count is required.",
//     };
//   }

//   return {
//     values: values.productname && values.count ? values : {},
//     errors: errors,
//   };
// };

const LatestProduct = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(PAGINATION.currentPage);
  const [totalPages, setTotalPages] = useState(PAGINATION.totalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = PAGINATION.itemsPerPage;

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<ProductInterface>({
    mode: "onSubmit",
    resolver: yupResolver(createProductFormSchema),
  });

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const debouncedFetchProducts = useCallback(
    debounce((search: string) => {
      setSearchTerm(search);
      setCurrentPage(1);
    }, 1000),
    []
  );

  const fetchProducts = async (page?: number, search?: string) => {
    const response = await axios.get("http://localhost:5000/api/productdatas", {
      params: { page, limit: itemsPerPage, search },
    });
    const result = await response.data;
    setProducts(result.productdata);
    setTotalPages(result.totalPages);
  };

  const addproducts = async (data: any) => {
    try {
      const addProductData = await axios.post(
        `http://localhost:5000/api/createProducts`,
        data
      );
      const { data: result } = addProductData;
      if (result) {
        const { createProduct, message } = result;
        setProducts([...products, createProduct]);
        Notification({ type: TOAST.SUCCESS, message: message });
        setCurrentPage(1); // Reset to first page
        fetchProducts(1, searchTerm); // Fetch the first page to show the new product
      }
    } catch (error: any) {
      Notification({ type: TOAST.ERROR, message: error.response.data.message });
    }
  };

  const startEdit = async (product: ProductInterface) => {
    setEditingId(product._id);
    reset({
      productname: product.productname,
      count: product.count,
    });
  };

  const handleEditSubmit = async (id: any, data: ProductInterface) => {
    const res = await axios.put(
      `http://localhost:5000/api/editProducts/${id}`,
      data
    );
    const json = await res.data;
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
  };

  const deleteHandler = async (id: any) => {
    const res = await axios.delete(
      `http://localhost:5000/api/deleteProducts/${id}`
    );
    const result = await res.data;
    if (result) {
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      if (updatedProducts.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1); // Move to the previous page if the current one is empty
      } else {
        fetchProducts(currentPage);
      }
    } else {
      console.error("Failed to delete product:", result.message);
    }
  };

  const submitHandler = handleSubmit(async (data) => {
    if (editingId) {
      await handleEditSubmit(editingId, data);
    } else {
      addproducts(data);
    }
    reset();
    setEditingId(null);
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFetchProducts(e.target.value);
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
            {...register("productname")}
          />
          {errors?.productname && (
            <p className="text-red-500 text-sm">{errors.productname.message}</p>
          )}
        </div>
        <div className="mb-3">
          <div className="text-sm mb-1">Count</div>
          <input
            type="text"
            className="border h-9 w-full outline-0 p-3"
            {...register("count")}
          />
          {errors?.count && (
            <p className="text-red-500 text-sm">{errors.count.message}</p>
          )}
        </div>
        <div className="mb-3 gap-2 flex">
          <button className="bg-blue-500 p-2 text-white">submit</button>
        </div>
      </form>
      <div className="mt-6">
        <div className="flex justify-between">
          <div className="font-bold">Product List</div>
          <div>
            <input
              type="search"
              placeholder="serach product....."
              onChange={handleSearchChange}
              className="border p-2 outline-0"
            />
          </div>
        </div>
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
        {products.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-2 p-2 border disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-2 p-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-2 p-2 border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProduct;
