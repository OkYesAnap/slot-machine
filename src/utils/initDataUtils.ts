import {IMAGE_WIDTH, LINES, SLOTS_IMAGES} from "../constatns/slotMachineConstansts";
import {ILine, SlotMachineType} from "../types/slotMachiteTypes";
import {randomOutOfScreen} from "./randomOutOfScreenUtil";
import {getRealLine, randomRealData} from "./realLIneUtils";
import {defaultData} from "../api/mock";

export const rollingWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const initLine = (rolls?: number[]): ILine => ({
	slots: randomOutOfScreen(SLOTS_IMAGES),
	realData: getRealLine(rolls ? rolls : randomRealData(LINES)),
	running: false,
	completelyStopped: true,
	xPos: 0,
	yPos: 0
})

export const initMachine = (lines: number): SlotMachineType => {
	const machine = []
	for (let i = 0; i < lines; i++) {
		machine.push({...initLine(defaultData.rolls[i]), xPos: i * IMAGE_WIDTH});
	}
	return machine;
}