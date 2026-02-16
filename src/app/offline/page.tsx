import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="container-page py-16">
      <section className="mx-auto max-w-xl rounded-2xl border border-clinic-border bg-clinic-white p-8 text-center">
        <h1 className="text-2xl font-semibold text-clinic-slate-900">You are offline</h1>
        <p className="mt-3 text-sm text-clinic-slate-700">
          The requested page is not available right now. Reconnect to the internet and try again.
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
