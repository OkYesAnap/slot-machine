import {ILine} from "../../types/slotMachiteTypes";
import {calcVerticalPosition} from "../calcVerticalPositionUtil";
import {IMAGE_HEIGHT, ROLLING_SPEED} from "../../constants/slotMachineConstants";

describe('calcVerticalPosition', () => {
	it('should reset yPos when it exceeds negative IMAGE_HEIGHT times slots length', () => {
		const line: ILine = { yPos: -350, running: true, slots: [1, 2, 3, 4, 5, 6, 7, 8, 9], realData: [1, 2] };
		const result = calcVerticalPosition(line);
		expect(result.yPos).toBe(ROLLING_SPEED - (IMAGE_HEIGHT * line.realData.length));
		expect(result.completelyStopped).toBe(false);
	});

	it('should set completelyStopped to true when not running and at the end of realData', () => {
		const line: ILine = { yPos: IMAGE_HEIGHT * 2, running: false, slots: [1, 2, 3], realData: [1, 2] };
		const result = calcVerticalPosition(line);
		expect(result.yPos).toBe(IMAGE_HEIGHT * line.realData.length);
		expect(result.completelyStopped).toBe(true);
	});

	it('should decrease yPos by ROLLING_SPEED when running', () => {
		const line: ILine = { yPos: 50, running: true, slots: [1, 2, 3], realData: [1, 2, 3] };
		const result = calcVerticalPosition(line);
		expect(result.yPos).toBe(50 - ROLLING_SPEED);
		expect(result.completelyStopped).toBe(false);
	});

	it('should decrease yPos by ROLLING_SPEED when not running and not at the end', () => {
		const line: ILine = { yPos: IMAGE_HEIGHT * 1, running: false, slots: [1, 2, 3], realData: [1, 2] };
		const result = calcVerticalPosition(line);
		expect(result.yPos).toBe(IMAGE_HEIGHT * 1 - ROLLING_SPEED);
		expect(result.completelyStopped).toBe(false);
	});
});