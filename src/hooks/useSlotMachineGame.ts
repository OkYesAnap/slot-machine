import {SlotMachineType} from "../types/slotMachiteTypes";
import React, {useCallback} from "react";
import {ROLLING_WAIT_DELAY, SLOTS_IMAGES} from "../constatns/slotMachineConstansts";
import {getRealLines} from "../utils/realLIneUtils";
import {rollingWait} from "../utils/initDataUtils";
import {rollingLinesUpdater} from "../utils/rollingLinesUpdatedUtil";

export const useSlotMachineGame = (machine: SlotMachineType, setMachine: React.Dispatch<React.SetStateAction<SlotMachineType>>, realData:number[][]) => {

	const startGame = useCallback(async () => {
		setMachine(prev => rollingLinesUpdater(prev, SLOTS_IMAGES));

		await rollingWait(ROLLING_WAIT_DELAY);
		const trueSlots = getRealLines(realData, SLOTS_IMAGES)

		setMachine((prev) => prev.map((slot, i) => ({...slot, realData: [...trueSlots[i]]})));

		await rollingWait(Math.random() * ROLLING_WAIT_DELAY + ROLLING_WAIT_DELAY);

		for (let i = 0; i < machine.length; i++) {
			setMachine(prev => rollingLinesUpdater(prev, SLOTS_IMAGES, i));
			await rollingWait(ROLLING_WAIT_DELAY);
		}
	}, [machine, setMachine, realData]);

	return startGame;
};