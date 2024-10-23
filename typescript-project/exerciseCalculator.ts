import { isNotNaN } from "./utils";

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export function calculateExercises(dailyHours: number[], target: number): Result {
	const periodLength = dailyHours.length;
	let trainingDays = 0;
	let success = false;
	let rating = 1;
	let ratingDescription = "You suck!";
	let average = 0;

	for(const day of dailyHours) {
		if(day > 0) {
			trainingDays++;
		}

		average += day;
	}

	average /= periodLength;
	success = average === target;
	
	if((rating - average) < 1) {
		rating = 2;
		ratingDescription = "Good job but you still suck";
	}

	if(success) {
		rating = 3;
		ratingDescription = "Good job!";
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};	
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));


if(process.argv.length > 2) {
	const numbers = process.argv.slice(2).map(number => Number(number));
	const allNum = numbers.every(number => isNotNaN(number)); 
	const target = numbers.shift();

	if(allNum && numbers && target) {
		console.log(calculateExercises(numbers, target));
	}
}
