import {checkRealDataWinCombinations, totalWinCombinations} from "../utils/realLIneUtils";

const slotMachineArray = [
	[
		[8, 3, 9],
		[9, 9, 4],
		[9, 6, 3]
	],
	[
		[2, 7, 5],
		[4, 2, 4],
		[8, 1, 2]
	],
	[
		[9, 1, 7],
		[3, 3, 7],
		[6, 7, 7]
	],
	[
		[5, 5, 2],
		[1, 9, 1],
		[7, 8, 6]
	],
	[
		[6, 4, 6],
		[2, 6, 7],
		[6, 9, 6]
	],
	[
		[6, 2, 2],
		[9, 9, 9],
		[5, 5, 5]
	],
	[
		[3, 8, 6],
		[1, 3, 1],
		[9, 2, 9]
	],
	[
		[7, 7, 7],
		[6, 6, 6],
		[5, 5, 5]
	],
	[
		[9, 2, 8],
		[3, 4, 3],
		[1, 1, 1]
	],
	[
		[9, 3, 7],
		[8, 5, 8],
		[2, 6, 4]
	]
];

export interface IRollData {
	uid: number,
	balance: number,
	last_bet: number,
	bets: number[],
	rolls: number[][]
}

export const rollData = () => {
	let i = 0;
	let data:IRollData = {
		uid: 100,
		balance: 1000,
		last_bet: 10,
		bets: [10, 20, 50, 100],
		rolls: slotMachineArray[0]
	}

	return (bet: number): IRollData => {
		const rolls = slotMachineArray[i];
		const combinations = checkRealDataWinCombinations(rolls)
		const totalCombinations = totalWinCombinations(combinations);
		const balance = data.balance - bet + totalCombinations * 5 * bet ;
		i++;
		if (i === slotMachineArray.length - 1) i = 0;
		data = {...data, rolls: [...rolls], balance}
		return data
	}
}

export const dataClosure = rollData();