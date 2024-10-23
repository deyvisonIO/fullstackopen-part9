export function calculateBmi(height: number, weight: number): string {
  const bmi: number = weight / ((height / 100) * (height / 100));
  if (bmi <= 18.4) return "Underweight";
  if (bmi <= 24.9) return "Normal range";
  if (bmi <= 29.9) return "Overweight";
  if (bmi >= 30) return "Obese";
  if (isNaN(bmi)) return "Error: not a number";
  return "Error: Could not determine bmi";
}

console.log(calculateBmi(165, 72));
console.log(calculateBmi(180, 74));
if (process.argv.length > 2) {
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
}
