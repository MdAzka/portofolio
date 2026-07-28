import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />

      {/*
        Sections below are paused while we rework the site structure.
        Uncomment as each one is rebuilt:

        <About />
        <Projects projects={projects} />
        <Experience />
        <Research />
        <Contact />
      */}
    </>
  );
}
