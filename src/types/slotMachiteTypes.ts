export interface ISlotImage {
	id: number;
	image: string;
	scale?: number;
	winField?: boolean;
}

export type RealDataSlotsType = Array<Array<ISlotImage>>

export interface IWinScheme {
	x: number[];
	y: number[];
	xy: number[];
}

export interface ILine {
	slots: ISlotImage[];
	realData: ISlotImage[];
	running: boolean;
	completelyStopped: boolean;
	xPos: number;
	yPos: number;
}

export type SlotMachineType = ILine[]

export interface IRollData {
	uid: number;
	balance: number;
	last_bet: number;
	winLines: number;
	win: number;
	bets: number[];
	rolls: number[][];
}

export interface IGameStatus {
	running: boolean;
	stopped: boolean;
}

export interface IBalanceAnimationParams {
	value: number,
	fontSize: string,
	color: string,
	step: number
}