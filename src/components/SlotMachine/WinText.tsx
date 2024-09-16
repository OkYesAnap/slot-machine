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


const WinText: React.FC<{ showWinText: boolean }> = ({showWinText}) => {
	return (<>{showWinText && <Text
		text="You WIN!"
		anchor={0.5}
		x={CANVAS_WIDTH / 2}
		y={CANVAS_HEIGHT / 2}
		style={style}
	/>
	}</>)
}

export default WinText