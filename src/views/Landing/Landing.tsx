import Link from "next/link";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function Landing() {
  const [anonAadhaar] = useAnonAadhaar();
  const rounter = useRouter();
  useEffect(() => {
    if (anonAadhaar.status == "logged-in") {
    }
    console.log(anonAadhaar.status);
  }, [anonAadhaar.status]);
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-8 md:px-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white">
              Welcome to the Future of Finance
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed dark:text-gray-400">
              Experience the next generation of decentralized banking. For
              Indians, By Indians.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <div className="inline-flex h-12 items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors  focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none text-white">
              <p className="mr-2">Authenticate using Anon Aadhaar</p>
            </div>
            <div onClick={() => {}}></div>
            <div
              onClick={() => {
                setTimeout(() => {
                  rounter.push("/app");
                }, 2000);
              }}
            >
              <LogInWithAnonAadhaar nullifierSeed={1234} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
