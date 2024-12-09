// 190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20

import 'dart:io';

Future<String> getInput() async {
  final file = await File('input.txt').readAsString();
  return file;
}

List<String> getAllPermutations(List<int> nums, int i) {
  if (i == nums.length - 1) {
    return [];
  }

  final numberPair = (nums[i], nums[i + 1]);

  return [];
}

void main() async {
  final fileContents = await getInput();
  final splitLines = fileContents.split("\n");

  for (final line in splitLines) {
    final testValue = int.parse(line.split(":").elementAt(0));
    final numbers = line
        .split(":")
        .elementAt(1)
        .split(" ")
        .where(
          (element) => element != "",
        )
        .map(int.parse)
        .toList();

    print(testValue);
    print(numbers);
  }
}
