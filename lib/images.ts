/**
 * IMAGE SLOTS
 * ------------------------------------------------------------------
 * Every photograph on the site is a slot defined here.
 * To use real gym photography: drop your file into /public/images/
 * using the filename below (or change `src`). Until a file exists,
 * a refined dark placeholder is shown automatically.
 *
 * Recommended: JPG/WebP, 2000px on the long edge, under ~400 KB each.
 */

export type Slot = { src: string; alt: string; label: string };

const slot = (file: string, alt: string, label: string): Slot => ({
  src: `/images/${file}`,
  alt,
  label,
});

export const images = {
  heroBackdrop: slot("hero-backdrop.jpg", "Athlete training in a dark gym", "Hero backdrop"),
  about: slot("about.jpg", "Training floor at SYNC Fitness Studio", "About — portrait 4:5"),

  programs: {
    weightTraining: slot("program-weight-training.jpg", "Weight training", "Weight Training"),
    strengthTraining: slot("program-strength-training.jpg", "Strength training", "Strength Training"),
    cardioTraining: slot("program-cardio-training.jpg", "Cardio training", "Cardio Training"),
    muscleBuilding: slot("program-muscle-building.jpg", "Muscle building", "Muscle Building"),
    weightLoss: slot("program-weight-loss.jpg", "Weight loss training", "Weight Loss"),
    generalFitness: slot("program-general-fitness.jpg", "General fitness", "General Fitness"),
  },

  gallery: [
    slot("gallery-01.jpg", "SYNC Fitness Studio — training floor", "Training floor"),
    slot("gallery-02.jpg", "SYNC Fitness Studio — free weights", "Free weights"),
    slot("gallery-03.jpg", "SYNC Fitness Studio — focus", "Focus"),
    slot("gallery-04.jpg", "SYNC Fitness Studio — cardio zone", "Cardio zone"),
    slot("gallery-05.jpg", "SYNC Fitness Studio — strength", "Strength"),
    slot("gallery-06.jpg", "SYNC Fitness Studio — community", "Community"),
    slot("gallery-07.jpg", "SYNC Fitness Studio — details", "Details"),
  ],
};
