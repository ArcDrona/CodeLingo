"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Testimonial from "./Testimonial";

const testimonials = [
  {
    image: "/Testimony/user1.png",
    rating: 5,
    quote:
      "CodeLingo transformed my coding skills! The gamified approach made learning fun and engaging.",
    name: "Prakash R.",
    role: "Software Engineer",
    company: "Infosys",
  },
  {
    image: "/Testimony/user2.png",
    rating: 5,
    quote:
      "The best platform I’ve ever used to learn coding. The challenges kept me motivated!",
    name: "Shreya Singh",
    role: "Frontend Developer",
    company: "Figma",
  },
  {
    image: "/Testimony/user3.png",
    rating: 4,
    quote:
      "I never thought coding could be this much fun. The rewards system kept me hooked.",
    name: "Syed Javed Hussain",
    role: "Fullstack Developer",
    company: "CodeBase",
  },
];

export default function MainFourth() {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center relative px-6">
      <Testimonial {...testimonials[current]} />

      <button
        onClick={prevTestimonial}
        className="absolute left-4 md:left-12 bg-white shadow-md p-3 rounded-full hover:bg-gray-200 transition"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-4 md:right-12 bg-white shadow-md p-3 rounded-full hover:bg-gray-200 transition"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </main>
  );
}
