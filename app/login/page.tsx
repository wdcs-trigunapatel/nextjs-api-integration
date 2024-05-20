"use client";
import { loginFormSchema } from "@/constants/ValidationSchema";
import { TOAST } from "@/constants/commanConstants";
import Notification from "@/services/notification";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

// const resolver: Resolver<FormValues> = async (values) => {
//   const errors: Record<string, any> = {};
//   if (!values.email) {
//     errors.email = {
//       type: "required",
//       message: "Email is required.",
//     };
//   }

//   if (!values.password) {
//     errors.password = {
//       type: "required",
//       message: "Password is required.",
//     };
//   }

//   return {
//     values: values.email && values.password ? values : {},
//     errors: errors,
//   };
// };

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: yupResolver(loginFormSchema),
  });

  //using simple form

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const submitHandler = async () => {
  //   const response = await fetch(`http://localhost:5000/api/login`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //   });
  //   setPassword("");
  //   setEmail("");
  //   const json = await response.json();
  //   console.log("json", json);
  // };

  //using useform

  // const submitHandler = handleSubmit(async (data) => {
  //   const { email, password } = data;
  //   const response = await fetch(`http://localhost:5000/api/login`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //   });
  //   reset({ email: "", password: "" });
  //   const json = await response.json();
  //   console.log("json", json);
  // });

  //using axios

  const submitHandler = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/login`,
        data
      );
      console.log(response);
      const { data: result } = response;
      if (response.status === 200) {
        router.push("/dashboard");
        Notification({ type: TOAST.SUCCESS, message: result.message });
      }
    } catch (error: any) {
      console.log("error", error);
      Notification({
        type: TOAST.ERROR,
        message: error.response.data.message,
      });
    }
  });

  return (
    <div className="px-4 py-4 max-w-96 mx-auto">
      <div className="text-xl font-bold mb-4">Login</div>
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
          <button className="bg-blue-500 p-2 text-white">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
