"use client";

import { FaCircleNotch, FaInfinity } from "react-icons/fa";
import { LuCode } from "react-icons/lu";
import Link from "next/link";

export default function MainSecond() {
  return (
    <main className="bg-gray-50 py-16 px-4 md:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-xs font-semibold tracking-wide mb-2">Learn</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
            UNLOCK YOUR <br />
            CODING <br />
            POTENTIAL WITH <br />
            FUN LEARNING
          </h1>
        </div>

        <div className="flex items-center">
          <p className="text-gray-700 text-base leading-relaxed">
            At CodeLingo, we transform coding education into an engaging
            adventure. Our gamified approach motivates learners to progress
            through interactive lessons and challenges. With rewards and
            achievements, every step becomes a celebration of your coding
            journey.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-16">
        <div>
          <FaCircleNotch className="text-2xl text-black mb-4" />
          <h3 className="font-extrabold text-xl mb-2">
            TRACK YOUR <br /> PROGRESS EFFORTLESSLY <br /> AND EFFECTIVELY
          </h3>
          <p className="text-gray-800 text-sm">
            Stay motivated with real-time progress tracking.
          </p>
        </div>

        <div>
          <FaInfinity className="text-2xl text-black mb-4" />
          <h3 className="font-extrabold text-xl mb-2">
            JOIN A THRIVING <br /> COMMUNITY OF <br /> LEARNERS
          </h3>
          <p className="text-gray-800 text-sm">
            Connect, share, and grow with fellow coders.
          </p>
        </div>

        <div>
          <LuCode className="text-2xl text-black mb-4" />
          <h3 className="font-extrabold text-xl mb-2">
            EXPERIENCE <br /> LEARNING LIKE <br /> NEVER BEFORE
          </h3>
          <p className="text-gray-800 text-sm">
            Dive into a world of playful coding.
          </p>
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <button className="border border-black rounded-full px-6 py-2 text-sm font-semibold hover:bg-black hover:text-white transition">
          Start
        </button>
        <Link href="/auth/signup">
          <button className="flex items-center gap-2 text-sm font-semibold">
            Join <span className="text-lg">&rsaquo;</span>
          </button>
        </Link>
      </div>
    </main>
  );
}
