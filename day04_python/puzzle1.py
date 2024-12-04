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
  downAndRight = 1 if scanInDirection(formattedContent, x, y, 1, 1) else 0
  down = 1 if scanInDirection(formattedContent, x, y, 0, 1) else 0
  downAndLeft = 1 if scanInDirection(formattedContent, x, y, -1, 1) else 0
  left = 1 if scanInDirection(formattedContent, x, y, -1, 0) else 0
  upAndLeft = 1 if scanInDirection(formattedContent, x, y, -1, -1) else 0
  up = 1 if scanInDirection(formattedContent, x, y, 0, -1) else 0
  upAndRight = 1 if scanInDirection(formattedContent, x, y, 1, -1) else 0
  right = 1 if scanInDirection(formattedContent, x, y, 1, 0) else 0
  
  return downAndRight + down + downAndLeft + left + upAndLeft + up + upAndRight + right

def scanInDirection(formattedContent: list[list[str]], startX: int, startY: int, x: int, y: int):
  # Ignore negative indicies, in Python that indexes from end of list
  if (startX + (x * 3) < 0 or startY + (y * 3) < 0):
    return False

  try:
    hasM = formattedContent[startX + x][startY + y] == "M"
    hasA = formattedContent[startX + (x * 2)][startY + (y * 2)] == "A"
    hasS = formattedContent[startX + (x * 3)][startY + (y * 3)] == "S"
    return hasM and hasA and hasS
  except:
    return False

# main()
content = readfile("input1.txt")
formattedContent = formatContent(content)
totalCount = 0

for x, line in enumerate(formattedContent):
  for y, character in enumerate(line):
    if character == "X":
      result = scanForXmas(formattedContent, x, y)
      if result != 0:
        print(f"Found {result} XMAS at {x}, {y}")
      totalCount += result

print(totalCount)