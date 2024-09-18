import {calcWinAnimation, IWinAnimationParams} from "../calcWinAnimationUtil";

describe('calcWinAnimation', () => {
	it('should increase scale when increase is true', () => {
		const params: IWinAnimationParams = { scale: 5, step: 2, increase: true, upLimit: 10, downLimit: 0 };
		const result = calcWinAnimation(params);
		expect(result.scale).toBe(7);
		expect(result.increase).toBe(true);
	});

	it('should decrease scale when increase is false', () => {
		const params: IWinAnimationParams = { scale: 5, step: 2, increase: false, upLimit: 10, downLimit: 0 };
		const result = calcWinAnimation(params);
		expect(result.scale).toBe(3);
		expect(result.increase).toBe(false);
	});

	it('should not exceed the upLimit', () => {
		const params: IWinAnimationParams = { scale: 9, step: 5, increase: true, upLimit: 10, downLimit: 0 };
		const result = calcWinAnimation(params);
		expect(result.scale).toBe(10);
		expect(result.increase).toBe(false);
	});

	it('should not go below the downLimit', () => {
		const params: IWinAnimationParams = { scale: 1, step: 3, increase: false, upLimit: 10, downLimit: 0 };
		const result = calcWinAnimation(params);
		expect(result.scale).toBe(0);
		expect(result.increase).toBe(true);
	});

	it('should toggle increase when limits are hit', () => {
		const params: IWinAnimationParams = { scale: 10, step: 1, increase: true, upLimit: 10, downLimit: 0 };
		const result = calcWinAnimation(params);
		expect(result.scale).toBe(10);
		expect(result.increase).toBe(false);
	});

	it('should toggle increase when going below downLimit', () => {
		const params: IWinAnimationParams = { scale: 0, step: 1, increase: false, upLimit: 10, downLimit: 0 };
		const result = calcWinAnimation(params);
		expect(result.scale).toBe(0);
		expect(result.increase).toBe(true);
	});
});