"use client";
import { useEffect, useState } from "react";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const result = await response.json();
    setProduct(result.data);
    console.log(result);
    // .then((response) => response.json())
    // .then((data) => setProduct(data.products));
  };

  //post data
  const handlerSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.title || !form.body) {
      return;
    }
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
    await response.json();
    // setForm(result);
    setForm({
      title: "",
      body: "",
    });
    fetchData();
  };

  const udateForm = (e: any, field: any) => {
    if (field === "title") {
      setForm({
        ...form,
        title: e.target.value,
      });
    } else if (field === "body") {
      setForm({
        ...form,
        body: e.target.value,
      });
    }
  };

  const deleteProduct = async (productId: any) => {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    console.log("response", { data: result.data });
    fetchData();
  };

  return (
    <div>
      <h1 className="text-4xl mb-4">Product List</h1>
      <form onClick={handlerSubmit}>
        <div className="mb-3">
          <div>Title</div>
          <input
            type="text"
            className="border h-9 w-full"
            value={form.title}
            onChange={(e) => udateForm(e, "title")}
          />
        </div>
        <div className="mb-3">
          <div>Description</div>
          <input
            type="text"
            className="border h-9 w-full"
            value={form.body}
            onChange={(e) => udateForm(e, "body")}
          />
        </div>
        <div className="mb-3">
          <button className="bg-blue-500 p-2 text-white">submit</button>
        </div>
      </form>
      <div>
        {product?.map((item) => {
          const { title, body, id } = item;
          return (
            <div
              key={id}
              className="mb-2 border-b pb-1 flex justify-between gap-2 "
            >
              <div>
                <div className="font-bold">{title}</div>
                <div>{body}</div>
              </div>
              <button
                className="text-red-500"
                onClick={() => deleteProduct(id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
