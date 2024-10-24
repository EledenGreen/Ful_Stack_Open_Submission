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

console.log(calculateBmi(180, 74))
