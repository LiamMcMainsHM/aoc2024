async function getInput(): Promise<string> {
        const data = await Deno.readFile("input1.txt");
        return new TextDecoder().decode(data);
      }

      async function main() {
        const input = await getInput();
        console.log("Puzzle input:", input);
        // Add your solution logic here
      }

      main();