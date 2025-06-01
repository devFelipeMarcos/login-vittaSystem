import SignOut from "@/components/ui/sign-out";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  console.log(session);
  return (
    <div className="flex flex-col items-center bg-blue-500 justify-center h-screen">
      <h1>Seja bem vindo</h1>
      <h1>{session.user.name}</h1>
      <SignOut />
    </div>
  );
};

export default Dashboard;
