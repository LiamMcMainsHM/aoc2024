def getData
  file = File.open("./input.txt")
  content = file.read
  numberPairs = content.split("\n\n").at(0).split("\n").map{ |x| [Integer(x.split("|").at(0)), Integer(x.split("|").at(1))] }
  updates = content.split("\n\n").at(1).split("\n").map{|x| x.split(",").map{ |y| Integer(y) }}
  return numberPairs, updates
end

def isUpdateValid(update, orderPairs)
  (0..(update.length - 2)).each do |n|
    ((n + 1)..(update.length - 1)).each do |k|
      currentNumber = update.at(n)
      nextNumber = update.at(k)
      if orderPairs.include?([nextNumber, currentNumber])
        return false
      end
    end
  end

  return true
end

def getMiddleSums(updates)
  return updates.map { |x| x.at(x.length() / 2) }.reduce(:+)
end

puzzleData = getData()
numberPairs = puzzleData.at(0)
updates = puzzleData.at(1)

validUpdates = updates.filter_map{ |x| x if isUpdateValid(x, numberPairs) }

# Part 1
puts getMiddleSums(validUpdates)

def reorderInvalidUpdate(update, orderPairs)
  # Thought process:
  # Start with an empty update
  # Insert the first element from the invalid update into the new update
  # Start adding more elements into the update, checking whether they go behind or in front of all the existing elements
  # Add all elements this way until you run out

  reorderedUpdate = [update.at(0)]
  (1..(update.length - 1)).each do |n|
    elementToInsert = update.at(n)
    k = 0
    elementToCompareTo = reorderedUpdate.at(k)

    wasGoingUp = false
    wasGoingDown = false

    while elementToCompareTo != nil
      if orderPairs.include?([elementToInsert, elementToCompareTo]) # descend
        # If you were going up, and then suddenly go down, you've found the right spot to insert
        if wasGoingUp
          break
        end
        k = k - 1
        wasGoingDown = true
      
      else # ascend
        # If you were going down, and now suddenly are going up, you've found the right spot to insert
        if wasGoingDown
          break
        end
        k = k + 1
        wasGoingUp = true
      end
      elementToCompareTo = reorderedUpdate.at(k)
    end

    reorderedUpdate.insert(k, elementToInsert)
  end

  return reorderedUpdate
end

invalidUpdates = updates.filter_map{ |x| x if !isUpdateValid(x, numberPairs) }
reorderedInvalidUpdates = invalidUpdates.map { |x| reorderInvalidUpdate(x, numberPairs) }

# Part 2
puts getMiddleSums(reorderedInvalidUpdates)
