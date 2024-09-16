import {SlotMachineType} from "../types/slotMachiteTypes";
import React, {useCallback, useEffect, useState} from "react";
import {ROLLING_WAIT_DELAY, SLOTS_IMAGES} from "../constatns/slotMachineConstansts";
import {
	checkRealDataWinCombinations,
	getRealLines,
	hasWinCombinations,
	transposeRealData
} from "../utils/realLIneUtils";
import {rollingWait} from "../utils/initDataUtils";
import {rollingLinesUpdater} from "../utils/rollingLinesUpdatedUtil";
import {calcVerticalPosition} from "../utils/calcVerticalPositionUtil";
import {dataClosure} from "../api/mock";

export const useSlotMachineGame = (machine: SlotMachineType, setMachine: React.Dispatch<React.SetStateAction<SlotMachineType>>) => {
	const  [hasWin, setHasWin] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setMachine((prev: SlotMachineType) => {
				return prev.map(slot => {
					const newStatus = calcVerticalPosition(slot)
					return {...slot, ...newStatus}
				})
			})
		}, 16);

		return () => clearInterval(interval);
	}, [setMachine, machine]);


	const startGame = useCallback(async () => {

		const data = dataClosure();

		const realData = transposeRealData(data.rolls);
		const combinations = checkRealDataWinCombinations(realData);
		setHasWin(hasWinCombinations(combinations));
		const trueSlots = getRealLines(realData, SLOTS_IMAGES, combinations)

		setMachine((prev) => prev.map((slot, i) => ({...slot, realData: [...trueSlots[i]]})));


		setMachine(prev => rollingLinesUpdater(prev, SLOTS_IMAGES));
		await rollingWait(Math.random() * ROLLING_WAIT_DELAY + ROLLING_WAIT_DELAY);

		for (let i = 0; i < machine.length; i++) {
			setMachine(prev => rollingLinesUpdater(prev, SLOTS_IMAGES, i));
			await rollingWait(ROLLING_WAIT_DELAY);
		}
	}, [machine, setMachine]);

	return {startGame, hasWin};
};