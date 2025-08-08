'use client';

import Image from 'next/image';

export default function LoginContent() {
  return (
    <div className="flex bs-full items-center justify-center h-full flex-1 min-bs-[100dvh] relative p-6 max-md:hidden">
      <Image
        src={'/images/logo.png'}
        alt="character-illustration"
        className="max-is-full bs-auto"
        width={500}
        height={500}
      />
    </div>
  );
}
