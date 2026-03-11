"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8">
      <h2 className="text-2xl font-semibold text-red-800">Something went wrong</h2>
      <p className="mt-3 text-sm text-red-700">
        An unexpected error occurred while loading this page.
      </p>
      <Button
        onClick={reset}
        variant="primary"
        size="md"
        iconVariant="arrowRight"
        className="mt-6"
      >
        Try again
      </Button>
    </section>
  );
}

