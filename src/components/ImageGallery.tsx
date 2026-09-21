"use client";

import { useState } from "react";
import Image from "next/image";
import ManualImage from "@/components/ManualImage";

interface ImageGalleryProps {
  files: string[];
  labels?: Record<string, string>;
}

function defaultLabelFor(file: string) {
  return file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

export default function ImageGallery({ files, labels }: ImageGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const labelFor = (file: string) => labels?.[file] ?? defaultLabelFor(file);

  if (selected) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="block bg-[#1A2753] text-white px-5 py-3 rounded-lg font-bold text-center mb-4 hover:bg-[#2c3e8a] transition-all"
        >
          ← 一覧に戻る
        </button>
        <ManualImage src={`/uploads/${selected}`} alt={labelFor(selected)} />
        <p className="text-[#1A2753] font-bold text-center mt-2">
          {labelFor(selected)}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {files.map((file) => (
        <button
          key={file}
          type="button"
          onClick={() => setSelected(file)}
          className="block text-left"
        >
          <Image
            src={`/uploads/${file}`}
            alt={labelFor(file)}
            width={300}
            height={200}
            className="w-full h-32 object-cover border border-gray-200 rounded-lg"
          />
          <p className="text-sm text-gray-700 mt-1 text-center">
            {labelFor(file)}
          </p>
        </button>
      ))}
    </div>
  );
}
