import {ILine} from "../types/slotMachiteTypes";
import {IMAGE_HEIGHT, ROLLING_SPEED} from "../constatns/slotMachineConstansts";

export const calcVerticalPosition = (line: ILine) => {
	const {yPos, running, slots, realData} = line
	if (yPos <= -IMAGE_HEIGHT * (slots.length)) {
		return -ROLLING_SPEED + (IMAGE_HEIGHT * realData.length);
	} else if (!running && Math.ceil(yPos / IMAGE_HEIGHT) === realData.length) {
		return IMAGE_HEIGHT * realData.length
	}
	return yPos - ROLLING_SPEED;
}