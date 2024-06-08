"use client";
import Image from "next/image";
import useHealthCheck, { HealthCheckResponseI } from "./utils/useHealthCheck";
import { redirect } from "next/navigation";
import Skeleton from "./components/Skeleton";
import Bento from "./components/Bento";
import { ServerDownException } from "./_exceptions/ServerDownException";

export default function Home() {
  const healthCheckData: HealthCheckResponseI = useHealthCheck(true);
  if (healthCheckData.loading===false && !healthCheckData.ok) throw new ServerDownException("Server is Down");
  console.log(healthCheckData)
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-16 py-8">
      {
        healthCheckData.loading ?
          <Skeleton /> :
          <>
          <Bento/>
          </>
      }
    </main>
  );
}
