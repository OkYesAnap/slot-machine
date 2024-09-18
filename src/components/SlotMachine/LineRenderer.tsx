import React, {useEffect, useState} from "react";
import {ILine} from "../../types/slotMachiteTypes";
import {Sprite} from "@pixi/react";
import {
	IMAGE_HEIGHT,
	IMAGE_WIDTH,
	WIN_ANIMATION_PARAMS
} from "../../constants/slotMachineConstants";
import {calcWinAnimation, IWinAnimationParams} from "../../utils/calcWinAnimationUtil";

export interface LineRendererProps {
	line: ILine;
	completelyStopped: boolean;
}

const LineRenderer: React.FC<LineRendererProps> = ({line, completelyStopped}) => {
	const {slots, realData, yPos, xPos} = line;
	const [scaleParams, setScaleParams] = useState<IWinAnimationParams>(WIN_ANIMATION_PARAMS);

	useEffect(() => {
		let animation: NodeJS.Timeout | undefined;
		let interval: NodeJS.Timeout | undefined;

		if (completelyStopped) {
			animation = setTimeout(() => {
				interval = setInterval(() => {
					setScaleParams((prev: IWinAnimationParams) => (calcWinAnimation(prev)));
				}, 16);
			}, 300);
		}
		return () => {
			clearTimeout(animation);
			clearInterval(interval);
		};
	}, [completelyStopped, slots]);

	useEffect(() => {
		if (!completelyStopped) {
			setScaleParams((prev) => ({...prev, scale: WIN_ANIMATION_PARAMS.scale}));
		}
	}, [completelyStopped]);

	return (
		<>
			{[...realData, ...slots, ...realData].map((slot, i) => (
				<Sprite
					key={`line1-${slot.id}-${i}`}
					image={slot.image}
					anchor={0.5}
					scale={slot.winField ? scaleParams.scale : WIN_ANIMATION_PARAMS.scale}
					x={xPos + IMAGE_WIDTH / 2 + 10}
					y={i * IMAGE_HEIGHT - yPos - (slots.length * IMAGE_HEIGHT) + IMAGE_HEIGHT / 2}
				/>
			))}
		</>
	);
};

export default LineRenderer;