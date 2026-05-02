import { useEffect, useRef } from "react";

const exercises = [
  { slug: "kettlebell-swing",         name: "Kettlebell Swing",              muscle: "FULL BODY" },
  { slug: "dumbbell-bench-press",     name: "Dumbbell Bench Press",          muscle: "CHEST" },
  { slug: "barbell-back-squat",       name: "Barbell Back Squat",            muscle: "LEGS" },
  { slug: "dumbbell-bicep-curl",      name: "Dumbbell Bicep Curl",           muscle: "ARMS" },
  { slug: "bent-over-dumbbell-row",   name: "Bent-Over Dumbbell Row",        muscle: "BACK" },
  { slug: "dumbbell-shoulder-press",  name: "Seated Dumbbell Shoulder Press",muscle: "SHOULDERS" },
  { slug: "romanian-deadlift",        name: "Romanian Deadlift",             muscle: "HAMSTRINGS" },
  { slug: "goblet-squat",             name: "Goblet Squat",                  muscle: "LEGS" },
  { slug: "overhead-tricep-extension",name: "Overhead Tricep Extension",     muscle: "ARMS" },
  { slug: "lateral-raises",           name: "Lateral Raises",                muscle: "SHOULDERS" },
  { slug: "forearm-plank",            name: "Forearm Plank",                 muscle: "CORE" },
];

type ExerciseLibraryPreviewProps = {
  eyebrow?: string;
};

export function ExerciseLibraryPreview({
  eyebrow = "FIG 03 — DEMO LIBRARY",
}: ExerciseLibraryPreviewProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    sectionRef.current?.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
      video.pause();
      video.currentTime = 0;
      video.load();
      video.pause();
    });
  }, []);

  return (
    <section className="exercise-library" ref={sectionRef} aria-labelledby="exercise-library-title">
      <div className="container">
        <header className="exercise-library__header">
          <p className="exercise-library__eyebrow">{eyebrow}</p>
          <h2 className="exercise-library__title" id="exercise-library-title">
            See every move, <em>in action</em>.
          </h2>
          <p className="exercise-library__subhead">
            Every exercise in the FoFit library — AI-generated, dark cinematic, male and female
            variants. Built for athletes who need to see the movement, not just read it.
          </p>
        </header>

        <div className="exercise-library__grid">
          {exercises.map((exercise) => (
            <article className="exercise-library__tile" key={exercise.slug}>
              <video
                aria-label={`${exercise.name} demo video`}
                autoPlay
                className="exercise-library__video"
                loop
                muted
                playsInline
                preload="metadata"
                src={`/videos/exercises/${exercise.slug}.MP4`}
              />
              <div className="exercise-library__caption">
                <h3 className="exercise-library__name">{exercise.name}</h3>
                <p className="exercise-library__tag">{exercise.muscle}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="exercise-library__footnote">
          FIG 03.1 — 11 exercises · male &amp; female variants · 60+ total clips shipping in v1
        </p>
      </div>
    </section>
  );
}
