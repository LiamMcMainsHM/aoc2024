async function getInput(): Promise<string> {
  const data = await Deno.readFile("input.txt");
  return new TextDecoder().decode(data);
}

interface BlockAndSpace {
  blocks: number;
  spaces: number;
}

async function main() {
  const input = await getInput();

  const list = new Map<number, BlockAndSpace>();
  let id = 0;
  input.split("").forEach((element, i) => {
    if (i % 2 === 1) {
      // empty spaces
      return;
    } else {
      // blocks
      list.set(id, {
        blocks: Number(element),
        spaces: i + 1 >= input.length ? 0 : Number(input.at(i + 1)),
      });
    }

    // end
    id++;
  });

  const displayString = buildDisplayString(list);
  console.log(displayString);
  console.log(buildRealDisplayString(list));
}

function buildRealDisplayString(list: Map<number, BlockAndSpace>): string {
  let totalString = "";

  list.forEach(({ blocks, spaces }, key) => {
    for (let i = 0; i < blocks; i++) {
      totalString += key;
    }

    for (let i = 0; i < spaces; i++) {
      const index = list.size - 1;
      const lastKey = list.get(index)!;
      let { blocks: lastBlocks, spaces: lastSpaces } = lastKey;

      if (lastBlocks > 0) {
        totalString += index;
        lastBlocks--;
      } else {
        list.delete(index);
      }

      list.set(index, {
        blocks: lastBlocks,
        spaces: lastSpaces,
      });
    }
  });

  return totalString;
}

function buildDisplayString(list: Map<number, BlockAndSpace>): string {
  let totalString = "";

  list.forEach(({ blocks, spaces }, key) => {
    for (let i = 0; i < blocks; i++) {
      totalString += key;
    }

    for (let i = 0; i < spaces; i++) {
      totalString += ".";
    }
  });

  return totalString;
}

main();
