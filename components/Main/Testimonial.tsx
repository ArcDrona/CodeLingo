import Image from "next/image";

interface TestimonialProps {
  image: string;
  rating: number;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export default function Testimonial({
  image,
  rating,
  quote,
  name,
  role,
  company,
}: TestimonialProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-100 rounded-lg p-6 md:p-10">
      <div className="flex justify-center">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="space-y-4">
        <div className="text-yellow-500 text-lg">
          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
        </div>

        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          &quot;{quote}&quot;
        </p>

        <div className="mt-4">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
