import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const authSession = cookieStore.get("lendsqr_session");

  if (!authSession) {
    redirect("/login");
  }

  redirect("/dashboard/users");
}
