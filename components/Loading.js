"use client";
import Image from "next/image";

export default function Loading({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-[99999] pointer-events-auto flex items-center justify-center bg-white/70">
      <div className="flex items-center justify-center flex-col animate-pulse">
        <Image
          unoptimized
          src="/cat-loading.gif"
          alt="Loading"
          width={200}
          height={200}
          style={{ width: "auto", height: "auto" }}
          className="sm:h-80"
          priority
        />
        <p className="-mt-20 sm:-mt-24 text-lg font-semibold animate-bounce">
          Loading...
        </p>
      </div>
    </div>
  );
}
