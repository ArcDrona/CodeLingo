export default function MainFifth() {
  return (
    <section className="flex flex-col justify-center items-start bg-black text-white px-6 md:px-12 lg:px-20 flex-grow py-4">
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
        START YOUR CODING <br /> JOURNEY TODAY
      </h2>

      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
        Join our free trial and unlock your coding potential with engaging
        lessons and fun challenges!
      </p>

      <div className="mt-8 flex gap-4">
        <button className="border border-white bg-white text-black font-semibold rounded-full text-sm px-6 py-3 hover:bg-gray-200">
          Sign Up
        </button>
        <button className="border border-white text-white font-semibold rounded-full text-sm px-6 py-3 hover:bg-white/10">
          Learn More
        </button>
      </div>
    </section>
  );
}
