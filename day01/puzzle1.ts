async function getInput(): Promise<string> {
  const data = await Deno.readFile("input1.txt");
  return new TextDecoder().decode(data);
}

async function main() {
  const input = await getInput();
  const lines = input.split("\n");
  const firstColumn = lines.map((e) => e.split(" ").at(0));
  const secondColumn = lines.map((e) => e.split(" ").at(3));

  const sortedFirstColumn = firstColumn.map(Number).sort();
  const sortedSecondColumn = secondColumn.map(Number).sort();

  let sum = 0;
  for (let i = 0; i < sortedFirstColumn.length; i++) {
    sum += Math.abs(sortedSecondColumn[i] - sortedFirstColumn[i]);
  }

  console.log(sum);
}

main();
