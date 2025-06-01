"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const handleSignOut = async () => {
  await authClient.signOut();
  toast.success("Deslogado com sucesso");
  redirect("/authentication");
};

const SignOut = () => {
  return (
    <div>
      <button
        className="bg-red-500 cursor-pointer text-white p-2 rounded-md"
        onClick={handleSignOut}
      >
        Sair
      </button>
    </div>
  );
};

export default SignOut;
