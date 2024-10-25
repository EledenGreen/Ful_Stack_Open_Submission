interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercise = (a: number[], b: number): Result => {
  const periodLength = a.length
  let trainingDays = 0
  a.forEach((p) => {
    if (p !== 0) {
      trainingDays++
    }
  })
  const average = a.reduce((acc, i) => acc + i, 0) / periodLength

  let success = false
  if (average > b) {
    success = true
  }

  let rating = 0
  let ratingDescription = ''
  if (average < b / 2) {
    rating = 1
    ratingDescription = 'not consistent'
  } else if (average < b) {
    rating = 2
    ratingDescription = 'almost consistent'
  } else {
    rating = 3
    ratingDescription = 'consistent'
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: b,
    average: average,
  }
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))
