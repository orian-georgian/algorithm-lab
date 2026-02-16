import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="container-page py-16">
      <section className="mx-auto max-w-2xl rounded-2xl border border-clinic-border bg-clinic-white p-8 text-center">
        <h1 className="text-3xl font-semibold text-clinic-slate-900">Page Not Found</h1>
        <p className="mt-3 text-sm text-clinic-slate-700">
          The page you requested does not exist.
        </p>
        <Link
          href="/ro"
          className="mt-6 inline-flex rounded-full bg-clinic-teal-700 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Go to Homepage
        </Link>
      </section>
    </main>
  );
}
