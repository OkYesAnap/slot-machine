import React, {useEffect, useState} from 'react';
import image1 from './assets/slot-1.png'
import image2 from './assets/slot-2.png'
import image3 from './assets/slot-3.png'
import image4 from './assets/slot-4.png'
import image5 from './assets/slot-5.png'
import image6 from './assets/slot-6.png'
import image7 from './assets/slot-7.png'
import image8 from './assets/slot-8.png'
import image9 from './assets/slot-9.png'
import {Sprite, Stage} from "@pixi/react";

const canvasHeight = 510;
const imageHeight = 170;
const imageWidth = 170;
const speed = 20;
const lines = 3;

interface ISlotImage {
	id: number;
	image: string;
	scale?: number;
	winField?: boolean;
}

const slotsImages: ISlotImage[] = [
	{id: 1, image: image1},
	{id: 2, image: image2},
	{id: 3, image: image3},
	{id: 4, image: image4},
	{id: 5, image: image5},
	{id: 6, image: image6},
	{id: 7, image: image7},
	{id: 8, image: image8},
	{id: 9, image: image9}
];

const RD = [
	[2, 1, 2],
	[1, 2, 1],
	[2, 1, 2]
]

function transposeRealData(data:any) {
	const rows = data.length;
	const cols = data[0].length;
	const transposed = Array.from({ length: cols }, () => Array(rows).fill(null));
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			transposed[j][i] = data[i][j];
		}
	}
	return transposed;
}


const realData = transposeRealData(RD);

interface IRealDataSlots {
	line1: ISlotImage[],
	line2: ISlotImage[],
	line3: ISlotImage[],
}


const getRealLine = (ids: number[]): (ISlotImage)[] => {
	return ids.reduce<(ISlotImage)[]>((realSockets, id) => {
		const image = slotsImages.find(slot => slot.id === id);
		if (image) realSockets.push(image);
		return realSockets;
	}, []);
}

const checkWinCombinations = (data: Array<Array<number>>): IWinScheme | null => {
	const winScheme: IWinScheme = {x: [], y: [], xy: []}
	const setX = new Set();
	const setY = new Set();
	const setXY = new Set();

	for (let i = 0; i < data.length; i++) {
		const inLength = data[i].length - 1;
		for (let j = 0; j <= inLength; j++) {
			if (i === 0) setXY.add(data[j][j]);
			if (i === inLength) setXY.add(data[inLength - j][j]);
			setX.add(data[i][j]);
			setY.add(data[j][i]);
		}
		if (Array.from(setX).length === 1) winScheme.x.push(i);
		if (Array.from(setY).length === 1) winScheme.y.push(i);
		if (Array.from(setXY).length === 1) winScheme.xy.push(i);
		setX.clear();
		setY.clear();
		setXY.clear();
	}
	return Object.keys(winScheme).length ? winScheme : null;
}


const getRealLines = (ids: number[][], ): IRealDataSlots => {
	const combinations = checkWinCombinations(ids);
	const dataSlots: {} = {}
	for (let x = 0; x < ids.length; x++) {
		for (let y = 0; y < ids[x].length; y++) {
			const image = {...slotsImages.find(slot => slot.id === ids[x][y])};
			if(image) {
				if (combinations?.x.includes(x)) image.winField = true;
				if (combinations?.y.includes(y)) image.winField = true;
				const xyCross1 = x === y && combinations?.xy.includes(0);
				const xyCross2 = x === (ids.length - 1) - y && combinations?.xy.includes(2)
				if (xyCross1 || xyCross2) image.winField = true;
			}

			console.log(combinations);
			// @ts-ignore
			if(dataSlots[`line${x+1}`]) dataSlots[`line${x+1}`].push(image)
			else { // @ts-ignore
				dataSlots[`line${x+1}`] = [image]
			}
		}
	}
	return dataSlots as IRealDataSlots;
}

interface IWinScheme {
	x: number[],
	y: number[],
	xy: number[]
}

const randomRealData = (length: number, maxId: number = 8) => {
	const randomData = [];
	for (let i = 0; i < length; i++) {
		randomData.push(Math.floor(Math.random() * maxId + 1));
	}
	return randomData;
}

interface ILine {
	slots: ISlotImage[],
	realData: ISlotImage[],
	running: boolean,
	xPos: number,
	yPos: number
}

interface ISlotMachine {
	line1: ILine,
	line2: ILine,
	line3: ILine
}



const randomOutOfScreen = (imagesArr: ISlotImage[], randomFrom: number = 0, randomTo: number = 0): ISlotImage[] => {
	const shuffledArr = [...imagesArr];
	for (let i = 0; i < shuffledArr.length; i++) {
		if ((randomFrom < i) && (i < randomTo)) {
			i++;
		}
		shuffledArr[i] = slotsImages[Math.floor(Math.random() * slotsImages.length)];
	}
	return [...shuffledArr];
}


