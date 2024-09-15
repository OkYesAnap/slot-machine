import React from "react";
import {LineRendererProps} from "../../types/slotMachiteTypes";
import {Sprite} from "@pixi/react";
import {IMAGE_HEIGHT, IMAGE_WIDTH} from "../../constatns/slotMachineConstansts";

const LineRenderer: React.FC<LineRendererProps> = ({line}) => {
	const {slots, realData, yPos, xPos} = line;

	return (
		<>
			{[...realData, ...slots, ...realData].map((slot, i) => (
				<Sprite
					key={`line1-${slot.id}-${i}`}
					image={slot.image}
					anchor={0.5}
					scale={slot.winField ? .8 : 1}
					x={xPos + IMAGE_WIDTH / 2 + 10}
					y={i * IMAGE_HEIGHT - yPos - (slots.length * IMAGE_HEIGHT) + IMAGE_HEIGHT / 2}
				/>
			))}
		</>
	);
};

export default LineRenderer;