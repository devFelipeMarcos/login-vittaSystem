"use client";

import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient, signInWithGoogle } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type FormSchema = z.infer<typeof formSchema>;

const Authentication = () => {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FormSchema) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Login realizado com sucesso");
          router.push("/");
        },
        onError: () => {
          toast.error("E-mail ou senha inválidos");
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    toast.success("Redirecionando para o Google...");
    await signInWithGoogle();
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col items-center w-[90%] max-w-md border border-gray-200">
        <h1 className="text-4xl font-bold text-[#4A90A4] mb-4">VittaSystem </h1>
        <p className="text-sm text-gray-700 mb-8 text-center">
          Faça login para continuar
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center cursor-pointer gap-3 w-full justify-center px-4 py-3 bg-white text-[#4A90A4] rounded-xl shadow-md hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Entrar com Google</span>
        </button>

        <div className="w-full h-px bg-gray-300 my-8" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A8D5BA]"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A8D5BA]"
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[#06683a] hover:bg-[#8CC9A1] rounded-xl text-white cursor-pointer font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6">
          Não tem uma conta?{" "}
          <button
            onClick={() => router.push("/authentication/signup")}
            className="text-[#4A90A4] underline cursor-pointer"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
