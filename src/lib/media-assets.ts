export type MediaImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type MediaVideo = {
  id: string;
  type: "youtube" | "mp4";
  title: string;
  description: string;
  youtubeId?: string;
  src?: string;
  poster?: string;
};

export type BeforeAfterCase = {
  id: number;
  beforeSrc: string;
  afterSrc: string;
  width: number;
  height: number;
};

export const galleryMedia: MediaImage[] = [
  {
    id: "g1",
    src: "/media/images/gallery-1.jpg",
    alt: "Dental lab digital workflow station",
    width: 1200,
    height: 900,
    caption: "Digital workflow station",
  },
  {
    id: "g2",
    src: "/media/images/gallery-2.jpg",
    alt: "Ceramic prosthetics fabrication area",
    width: 1200,
    height: 900,
    caption: "Ceramic fabrication",
  },
  {
    id: "g3",
    src: "/media/images/gallery-3.jpg",
    alt: "CAD CAM dental model preview",
    width: 1200,
    height: 900,
    caption: "CAD preview",
  },
  {
    id: "g4",
    src: "/media/images/gallery-4.png",
    alt: "Implant prosthetics quality control setup",
    width: 1200,
    height: 900,
    caption: "Quality control",
  },
  {
    id: "g5",
    src: "/media/images/gallery-5.jpg",
    alt: "Dental prosthetics finishing workstation",
    width: 1200,
    height: 900,
    caption: "Finishing workstation",
  },
  {
    id: "g6",
    src: "/media/images/gallery-6.jpg",
    alt: "Laboratory communication and case planning desk",
    width: 1200,
    height: 900,
    caption: "Case planning desk",
  },
];

export const galleryPageMedia: MediaImage[] = [
  ...galleryMedia,
  {
    id: "g7",
    src: "/media/images/gallery-7.jpg",
    alt: "Dental technician portrait in laboratory environment",
    width: 1200,
    height: 900,
    caption: "Technician profile",
  },
  {
    id: "g8",
    src: "/media/images/gallery-8.jpg",
    alt: "Dental technician working with digital tools",
    width: 1200,
    height: 900,
    caption: "Digital operator",
  },
  {
    id: "g9",
    src: "/media/images/gallery-9.jpg",
    alt: "Dental laboratory team member",
    width: 1200,
    height: 900,
    caption: "Team member 1",
  },
  {
    id: "g10",
    src: "/media/images/gallery-10.jpg",
    alt: "Dental laboratory team member with transparent background",
    width: 1200,
    height: 900,
    caption: "Team member 2",
  },
  {
    id: "g11",
    src: "/media/images/gallery-11.jpg",
    alt: "Dental prosthetics specialist portrait",
    width: 1200,
    height: 900,
    caption: "Team member 3",
  },
  {
    id: "g12",
    src: "/media/images/gallery-12.jpg",
    alt: "Laboratory media documentation specialist",
    width: 1200,
    height: 900,
    caption: "Lab documentation",
  },
];

export const videoMedia: MediaVideo[] = [
  {
    id: "v1",
    type: "mp4",
    title: "Laboratory workflow overview",
    description: "Digital workflow presentation video.",
    src: "/media/videos/video-1.mp4",
  },
  {
    id: "v2",
    type: "mp4",
    title: "Technician working on drilling machine",
    description: "Dental technician operating precision drilling equipment.",
    src: "/media/videos/video-2.mp4",
  },
];

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 1,
    beforeSrc: "/media/cases/case-1-after.png",
    afterSrc: "/media/cases/case-1-before.jpg",
    width: 1200,
    height: 900,
  },
  {
    id: 2,
    beforeSrc: "/media/cases/case-2-after.png",
    afterSrc: "/media/cases/case-2-before.png",
    width: 1200,
    height: 900,
  },
  {
    id: 3,
    beforeSrc: "/media/cases/case-3-after.png",
    afterSrc: "/media/cases/case-3-before.png",
    width: 1200,
    height: 900,
  },
  {
    id: 4,
    beforeSrc: "/media/cases/case-4-after.jpg",
    afterSrc: "/media/cases/case-4-before.jpg",
    width: 1200,
    height: 900,
  },
];
