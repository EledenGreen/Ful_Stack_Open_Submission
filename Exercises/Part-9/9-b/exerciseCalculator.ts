interface InputValues {
  a: number[]
  b: number
}

const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('not enough arguments')

  let a: number[] = []
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('invalid input')
    }
    a.push(Number(args[i]))
  }
  const b = Number(args[2])

  return {
    a: a,
    b: b,
  }
}

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

try {
  const { a, b } = parseArguments(process.argv)
  console.log(calculateExercise(a, b))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
