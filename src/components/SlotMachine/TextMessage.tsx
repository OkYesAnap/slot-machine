import {Text} from "@pixi/react";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../../constatns/slotMachineConstansts";
import React from "react";
import {TextStyle} from "pixi.js";

const style = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 72,
	fill: 'red',
	stroke: '#FFF',
	strokeThickness: 4,
});


const TextMessage: React.FC<{ showWinText: boolean, showGameOver: boolean }> = ({showWinText, showGameOver}) => {
	return (<>{showWinText && <Text
		text="You WIN!"
		anchor={0.5}
		x={CANVAS_WIDTH / 2}
		y={CANVAS_HEIGHT / 2}
		style={style}
	/>}
	{showGameOver && <Text
		text="GAME OVER!"
		anchor={0.5}
		x={CANVAS_WIDTH / 2}
		y={CANVAS_HEIGHT / 2}
		style={style}/>}
	</>)
}

export default TextMessage