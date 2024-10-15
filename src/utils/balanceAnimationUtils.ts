import {IBalanceAnimationParams} from "../types/slotMachiteTypes";

export const balanceAnimation = (props:IBalanceAnimationParams, balance: number): IBalanceAnimationParams => {
	const {value, step} = props
	if(props.value < balance){
		return {...props,
			value: value + step,
			fontSize: "24px"
			// color:"green"
		}
	}
	if(props.value > balance){
		return {...props,
			value: value - step <= 0 ? 0 : value - step,
			fontSize: "16px"
			// color:"red"
		}
	}
	return {...props,
		color: "#FFF",
		fontSize: "20px"
		// fontSize:"24px"
	};
}