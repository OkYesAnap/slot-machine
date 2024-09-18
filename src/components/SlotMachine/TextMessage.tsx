import {Text} from "@pixi/react";
import {CANVAS_HEIGHT, CANVAS_WIDTH, WIN_MULTIPLIER} from "../../constatns/slotMachineConstansts";
import React from "react";
import {TextStyle} from "pixi.js";
import {IRollData} from "../../types/slotMachiteTypes";

const style = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 72,
	fill: 'red',
	stroke: '#FFF',
	strokeThickness: 4,
});


const TextMessage: React.FC<{ showText: boolean, betControllerData: IRollData }> = ({
	                                                                                       showText,
	                                                                                       betControllerData
                                                                                       }) => {
	const {winLines, last_bet, win, balance} = betControllerData
	return (
		<>
			{showText && (
				<>
					{balance <= 0 ? (
						<Text
							text="GAME OVER"
							anchor={0.5}
							x={CANVAS_WIDTH / 2}
							y={CANVAS_HEIGHT / 2}
							style={style}
						/>
					) : (
						<>
							<Text
								text="You WIN!"
								anchor={0.5}
								x={CANVAS_WIDTH / 2}
								y={CANVAS_HEIGHT / 2}
								style={style}
							/>
							<Text
								text={`${winLines}x${WIN_MULTIPLIER}x${last_bet}=${win}`}
								anchor={0.5}
								x={CANVAS_WIDTH / 2}
								y={CANVAS_HEIGHT / 2 + 100}
								style={style}
							/>
						</>
					)}
				</>
			)}
		</>
	)
}

export default TextMessage