import React, {useEffect, useState} from 'react';

import {Stage} from "@pixi/react";
import {
	SlotMachineType
} from "../../types/slotMachiteTypes";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	LINES
} from "../../constatns/slotMachineConstansts";
import {initMachine} from "../../utils/initDataUtils";
import {transposeRealData} from "../../utils/realLIneUtils";
import LineRenderer from "./LineRenderer";
import {useSlotMachineGame} from "../../hooks/useSlotMachineGame";
import {calcVerticalPosition} from "../../utils/calcVerticalPositionUtil";

const RD = [
	[2, 1, 2],
	[1, 2, 1],
	[2, 1, 2]
]

const realData = transposeRealData(RD);

const SlotMachine: React.FC = () => {
	const [machine, setMachine] = useState<SlotMachineType>(initMachine(LINES));
	const startGame = useSlotMachineGame(machine, setMachine, realData);

	useEffect(() => {
		const interval = setInterval(() => {
			setMachine((prev: SlotMachineType) => {
				let updatedMachine = [...prev];
				return updatedMachine.map(slot => {
					return {...slot, yPos: calcVerticalPosition(slot)}
				})
			})
		}, 16);
		return () => clearInterval(interval);
	}, []);

	return (<>
		<button onClick={startGame}
		        disabled={machine[machine.length - 1].running}>{machine[machine.length - 1].running ? "Wait" : "Start"}</button>
		<Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} options={{backgroundColor: 0xeef1f5}}>
			{machine.map(slot => <LineRenderer line={slot}/>)}
		</Stage>

	</>)
};

export default SlotMachine;