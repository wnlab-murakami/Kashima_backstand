import Image from "next/image";

interface ManualImageProps {
  src: string;
  alt: string;
}

export default function ManualImage({ src, alt }: ManualImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      className="w-full h-auto max-w-[800px] mx-auto block border border-gray-200 rounded-lg shadow-md mb-4"
    />
  );
}
