import {
	checkRealDataWinCombinations,
	randomRoll,
	totalWinCombinations,
	transposeRealData
} from "../utils/realLIneUtils";
import {BETS, START_BALANCE, WIN_MULTIPLIER} from "../constants/slotMachineConstants";
import {IRollData} from "../types/slotMachiteTypes";

const slotMockedData = [
	[
		[2, 7, 5],
		[4, 2, 4],
		[8, 1, 2]
	],
	[
		[5, 1, 2],
		[1, 1, 1],
		[7, 1, 6]
	],
	[
		[2, 7, 5],
		[5, 5, 5],
		[8, 1, 2]
	],
	[
		[6, 4, 6],
		[2, 6, 7],
		[6, 9, 6]
	],
	[
		[7, 7, 3],
		[6, 3, 6],
		[3, 5, 5]
	],
	[
		[7, 7, 7],
		[6, 6, 6],
		[5, 5, 5]
	],
	[
		[4, 4, 4],
		[1, 2, 3],
		[4, 5, 6]
	],
	[
		[7, 7, 7],
		[7, 7, 7],
		[7, 7, 7]
	]
];

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const uid = url.searchParams.get('uid') || 0;

const defaultDataInit = (): IRollData => {
	const user = localStorage.getItem(`uid-${uid}`);
	if (user) {
		const lastData = JSON.parse(user);
		return {...lastData, rolls: transposeRealData(lastData.rolls)}
	} else {
		return {
			uid: Number(uid),
			balance: START_BALANCE,
			last_bet: BETS[0],
			winLines: 0,
			bets: BETS,
			win: 0,
			rolls: []
	}
}}

export const defaultData = defaultDataInit();

export const rollData = () => {
	let i = 0;
	let data = defaultData;
	return (bet: number, random: boolean): IRollData => {
		if (data.balance <= 0) return data;
		let rolls = random ? randomRoll (3) : slotMockedData[i];
		const combinations = checkRealDataWinCombinations(rolls)
		const totalCombinations = totalWinCombinations(combinations);
		if(data.balance - bet < 0) bet = data.balance;
		const win = totalCombinations * WIN_MULTIPLIER * bet
		let balance = data.balance - bet + win;
		i++;
		if (i === slotMockedData.length - 1) i = 0;
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