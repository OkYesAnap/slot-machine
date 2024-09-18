import {IBalanceAnimationParams} from "../../types/slotMachiteTypes";
import {balanceAnimation} from "../balanceAnimationUtils";

describe('balanceAnimation', () => {
	it('should increase value when props.value is less than balance', () => {
		const props: IBalanceAnimationParams = { value: 50, step: 10 };
		const balance = 100;

		const result = balanceAnimation(props, balance);
		expect(result.value).toBe(60);
		expect(result.color).toBeUndefined();
	});

	it('should decrease value when props.value is greater than balance', () => {
		const props: IBalanceAnimationParams = { value: 150, step: 10 };
		const balance = 100;

		const result = balanceAnimation(props, balance);
		expect(result.value).toBe(140);
		expect(result.color).toBeUndefined();
	});

	it('should not decrease value below 0', () => {
		const props: IBalanceAnimationParams = { value: 5, step: 10 };
		const balance = 0;

		const result = balanceAnimation(props, balance);
		expect(result.value).toBe(0);
		expect(result.color).toBeUndefined();
	});

	it('should return default color when props.value equals balance', () => {
		const props: IBalanceAnimationParams = { value: 100, step: 10 };
		const balance = 100;

		const result = balanceAnimation(props, balance);
		expect(result.value).toBe(100);
		expect(result.color).toBe("#FFF");
	});
});