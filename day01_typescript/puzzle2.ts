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

  const frequencyFirstColumn = sortedFirstColumn.reduce((previous, current) => {
    previous[current] = (previous[current] ?? 0) + 1;
    return previous;
  }, {} as Record<number, number>);

  const frequencySecondColumn = sortedSecondColumn.reduce(
    (previous, current) => {
      previous[current] = (previous[current] ?? 0) + 1;
      return previous;
    },
    {} as Record<number, number>,
  );

  console.log(
    Object.entries(frequencyFirstColumn).reduce((previous, [stringKey]) => {
      const key = Number(stringKey);
      const secondColumnCount = frequencySecondColumn[key] ?? 0;

      return previous + (key * secondColumnCount);
    }, 0),
  );
}

main();
