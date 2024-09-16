import React, { useState } from 'react';
import { Button, InputNumber, Card } from 'antd';
import {CANVAS_WIDTH} from "../../constatns/slotMachineConstansts";

const initialBalance = 1000

//@ts-ignore
const BetController = ({startGame}) => {
	const [bet, setBet] = useState(10);

	const incrementBet = () => {
		if (bet < initialBalance) {
			setBet(bet + 10);
		}
	};

	const decrementBet = () => {
		if (bet > 10) {
			setBet(bet - 10);
		}
	};

	return (
		<Card style={{ width: CANVAS_WIDTH, margin: '20px auto', textAlign: 'center' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<p>Your balance: {initialBalance} coins</p>
				<Button onClick={decrementBet} disabled={bet <= 10}>
					-
				</Button>
				<InputNumber
					min={10}
					max={initialBalance}
					value={bet}
					readOnly
					style={{ width: 50, textAlign: 'center' }}
				/>
				<Button onClick={incrementBet} disabled={bet >= initialBalance}>
					+
				</Button>
				<Button
					type="primary"
					onClick={startGame}
				>
					Start
				</Button>
			</div>
		</Card>
	);
};

export default BetController;