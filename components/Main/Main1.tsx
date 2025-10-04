"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MainFirst() {
  const [minHeight, setMinHeight] = useState<string>("100vh");

  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector("header") as HTMLElement | null;
      const headerHeight = header ? header.offsetHeight : 0;
      setMinHeight(`calc(100vh - ${headerHeight}px)`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <main
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Woman_Working_at_Desk.png')",
        minHeight,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>

      <div className="relative max-w-4xl px-6 md:px-12 lg:px-20 py-16 flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white tracking-tight">
          UNLOCK YOUR CODING <br /> POTENTIAL WITH <br />{" "}
          <span className="text-white">CODELINGO</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed font-light">
          Dive into an engaging learning experience that makes coding fun and
          interactive. With vibrant illustrations and gamified lessons, you’ll
          master frontend, backend, SQL, and DevOps in no time!
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/auth/signup">
            <button
              type="button"
              className="border border-white text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 font-semibold rounded-full text-sm px-6 py-3 transition-colors"
            >
              Join
            </button>
          </Link>

          <button
            type="button"
            className="text-white border border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-300 font-semibold rounded-full text-sm px-6 py-3 transition-colors"
            >
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
