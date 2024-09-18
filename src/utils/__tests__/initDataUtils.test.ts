import {IMAGE_WIDTH} from "../../constants/slotMachineConstants";
import {initLine, initMachine} from "../initDataUtils";

describe('initDataUtils', () => {
	describe('initLine', () => {
		it('should initialize a line with default random values', () => {
			const line = initLine();
			expect(line.slots.length).toBeGreaterThan(0);
			expect(line.realData).toBeDefined();
			expect(line.running).toBe(false);
			expect(line.completelyStopped).toBe(true);
			expect(line.xPos).toBe(0);
			expect(line.yPos).toBe(0);
		});

	});

	describe('initMachine', () => {
		it('should initialize machine with correct number of lines', () => {
			const lines = 3;
			const machine = initMachine(lines);
			expect(machine.length).toBe(lines);
			expect(machine[0].xPos).toBe(0);
			expect(machine[1].xPos).toBe(IMAGE_WIDTH);
		});
	});
});