const calcVerticalPosition = (line: ILine) => {
	const {yPos, running, slots, realData} = line
	if (yPos <= -imageHeight * (slots.length)) {
		return -speed + (imageHeight * realData.length);
	} else if (!running && Math.ceil(yPos / imageHeight) === realData.length) {
		return imageHeight * realData.length
	}
	return yPos - speed;
}

const initLine = {
	slots: randomOutOfScreen(slotsImages),
	realData: getRealLine(randomRealData(3)),
	running: false,
	xPos: 0,
	yPos: 0
}
type SlotMachineType = ILine[]

const initMachine = (lines: number):SlotMachineType => {
	const machine = []
	for (let i = 0; i < lines; i++){
		machine.push({...initLine, xPos: i * imageWidth});
	}
	return machine;
}

interface LineRendererProps {
	line: ILine;
}

const LineRenderer: React.FC<LineRendererProps> = ({line}) => {
	const {slots, realData, yPos, xPos} = line;

	return (
		<>
			{[...realData, ...slots, ...realData].map((slot, i) => (
				<Sprite
					key={`line1-${slot.id}-${i}`}
					image={slot.image}
					anchor={0.5}
					scale={slot.winField ? .8 : 1}
					x={xPos + imageWidth / 2 + 10}
					y={i * imageHeight - yPos - (slots.length * imageHeight) + imageHeight / 2}
				/>
			))}
		</>
	);
};

const runController1 = (lines: number) => {
	let status = -1;
	return (machine: SlotMachineType) => {
		if (status === -1) {
			console.log(status);
			const setAllRun = machine.map((slot: ILine) => ({
				...slot,
				running: true,
				slots: randomOutOfScreen(slotsImages)
			}))
			status += 1;
			return setAllRun;
		} else {
			const setAllRun = machine.map((slot: ILine, i) => {
				return ({
					...slot,
					running: status === i ? false : slot.running,
					slots: randomOutOfScreen(slotsImages)
				})
			})
			status += 1;
			return setAllRun;
		}
		return machine;
	}
}

const runController = (machine: SlotMachineType, lineIndex?: number) => {
	if (lineIndex !== undefined) {
		return machine.map((slot, i) => ({
			...slot,
			running: lineIndex === i ? false : slot.running,
			slots: randomOutOfScreen(slotsImages)
		}))
	} else return machine.map((slot: ILine) => ({
		...slot,
		running: true,
		slots: randomOutOfScreen(slotsImages)
	}))
}

const startGame = async (machine: SlotMachineType, setMachine: React.Dispatch<React.SetStateAction<SlotMachineType>>) => {
	const rollingWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	setMachine(prev => runController(prev));
	await rollingWait(1000);
	const trueSlots = getRealLines(realData)
	// const trueSlots = getRealLines([[...randomRealData(3)],[...randomRealData(3)],[...randomRealData(3)]])

	setMachine((prev) => ([
		{...prev[0], realData: [...trueSlots.line1]},
		{...prev[1], realData: [...trueSlots.line2]},
		{...prev[2], realData: [...trueSlots.line3]},
	]));
	await rollingWait(Math.random() * 3000 + 1000);
	setMachine(prev => runController(prev, 0));
	await rollingWait(2000);
	setMachine(prev => runController(prev, 1));
	await rollingWait(2000);
	setMachine(prev => runController(prev, 2));

};

const SlotMachine: React.FC = () => {
	const [machine, setMachine] = useState<SlotMachineType>(initMachine(3));

	useEffect(() => {
		const interval = setInterval(() => {
			setMachine((prev: SlotMachineType) => {
				let updatedMachine = [...prev];
				return  updatedMachine.map(slot => {
					return {...slot, yPos: calcVerticalPosition(slot)}
				})
				// for (let key in updatedMachine) {
				// 	let line = updatedMachine[key as keyof ISlotMachine];
				// 	line = {...line, yPos: calcVerticalPosition(line)}
				// 	updatedMachine = {...updatedMachine, [key]: line}
				// }
				// return updatedMachine
			})
		}, 16);
		return () => clearInterval(interval);
	}, []);

	return (<>
		<button onClick={() => startGame(machine, setMachine)}
		        disabled={machine[2].running}>{machine[2].running ? "Wait" : "Start"}</button>
		<Stage width={528} height={canvasHeight} options={{backgroundColor: 0xeef1f5}}>
			<LineRenderer line={machine[0]}/>
			<LineRenderer line={machine[1]}/>
			<LineRenderer line={machine[2]}/>
		</Stage>

	</>)
};

export default SlotMachine;