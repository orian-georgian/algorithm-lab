"use client";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="bg-clinic-page p-6">
        <main className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8">
          <h1 className="text-2xl font-semibold text-red-800">Application Error</h1>
          <p className="mt-3 text-sm text-red-700">
            The app encountered a critical issue. Refresh the page and try again.
          </p>
        </main>
      </body>
    </html>
  );
}
