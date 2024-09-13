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

const realData = [
	[1, 7, 5],
	[1, 5, 1],
	[5, 7, 5]
]

const getRealLine = (ids: number[]): (ISlotImage)[] => {
	return ids.reduce<(ISlotImage)[]>((realSockets, id) => {
		const image = slotsImages.find(slot => slot.id === id);
		if (image) realSockets.push(image);
		return realSockets;
	}, []);
}

interface IWinScheme {
	x: number[],
	y: number[],
	xy: number[]
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

checkWinCombinations(realData);

const randomRealData = (length: number, maxId: number = 8) => {
	const randomData = [];
	for (let i = 0; i < length; i++) {
		randomData.push(Math.floor(Math.random() * maxId + 1));
	}
	// console.log(randomData);
	return randomData;
}

interface ILine {
	slots: ISlotImage[],
	realData: ISlotImage[],
	winCombinations?: IWinScheme | null,
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

const initMachine: ISlotMachine = {
	line1: {
		slots: randomOutOfScreen(slotsImages),
		realData: getRealLine(randomRealData(3)),
		running: false,
		xPos: 0,
		yPos: 0
	},
	line2: {
		slots: randomOutOfScreen(slotsImages),
		realData: getRealLine(randomRealData(3)),
		running: false,
		xPos: imageWidth,
		yPos: 0
	},
	line3: {
		slots: randomOutOfScreen(slotsImages),
		realData: getRealLine(randomRealData(3)),
		running: false,
		xPos: imageWidth * 2,
		yPos: 0
	}
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
					scale={slot.scale || 1}
					x={xPos + imageWidth / 2 + 10}
					y={i * imageHeight - yPos - (slots.length * imageHeight) + imageHeight / 2}
				/>
			))}
		</>
	);
};

const startGame = async (setMachine: React.Dispatch<React.SetStateAction<ISlotMachine>>) => {
	const rollingWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	setMachine((prev) => ({
		line1: {...prev.line1, running: true, slots: randomOutOfScreen(slotsImages)},
		line2: {...prev.line2, running: true, slots: randomOutOfScreen(slotsImages)},
		line3: {...prev.line3, running: true, slots: randomOutOfScreen(slotsImages)}
	}));
	await rollingWait(1000);
	setMachine((prev) => ({
		...prev,
		line1: {...prev.line1, realData: getRealLine(randomRealData(3))},
		line2: {...prev.line2, realData: getRealLine(randomRealData(3))},
		line3: {...prev.line3, realData: getRealLine(randomRealData(3))},
	}));
	await rollingWait(Math.random() * 3000 + 1000);
	setMachine((prev) => ({...prev, line1: {...prev.line1, running: false}}));
	await rollingWait(2000);
	setMachine((prev) => ({...prev, line2: {...prev.line2, running: false}}));
	await rollingWait(2000);
	setMachine((prev) => ({...prev, line3: {...prev.line3, running: false}}));
};

const SlotMachine: React.FC = () => {
	const [machine, setMachine] = useState<ISlotMachine>(initMachine);

	useEffect(() => {
		const interval = setInterval(() => {
			setMachine((prev: ISlotMachine) => {
				let updatedMachine = {...prev};
				for (let key in updatedMachine) {
					let line = updatedMachine[key as keyof ISlotMachine];
					line = {...line, yPos: calcVerticalPosition(line)}
					updatedMachine = {...updatedMachine, [key]: line}
				}
				return updatedMachine
			})
		}, 16);
		return () => clearInterval(interval);
	}, [machine.line1.yPos, machine.line1.slots.length, machine.line1.running, machine.line1.realData]);

	return (<>
		<button onClick={() => startGame(setMachine)}
		        disabled={machine.line3.running}>{machine.line3.running ? "Wait" : "Start"}</button>
		<Stage width={528} height={canvasHeight} options={{backgroundColor: 0xeef1f5}}>
			<LineRenderer line={machine.line1}/>
			<LineRenderer line={machine.line2}/>
			<LineRenderer line={machine.line3}/>
		</Stage>

	</>)
};

export default SlotMachine;