"use client";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="flex gap-2 items-center p-3 bg-black text-white">
      <Link href="/">Home</Link>
      <Link href="/contact-us">Contact</Link>
      <Link href="/products">Products</Link>
      <Link href="/latest-product">Latest Products</Link>
      <Link href="/login" className="bg-blue-500 py-2 px-3 ml-auto">
        Login
      </Link>
      <Link href="/signup" className="bg-blue-500 py-2 px-3">
        SignUp
      </Link>
    </div>
  );
};
