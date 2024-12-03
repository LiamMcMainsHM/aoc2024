package main

import (
	"fmt"
	"os"
	"strings"
)

func main2() {
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
		} else {
			bruteForce := removeOneElement(splitCharacters)

			for j := range bruteForce {
				lineOmitted := bruteForce[j]
				if isReportSafe(lineOmitted) {
					sumSafe += 1
					break
				}
			}
		}
	}

	fmt.Println(sumSafe)
}

// removeOneElement generates all subsets of the input slice with one element removed
func removeOneElement(input []string) [][]string {
	result := [][]string{}

	// Iterate over each element in the input slice
	for i := range input {
		// Create a new slice with one element removed
		subset := append([]string{}, input[:i]...) // Copy elements before index i
		subset = append(subset, input[i+1:]...)    // Copy elements after index i
		result = append(result, subset)
	}

	return result
}
