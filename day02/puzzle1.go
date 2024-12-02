package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main1() {
	dat, err := os.ReadFile("./input1.txt")
	check(err)

	allInputData := string(dat)
	splitLines := strings.Split(allInputData, "\n")

	sumSafe := 0

	for i := range splitLines {
		line := splitLines[i]

		splitCharacters := strings.Split(line, " ")

		if isReportSafe(splitCharacters) {
			sumSafe += 1
		}
	}

	fmt.Println(sumSafe)
}

func isReportSafe(splitCharacters []string) bool {
	isIncreasing, isDecreasing := false, false

	// The levels are either all increasing or all decreasing.
	// Any two adjacent levels differ by at least one and at most three.
	for j := range len(splitCharacters) - 1 {
		currentCharacter, err1 := strconv.Atoi(splitCharacters[j])
		nextCharacter, err2 := strconv.Atoi(splitCharacters[j+1])
		check(err1)
		check(err2)

		if currentCharacter == nextCharacter {
			return false
		}

		if isIncreasing && (nextCharacter <= currentCharacter) {
			return false
		}

		if isDecreasing && (nextCharacter >= currentCharacter) {
			return false
		}

		isIncreasing = nextCharacter > currentCharacter
		isDecreasing = nextCharacter < currentCharacter

		if isIncreasing && (nextCharacter-currentCharacter > 3) {
			return false
		}

		if isDecreasing && (currentCharacter-nextCharacter > 3) {
			return false
		}
	}

	return true
}
