import {checkRealDataWinCombinations, totalWinCombinations} from "../utils/realLIneUtils";
import {WIN_MULTIPLIER} from "../constatns/slotMachineConstansts";
import {IRollData} from "../types/slotMachiteTypes";

const slotMachineArray = [
	[
		[8, 3, 1],
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

export const defaultData: IRollData = {
	uid: 100,
	balance: 1000,
	last_bet: 10,
	winLines: 0,
	bets: [10, 20, 50, 100],
	win: 0,
	rolls: []
}

export const rollData = () => {
	const user = localStorage.getItem('uid-100')
	let data: IRollData;
	if (user) {
		data = JSON.parse(user);
	} else {
		data = {...defaultData};
	}
	let i = 0;

	return (bet: number): IRollData => {
		if (data.balance <= 0) return data;
		let rolls;
		if (i === 0) {
			rolls = data.rolls
		} else {
			rolls = slotMachineArray[i];
		}
		const combinations = checkRealDataWinCombinations(rolls)
		const totalCombinations = totalWinCombinations(combinations);
		const win = totalCombinations * WIN_MULTIPLIER * bet
		let balance = data.balance - bet + win;
		i++;
		if (i === slotMachineArray.length - 1) i = 0;
		data = {
			...data,
			rolls: [...rolls],
			last_bet: bet,
			winLines: totalCombinations,
			win,
			balance
		}
		localStorage.setItem(`uid-${data.uid}`, JSON.stringify(data));
		return data
	}
}

export const dataClosure = rollData();