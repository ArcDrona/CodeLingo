"use client";

import Image from "next/image";

export default function MainThird() {
  return (
    <main className="bg-black text-white min-h-screen w-full flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            UNLOCK YOUR CODING <br />
            POTENTIAL WITH A FUN <br />
            AND INTERACTIVE <br />
            LEARNING EXPERIENCE
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            At CodeLingo, we make learning to code enjoyable and rewarding.
            Our gamified approach keeps you engaged while mastering essential
            skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <h3 className="text-lg font-bold">FUN LEARNING</h3>
              <p className="text-gray-400 text-sm mt-2">
                Experience a playful environment that turns coding into an
                exciting adventure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">ENGAGING CONTENT</h3>
              <p className="text-gray-400 text-sm mt-2">
                Interactive lessons and challenges keep you motivated and eager
                to learn more.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src="/young_man_enjoying_movie_night.jpg"
            alt="Student Learning"
            width={500}
            height={400}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}
