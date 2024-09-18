import {ISlotImage, SlotMachineType} from "../../types/slotMachiteTypes";
import {rollingLinesUpdater} from "../rollingLinesUpdatedUtil";
import {randomOutOfScreen} from "../randomOutOfScreenUtil";

jest.mock('../randomOutOfScreenUtil');

describe('rollingLinesUpdater', () => {
	const mockMachine: SlotMachineType = [
		{ id: 1, running: true, completelyStopped: false, slots: [] },
		{ id: 2, running: true, completelyStopped: false, slots: [] },
		{ id: 3, running: true, completelyStopped: false, slots: [] }
	];

	const mockSlotsImages: ISlotImage[] = [
		{ id: 1, url: 'image1.png' },
		{ id: 2, url: 'image2.png' },
		{ id: 3, url: 'image3.png' }
	];

	it('should stop only the specified line when lineIndex is provided', () => {
		const lineIndex = 1;
		const result = rollingLinesUpdater(mockMachine, mockSlotsImages, lineIndex);
		expect(result).toHaveLength(mockMachine.length);
		expect(result[1].running).toBe(false);
		expect(result[0].running).toBe(true);
		expect(result[2].running).toBe(true);
	});

	it('should set all lines to running and update slots when lineIndex is not provided', () => {
		(randomOutOfScreen as jest.Mock).mockReturnValue(mockSlotsImages);

		const result = rollingLinesUpdater(mockMachine, mockSlotsImages);
		expect(result).toHaveLength(mockMachine.length);
		expect(result.every(slot => slot.running)).toBe(true);
		expect(result.every(slot => !slot.completelyStopped)).toBe(true);
		expect(result[0].slots).toEqual(mockSlotsImages);
	});
});