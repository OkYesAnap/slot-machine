import {iRollData, SlotMachineType} from "../types/slotMachiteTypes";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ROLLING_WAIT_DELAY, SLOTS_IMAGES} from "../constatns/slotMachineConstansts";
import {
	checkRealDataWinCombinations,
	getRealLines,
	hasWinCombinations,
} from "../utils/realLIneUtils";
import {rollingWait} from "../utils/initDataUtils";
import {rollingLinesUpdater} from "../utils/rollingLinesUpdatedUtil";
import {calcVerticalPosition} from "../utils/calcVerticalPositionUtil";
import {dataClosure} from "../api/mock";

export const fetchData = (bet:number) => {
	return new Promise<iRollData>((resolve, reject) => {
		try {
			const data = dataClosure(bet);
			resolve(data);
		} catch (error) {
			reject(new Error("Failed to fetch data"));
		}
	});
};


export const useSlotMachineGame = (machine: SlotMachineType,
                                   setMachine: React.Dispatch<React.SetStateAction<SlotMachineType>>,
                                   realData: number[][]) => {
	const  [hasWin, setHasWin] = useState(false);

	const trueSlots = useMemo(() => {
		const combinations = checkRealDataWinCombinations(realData);
		setHasWin(hasWinCombinations(combinations));
		return getRealLines(realData, SLOTS_IMAGES, combinations)
	}, [realData])

	useEffect(() => {
		let interval: NodeJS.Timer
		interval = setInterval(() => {
			setMachine((prev: SlotMachineType) => {
				return prev.map((slot, i) => {
					const newStatus = calcVerticalPosition(slot);
					return {...slot, ...newStatus}
				})
			})
		}, 16);

		return () => clearInterval(interval);
	}, [setMachine]);

	useEffect(() => {
		setMachine((prev) => prev.map((slot, i) => {
			return ({...slot, realData: trueSlots[i] || slot.realData})
		}));
	}, [trueSlots, setMachine])

	const startGame = useCallback(async () => {

		setMachine(prev => rollingLinesUpdater(prev, SLOTS_IMAGES));
		await rollingWait(Math.random() * ROLLING_WAIT_DELAY + ROLLING_WAIT_DELAY);

		for (let i = 0; i < machine.length; i++) {
			setMachine(prev => rollingLinesUpdater(prev, SLOTS_IMAGES, i));
			await rollingWait(ROLLING_WAIT_DELAY);
		}
	}, [machine.length, setMachine]);

	return {startGame, hasWin};
};