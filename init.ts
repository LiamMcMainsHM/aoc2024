import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";

const BASE_DIR = "./";

async function initializeAdventOfCode() {
  for (let day = 1; day <= 25; day++) {
    const dayFolder = `${BASE_DIR}/day${day.toString().padStart(2, "0")}`;
    await ensureDir(dayFolder);

    // Puzzle and input file paths
    const puzzle1File = `${dayFolder}/puzzle1.ts`;
    const puzzle2File = `${dayFolder}/puzzle2.ts`;
    const input1File = `${dayFolder}/input1.txt`;
    const input2File = `${dayFolder}/input2.txt`;

    // Write boilerplate code into puzzle files
    const boilerplateCode = (inputFileName: string) => `
      async function getInput(): Promise<string> {
        const data = await Deno.readFile("${inputFileName}");
        return new TextDecoder().decode(data);
      }

      async function main() {
        const input = await getInput();
        console.log("Puzzle input:", input);
        // Add your solution logic here
      }

      main();
    `.trim();

    await Deno.writeTextFile(puzzle1File, boilerplateCode("input1.txt"));
    await Deno.writeTextFile(puzzle2File, boilerplateCode("input2.txt"));

    // Create empty input files
    await Deno.writeTextFile(input1File, "");
    await Deno.writeTextFile(input2File, "");
  }

  console.log(`Advent of Code 2024 folders and files initialized in ${BASE_DIR}`);
}

initializeAdventOfCode().catch((err) => {
  console.error("Error initializing Advent of Code:", err);
});
