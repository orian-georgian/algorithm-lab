import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Algorithm Dental Technical Laboratory",
    short_name: "Algorithm",
    description:
      "Dental technical laboratory in Cluj-Napoca with digital workflows and high-precision prosthetics.",
    start_url: "/ro",
    display: "standalone",
    background_color: "#f5fbff",
    theme_color: "#f5fbff",
    orientation: "portrait",
    lang: "ro",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/apple-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
