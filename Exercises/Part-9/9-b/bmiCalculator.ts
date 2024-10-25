export interface BmiValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('not enough arguments')
  if (args.length > 4) throw new Error('too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('invalid input')
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter: number = height / 100
  const bmi: number = weight / Math.pow(heightInMeter, 2)

  if (bmi < 16) {
    return 'Severe thinness'
  } else if (bmi < 17) {
    return 'Moderate thinness'
  } else if (bmi < 18.5) {
    return 'Mild thinness'
  } else if (bmi < 25) {
    return 'Normal range'
  } else if (bmi < 30) {
    return 'Pre obese'
  } else if (bmi < 35) {
    return 'Obese class I'
  } else if (bmi < 40) {
    return 'Obese class II'
  } else {
    return 'Obese class III'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
