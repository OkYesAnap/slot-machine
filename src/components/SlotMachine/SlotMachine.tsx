import React, {useState} from 'react';

import {Sprite, Stage} from "@pixi/react";
import {
	SlotMachineType
} from "../../types/slotMachiteTypes";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	LINES
} from "../../constatns/slotMachineConstansts";
import {initMachine} from "../../utils/initDataUtils";
import LineRenderer from "./LineRenderer";
import {useSlotMachineGame} from "../../hooks/useSlotMachineGame";
import BACKGROUND_IMAGE from "../../assets/background.png"
import WinText from "./WinText";
import BetController from "./BetController";

const SlotMachine: React.FC = () => {
	const [machine, setMachine] = useState<SlotMachineType>(initMachine(LINES));
	const {startGame, hasWin} = useSlotMachineGame(machine, setMachine);
	const gameStopped = machine[machine.length - 1].completelyStopped;



	return (<>
		<Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} options={{backgroundColor: 0xeef1f5}}>
			<Sprite
				image={BACKGROUND_IMAGE}
				x={CANVAS_WIDTH / 2}
				y={CANVAS_HEIGHT / 2}
				anchor={0.5}
			/>
			{machine.map(slot => <LineRenderer line={slot} completelyStopped={gameStopped}/>)}
			<WinText showWinText={gameStopped && hasWin}/>
		</Stage>
		<BetController startGame={startGame}/>
	</>)
};

export default SlotMachine;