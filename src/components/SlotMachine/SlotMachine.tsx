import React, {useEffect, useMemo, useState} from 'react';

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
import {fetchData, useSlotMachineGame} from "../../hooks/useSlotMachineGame";
import BACKGROUND_IMAGE from "../../assets/background.png"
import WinText from "./WinText";
import BetController from "./BetController";
import {transposeRealData} from "../../utils/realLIneUtils";
import {IRollData} from "../../api/mock";

const SlotMachine: React.FC = () => {
	const [runGame, setRunGame] = useState<boolean>(false);
	const [machine, setMachine] = useState<SlotMachineType>(initMachine(LINES));

	const [betController, setBetController] = useState<IRollData>({
		uid: 100,
		balance: 1000,
		last_bet: 10,
		bets: [10, 20, 50, 100],
		rolls: []
	});

	const [realData, setRealData] = useState<number[][]>([]);
	const {startGame, hasWin} = useSlotMachineGame(machine, setMachine, realData);
	const gameStopped = useMemo(() => machine[machine.length - 1].completelyStopped, [machine])

	useEffect(() => {
		if(runGame) {
			const func = async () => {
				const data = await fetchData(100);
				setBetController(data);
				const transformedData = transposeRealData(data.rolls);
				await setRealData([...transformedData]);
				await startGame();
			}
			func()
			setRunGame(false);
		}
	}, [runGame, startGame])


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
		<BetController startGame={()=>setRunGame(true)} betController={betController}/>
	</>)
};

export default SlotMachine;