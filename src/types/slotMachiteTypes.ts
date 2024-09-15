export interface ISlotImage {
	id: number;
	image: string;
	scale?: number;
	winField?: boolean;
}

export type RealDataSlotsType = Array<Array<ISlotImage>>


export interface IWinScheme {
	x: number[],
	y: number[],
	xy: number[]
}


export interface ILine {
	slots: ISlotImage[],
	realData: ISlotImage[],
	running: boolean,
	xPos: number,
	yPos: number
}

export type SlotMachineType = ILine[]


export interface LineRendererProps {
	line: ILine;
}