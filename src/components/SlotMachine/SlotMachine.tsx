import React, {useEffect, useState} from 'react';
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
} from "../../constants/slotMachineConstants";
import {initMachine} from "../../utils/initDataUtils";
import LineRenderer from "./LineRenderer";
import {fetchData, useSlotMachineGame} from "../../hooks/useSlotMachineGame";
import BACKGROUND_IMAGE from "../../assets/background.png"
import BetController from "./BetController";
import {transposeRealData} from "../../utils/realLIneUtils";
import {defaultData} from "../../api/mock";
import TextMessage from "./TextMessage";

const SlotMachine: React.FC = () => {
	const [runGame, setRunGame] = useState<boolean>(false);
	const [machine, setMachine] = useState<SlotMachineType>(initMachine(LINES));
	const [betControllerData, setBetControllerData] = useState<IRollData>({...defaultData});
	const [realData, setRealData] = useState<number[][]>([]);
	const {startGame, hasWin} = useSlotMachineGame(machine, setMachine, realData);
	const [gameStatus, setGameStatus] = useState<IGameStatus>({
		stopped: machine[machine.length - 1].completelyStopped,
		running: machine[machine.length - 1].running
	})

	const beginRoll = async (bet: number) => {
		const data: IRollData = await fetchData(bet);
		setBetControllerData(data);
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
			<TextMessage showText={(gameStatus.stopped && hasWin) || (betControllerData.balance <= 0)} betControllerData={betControllerData}/>
		</Stage>
		</div>
		<BetController startGame={beginRoll} betController={betControllerData} gameStatus={gameStatus}/>
	</>)
};

export default SlotMachine;