type Props = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function PageIntro({ eyebrow, title, description, className }: Props) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-clinic-white via-clinic-blue-50/70 to-clinic-teal-100/45 p-8 sm:p-12",
        className ?? ""
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-16 z-0 h-72 w-72 rounded-full bg-clinic-teal-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 h-56 w-56 rounded-full bg-clinic-blue-100/90 blur-3xl"
      />
      <div className="relative z-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-clinic-teal-700 sm:text-xs sm:tracking-[0.16em]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-clinic-slate-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-clinic-slate-700 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
