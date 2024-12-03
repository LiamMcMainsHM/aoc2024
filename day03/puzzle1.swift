import Foundation

let input = try! String(contentsOfFile: "input1.txt", encoding: .utf8)
let regex = try Regex("mul\\(\\d\\d?\\d?,\\d\\d?\\d?\\)")
var total = 0

for match in input.matches(of: regex) {
  if let rawValue = match.output[0].value {
    let value = String(describing: rawValue)
    let left = value.split(separator: "(")[1].split(separator: ",")[0]
    let right = value.split(separator: ",")[1].split(separator: ")")[0]

    total += (Int(left)! * Int(right)!)
  }
}

print(total)
