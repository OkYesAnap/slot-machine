import {ILine} from "../types/slotMachiteTypes";
import {IMAGE_HEIGHT, ROLLING_SPEED} from "../constants/slotMachineConstants";

export const calcVerticalPosition = (line: ILine): { yPos: number, completelyStopped: boolean } => {
	const {yPos, running, slots, realData} = line
	let newStatus = {yPos, completelyStopped: false}
	if (yPos <= -IMAGE_HEIGHT * (slots.length)) {
		return {...newStatus, yPos: -ROLLING_SPEED + (IMAGE_HEIGHT * realData.length)};
	} else if (!running && Math.ceil(yPos / IMAGE_HEIGHT) === realData.length) {
		return {yPos: IMAGE_HEIGHT * realData.length, completelyStopped: true}
	}
	return {...newStatus, yPos: yPos - ROLLING_SPEED};
}