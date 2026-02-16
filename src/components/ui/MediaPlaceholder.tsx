import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  label: string;
};

export function MediaPlaceholder({ src, alt, label }: Props) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-clinic-border bg-clinic-blue-50">
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      <span className="absolute bottom-3 left-3 rounded-full bg-clinic-white/95 px-3 py-1 text-xs font-medium text-clinic-slate-700">
        {label}
      </span>
    </div>
  );
}
