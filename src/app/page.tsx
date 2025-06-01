import SignOut from "@/components/ui/sign-out";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#A8D5BA] via-[#D3E8E1] to-[#F8F8F8]">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-[90%] border border-gray-200">
        <div className="flex flex-col items-center gap-4">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Foto de perfil"
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className="text-2xl font-bold text-[#4A90A4]">
            Olá, {session.user.name} 👋
          </h1>
          <p className="text-gray-600">{session.user.email}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            🚀 Bem-vindo ao VittaSystem
          </h2>
          <p className="text-sm text-gray-600">
            Aqui você pode gerenciar seus atendimentos, pacientes, agendamentos
            e acompanhar o desempenho da sua clínica.
          </p>
        </div>

        <div className="mt-8">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
