export interface Service {
  number: string;
  title: string;
  description: string;
  categorySlug: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Video Editing",
    description:
      "Crafting polished, engaging video content — from raw footage to a finished edit.",
    categorySlug: "video-editing",
  },
  {
    number: "02",
    title: "Machine Learning & Deep Learning",
    description:
      "Building models and data-driven tools, from prediction systems to computer vision.",
    categorySlug: "machine-learning",
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Designing and building responsive, modern websites and web applications.",
    categorySlug: "web-development",
  },
];
