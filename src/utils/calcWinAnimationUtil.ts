export interface IWinAnimationParams {
	scale: number;
	step: number;
	increase: boolean;
	upLimit: number;
	downLimit: number;
}

export const calcWinAnimation = (params: IWinAnimationParams): IWinAnimationParams => {
	const {scale, increase, step, upLimit, downLimit} = params;
	let newScale = scale;
	if (increase) {
		newScale += step;
	} else {
		newScale -= step;
	}
	if (newScale > upLimit) {
		newScale = upLimit;
	} else if (newScale < downLimit) {
		newScale = downLimit;
	}
	const newIncrease = newScale < upLimit && newScale > downLimit ? increase : !increase;
	return {...params, scale: newScale, increase: newIncrease};
}