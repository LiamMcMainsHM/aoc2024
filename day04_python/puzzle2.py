def readfile(name):
  file = open(name, "r")
  content = file.read()
  file.close()
  return content

def formatContent(content: str):
  lines = content.splitlines()
  newlines = []
  for line in lines:
    newlines.append(list(line))

  return newlines

def scanForXmas(formattedContent: list[list[str]], x: int, y: int):
  try:
    middleIsA = formattedContent[x + 1][y + 1] == "A"

    topLeftCorner = formattedContent[x][y]
    bottomRightCorner = formattedContent[x + 2][y + 2]
    oneCornerIsCorrect = (topLeftCorner == "M" and bottomRightCorner == "S") or (topLeftCorner == "S" and bottomRightCorner == "M")

    topRightCorner = formattedContent[x + 2][y]
    bottomLeftCorner = formattedContent[x][y + 2]
    twoCornersAreCorrect = (topRightCorner == "M" and bottomLeftCorner == "S") or (topRightCorner == "S" and bottomLeftCorner == "M")

    return middleIsA and oneCornerIsCorrect and twoCornersAreCorrect
  except:
    return False

# main()
content = readfile("input1.txt")
formattedContent = formatContent(content)
totalCount = 0

for x, line in enumerate(formattedContent):
  for y, character in enumerate(line):
    if character == "M" or character == "S":
      totalCount += scanForXmas(formattedContent, x, y)

print(totalCount)