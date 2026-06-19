import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// Automatically copy the clean dashboard image to assets
try {
  const src = "C:/Users/HP/.gemini/antigravity-ide/brain/ab2cd81a-cbad-442e-a092-29736db5edf5/media__1781162971085.jpg";
  const destHeroJpg = "./src/assets/images/hero/hero.jpg";
  const destHeroPng = "./src/assets/images/hero/hero.png";
  const destDashboardJpg = "./src/assets/images/dashboard/dashboard.jpg";
  const destDashboardPng = "./src/assets/images/dashboard/dashboard.png";

  if (fs.existsSync(src)) {
    // Ensure parent directories exist
    fs.mkdirSync(path.dirname(destHeroJpg), { recursive: true });
    fs.mkdirSync(path.dirname(destDashboardJpg), { recursive: true });

    // Copy to both PNG and JPG filenames to ensure maximum compatibility and zero import failures
    fs.copyFileSync(src, destHeroJpg);
    fs.copyFileSync(src, destHeroPng);
    fs.copyFileSync(src, destDashboardJpg);
    fs.copyFileSync(src, destDashboardPng);
    
    console.log("Successfully copied clean dashboard image to assets!");
  } else {
    console.warn("Clean dashboard image source not found at:", src);
  }
} catch (error) {
  console.error("Error copying dashboard image:", error);
}

export default defineConfig({
  plugins: [tailwindcss()],
});
