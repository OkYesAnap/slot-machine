import {
	checkRealDataWinCombinations, getRealLine,
	getRealLines,
	hasWinCombinations,
	randomRealData, randomRoll, totalWinCombinations,
	transposeRealData
} from "../realLIneUtils";
import {ISlotImage, IWinScheme} from "../../types/slotMachiteTypes";

describe('randomRealData', () => {
	it('should return an array of specified length', () => {
		const result = randomRealData(5);
		expect(result).toHaveLength(5);
	});

	it('should generate numbers within the range', () => {
		const maxId = 8;
		const result = randomRealData(10, maxId);
		expect(result.every(num => num > 0 && num <= maxId)).toBe(true);
	});
});

describe('checkRealDataWinCombinations', () => {
	it('should return a win scheme when there are win combinations', () => {
		const data = [[1, 1, 1], [2, 2, 3], [1, 1, 1]];
		const result = checkRealDataWinCombinations(data);
		expect(result).toEqual({ x: [0, 2], y: [], xy: [] });
	});

	it('should return null when there are no win combinations', () => {
		const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
		const result = JSON.stringify(checkRealDataWinCombinations(data));
		expect(result).toBe('{"x":[],"y":[],"xy":[]}');
	});
});

describe('getRealLines', () => {
	const mockIds = [[1, 2, 3], [4, 5, 6]];
	const mockSlotsImages: ISlotImage[] = [
		{ id: 1, url: 'image1.png' },
		{ id: 2, url: 'image2.png' },
		{ id: 3, url: 'image3.png' },
		{ id: 4, url: 'image4.png' },
		{ id: 5, url: 'image5.png' },
		{ id: 6, url: 'image6.png' }
	];

	it('should return the correct structure', () => {
		const result = getRealLines(mockIds, mockSlotsImages, null);
		expect(result).toHaveLength(mockIds.length);
		expect(result[0]).toHaveLength(mockIds[0].length);
	});

	it('should mark winning fields according to combinations', () => {
		const combinations: IWinScheme = { x: [0], y: [1], xy: [] };
		const result = getRealLines(mockIds, mockSlotsImages, combinations);
		expect(result[0][0].winField).toBe(true);
		expect(result[1][1].winField).toBe(true);
	});
});

describe('getRealLine', () => {
	it('should return images corresponding to the provided ids', () => {
		const result = getRealLine([1, 2, 3]);
		expect(result).toHaveLength(3);
		expect(result).toEqual(expect.arrayContaining([
			expect.objectContaining({ id: 1 }),
			expect.objectContaining({ id: 2 }),
			expect.objectContaining({ id: 3 })
		]));
	});
});

describe('transposeRealData', () => {
	it('should transpose a 2D array', () => {
		const data = [[1, 2, 3], [4, 5, 6]];
		const result = transposeRealData(data);
		expect(result).toEqual([[1, 4], [2, 5], [3, 6]]);
	});
});

describe('hasWinCombinations', () => {
	it('should return true if there are winning combinations', () => {
		const combinations: IWinScheme = { x: [0], y: [], xy: [] };
		expect(hasWinCombinations(combinations)).toBe(true);
	});

	it('should return false if there are no winning combinations', () => {
		expect(hasWinCombinations(null)).toBe(false);
	});
});

describe('totalWinCombinations', () => {
	it('should return the total number of win combinations', () => {
		const combinations: IWinScheme = { x: [0], y: [1], xy: [1,2] };
		expect(totalWinCombinations(combinations)).toBe(4);
	});
});

describe('randomRoll', () => {
	it('should return a 2D array of specified length', () => {
		const result = randomRoll(3);
		expect(result).toHaveLength(3);
		expect(result[0]).toHaveLength(3);
	});
});