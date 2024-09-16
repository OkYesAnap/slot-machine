import {ILine, ISlotImage, SlotMachineType} from "../types/slotMachiteTypes";
import {randomOutOfScreen} from "./randomOutOfScreenUtil";

export const rollingLinesUpdater = (machine: SlotMachineType, slotsImages: ISlotImage[], lineIndex?: number) => {
	if (lineIndex !== undefined) {
		return machine.map((slot, i) => ({
			...slot,
			running: lineIndex === i ? false : slot.running
		}))
	} else return machine.map((slot: ILine) => ({
		...slot,
		running: true,
		completelyStopped: false,
		slots: randomOutOfScreen(slotsImages)
	}))
}
