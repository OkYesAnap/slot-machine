import React, {useEffect, useLayoutEffect, useState} from 'react';
import './SlotMachine.css';
import {Sprite, Stage} from "@pixi/react";
import {
	IGameStatus,
	IRollData,
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
import MessageText from "./WinText";
import BetController from "./BetController";
import {transposeRealData} from "../../utils/realLIneUtils";
import {defaultData} from "../../api/mock";

const SlotMachine: React.FC = () => {
	const [runGame, setRunGame] = useState<boolean>(false);
	const [machine, setMachine] = useState<SlotMachineType>(initMachine(LINES));

	const [betController, setBetController] = useState<IRollData>({...defaultData});

	const [realData, setRealData] = useState<number[][]>([]);
	const {startGame, hasWin} = useSlotMachineGame(machine, setMachine, realData);
	const [gameStatus, setGameStatus] = useState<IGameStatus>({
		stopped: machine[machine.length - 1].completelyStopped,
		running: machine[machine.length - 1].running
	})

	useLayoutEffect(() => {
		const init = async () => {
			const data: IRollData = await fetchData(0);
			setBetController(data);
			const transformedData = transposeRealData(data.rolls);
			await setRealData([...transformedData]);
		}
		init();
	}, [])

	const beginRoll = async (bet: number) => {
		const data: IRollData = await fetchData(bet);
		setBetController(data);
		const transformedData = transposeRealData(data.rolls);
		await setRealData([...transformedData]);
		setRunGame(true)
	}

	useEffect(() => {
		if (runGame) {
			startGame();
			setRunGame(false);
		}
		setGameStatus(prev => ({...prev,
			stopped: machine[machine.length - 1].completelyStopped,
			running: machine[machine.length - 1].running
		}))
	}, [runGame, startGame, machine])


	return (<>
		<div className={"slot-machine"}>
		<Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT} options={{backgroundColor: 0xeef1f5}}>
			<Sprite
				image={BACKGROUND_IMAGE}
				x={CANVAS_WIDTH / 2}
				y={CANVAS_HEIGHT / 2}
				anchor={0.5}
			/>
			{machine.map(slot => <LineRenderer line={slot} completelyStopped={gameStatus.stopped}/>)}
			<MessageText showWinText={gameStatus.stopped && hasWin} showGameOver={!betController.balance}/>
		</Stage>
		</div>
		<BetController startGame={beginRoll} betController={betController} gameStatus={gameStatus}/>
	</>)
};

export default SlotMachine;