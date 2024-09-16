import {ISlotImage, IWinScheme, RealDataSlotsType} from "../types/slotMachiteTypes";
import {SLOTS_IMAGES} from "../constatns/slotMachineConstansts";

export const randomRealData = (length: number, maxId: number = 8) => {
	const randomData = [];
	for (let i = 0; i < length; i++) {
		randomData.push(Math.floor(Math.random() * maxId + 1));
	}
	return randomData;
}

export const checkRealDataWinCombinations = (data: Array<Array<number>>): IWinScheme | null => {
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


export const getRealLines = (ids: number[][], slotsImages: ISlotImage[], combinations:IWinScheme | null): RealDataSlotsType => {
	const dataSlots: RealDataSlotsType = []
	for (let x = 0; x < ids.length; x++) {
		dataSlots.push([])
		for (let y = 0; y < ids[x].length; y++) {
			const image = {...slotsImages.find(slot => slot.id === ids[x][y])};
			if (image) {
				if (combinations?.x.includes(x)) image.winField = true;
				if (combinations?.y.includes(y)) image.winField = true;
				const xyCross1 = x === y && combinations?.xy.includes(0);
				const xyCross2 = x === (ids.length - 1) - y && combinations?.xy.includes(2)
				if (xyCross1 || xyCross2) image.winField = true;
			}
			if (dataSlots[x]) dataSlots[x].push(image as ISlotImage)
		}
	}
	return dataSlots;
}

export const getRealLine = (ids: number[]): (ISlotImage)[] => {
	return ids.reduce<(ISlotImage)[]>((realSockets, id) => {
		const image = SLOTS_IMAGES.find(slot => slot.id === id);
		if (image) realSockets.push(image);
		return realSockets;
	}, []);
}

export const transposeRealData = (data: number[][]) => {
	const rows = data.length;
	const cols = data[0].length;
	const transposed = Array.from({length: cols}, () => Array(rows).fill(null));
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			transposed[j][i] = data[i][j];
		}
	}
	return transposed;
}

export const hasWinCombinations = (winCombinations:IWinScheme | null): boolean => Object.values(winCombinations || {}).some(array => array.length > 0);