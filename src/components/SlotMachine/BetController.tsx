import React, {useEffect, useRef, useState} from 'react';
import { Button, InputNumber, Card } from 'antd';
import {IBalanceAnimationParams, IGameStatus, IRollData} from "../../types/slotMachiteTypes";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './SlotMachine.css';
import {BALANCE_CHANCE_ANIMATION_SPEED} from "../../constatns/slotMachineConstansts";
import {balanceAnimation} from "../../utils/balanceAnimationUtils";

interface IBetControllerProps {
	startGame: (bet: number) => Promise<void>;
	betController: IRollData;
	gameStatus: IGameStatus;
}

const BetController: React.FC<IBetControllerProps> = ({startGame, betController, gameStatus}) => {
	const {last_bet, bets, balance, win} = betController;
	const [rollDisabled, setRollDisabled] = useState<boolean>(true);
	const [bet, setBet] = useState<number>(last_bet);
	const [balanceUi, setBalanceUi] = useState<IBalanceAnimationParams>({value: balance, fontSize: "20px", color: "#FFF", step: 10})
	const balanceRef = useRef<number>();

	useEffect(() => {
		balanceRef.current = balance;
	}, [balance]);

	useEffect(() => {
		let interval: NodeJS.Timer;
		if (gameStatus.stopped) {
			interval = setInterval(() => {
				setBalanceUi((prev => {
					if (prev.value === balanceRef.current) {
						clearInterval(interval);
						setRollDisabled(false);
					}
					return  balanceAnimation(prev, balanceRef.current || 0)
				}))
			}  , BALANCE_CHANCE_ANIMATION_SPEED)
		}
	}, [gameStatus.stopped]);

	useEffect(() => {
		let interval: NodeJS.Timer;
		if (gameStatus.running) {
			setRollDisabled(true);
			interval = setInterval(() => {
				setBalanceUi((prev => {
					if (prev.value === (balanceRef.current || 0) - win) clearInterval(interval);
					return  balanceAnimation(prev, (balanceRef.current || 0) - win)
				}))
			}  , BALANCE_CHANCE_ANIMATION_SPEED)
		}
	}, [gameStatus.running, win]);


	const incrementBet = () => {
		const currentBetIndex = bets.indexOf(bet);
		if (currentBetIndex < bets.length - 1) {
			setBet(bets[currentBetIndex + 1]);
		}
	};

	const decrementBet = () => {
		const currentBetIndex = bets.indexOf(bet);
		if (currentBetIndex > 0) {
			setBet(bets[currentBetIndex - 1]);
		}
	};

	return (
		<Card className="card" bodyStyle={{ padding: "0 20px" }}>
			<div className="flex-container">
				<div className="balance-text">
					Your balance:&nbsp;
					<span style={{color: balanceUi.color, fontSize:balanceUi.fontSize}} className="balance-value">{balanceUi.value}</span>
					&nbsp;&nbsp;&nbsp;&nbsp;BET
				</div>
					<InputNumber
						className="input-number"
						min={bets[0]}
						max={bets[bets.length - 1]}
						value={bet}
						readOnly
						onChange={incrementBet}
					/>
				<Button className={"bet-button"} onClick={decrementBet} disabled={bet <= bets[0]} icon={<MinusOutlined/>}/>
				<Button className={"bet-button"} onClick={incrementBet} disabled={bet >= bets[bets.length - 1]}icon={<PlusOutlined/>}/>
				<Button
					disabled={rollDisabled || !balance}
					onClick={() => startGame(bet)}
				>
					Start
				</Button>
			</div>
		</Card>
	);
}

export default BetController;