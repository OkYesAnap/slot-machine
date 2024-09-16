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
		[9, 1, 2],
		[3, 3, 3],
		[6, 7, 8]
	],
	[
		[5, 5, 2],
		[1, 9, 1],
		[7, 8, 6]
	],
	[
		[4, 4, 4],
		[2, 3, 7],
		[8, 9, 1]
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
export const rollData = () => {
	let i = 0;
	const data = {
		uid: 100,
		balance: 970,
		last_bet: 10,
		bets: [10, 20, 50, 100],
		rolls: slotMachineArray
	}

	return () => {
		const rolls = data.rolls[i];
		i++;
		if (i === data.rolls.length - 1) i = 0;
		return {...data, rolls}
	}
}

export const dataClosure = rollData();