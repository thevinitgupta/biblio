"use client";
import useHealthCheck, { HealthCheckResponseI } from "../hooks/useHealthCheck";
import Skeleton from "../components/Skeleton";
import Bento from "../components/Bento";
import { ServerDownException } from "../exceptions/ServerDownException";
import Navbar from "../components/Navbar";
import DaisyThemeProvider from "@/hooks/useDaisyTheme";


export default function Home() {
  const healthCheckData: HealthCheckResponseI = useHealthCheck(false);
  if (healthCheckData.loading === false && !healthCheckData.ok) throw new ServerDownException("Server is Down");
  // console.log(healthCheckData)
  return (

      <DaisyThemeProvider>
        <main className="flex min-h-screen flex-col items-center justify-start px-16 py-8">
          {
            healthCheckData.loading ?
              <Skeleton /> :
              <>
                <Navbar />
                <Bento />
              </>
          }
        </main>
      </DaisyThemeProvider>
  );
}
