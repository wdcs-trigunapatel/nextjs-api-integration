"use client";
import { signUpFormSchema } from "@/constants/ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(signUpFormSchema),
  });

  const submitHandler = handleSubmit(async (data) => {
    const response = await axios.post(`http://localhost:5000/api/signUp`, data);
    console.log("json", response.data);
    if (response.status === 201) {
      router.push("/login");
    }
  });

  return (
    <div className="px-4 py-4 max-w-96 mx-auto">
      <div className="text-xl font-bold mb-4">SignUp</div>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <div className="text-sm mb-1">Email</div>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter email"
            className="border h-9 w-full outline-0 p-3"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="text-sm mb-1">Password</div>
          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
            className="border h-9 w-full outline-0 p-3"
          />
          {errors?.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <button className="bg-blue-500 p-2 text-white">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
