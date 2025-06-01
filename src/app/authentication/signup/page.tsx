"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient, signInWithGoogle } from "@/lib/auth-client";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const SignUp = () => {
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: RegisterSchema) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          toast.success("Conta criada com sucesso");
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error("Este e-mail já está cadastrado");
          } else {
            console.log(ctx);
            toast.error("Erro ao criar conta");
          }
        },
      }
    );
  };

  const handleGoogleSignUp = async () => {
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
        <h1 className="text-4xl font-bold text-[#4A90A4] mb-4">
          Criar uma conta 🚀
        </h1>
        <p className="text-sm text-gray-700 mb-8 text-center">
          Preencha os campos abaixo para se cadastrar
        </p>

        <button
          onClick={handleGoogleSignUp}
          className="flex items-center gap-3 cursor-pointer w-full justify-center px-4 py-3 bg-white text-[#4A90A4] rounded-xl shadow-md hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Cadastrar com Google</span>
        </button>

        <div className="w-full h-px bg-gray-300 my-8" />

        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome completo"
              {...register("name")}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A8D5BA]"
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

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

          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Confirmar senha"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A8D5BA]"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-[#06683a] hover:bg-[#8CC9A1] rounded-xl cursor-pointer text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <a href="/authentication" className="text-[#4A90A4] underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
