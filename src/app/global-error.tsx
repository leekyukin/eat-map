"use client";

import { ErrorMessage } from "@/components/ErrorMessage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorMessage message="다시 시도해주세요." />
        <button
          onClick={() => reset()}
          className="mx-auto mt-4 rounded-md bg-red-600 px-4 py-2.5 text-white hover:bg-red-500"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
