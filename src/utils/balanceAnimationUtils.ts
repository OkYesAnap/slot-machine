import {IBalanceAnimationParams} from "../types/slotMachiteTypes";

export const balanceAnimation = (props:IBalanceAnimationParams, balance: number): IBalanceAnimationParams => {
	const {value, step} = props
	if(props.value < balance){
		return {...props,
			value: value + step,
			// color:"green"
		}
	}
	if(props.value > balance){
		return {...props,
			value: value - step <= 0 ? 0 : value - step,
			// color:"red"
		}
	}
	return {...props,
		color: "#FFF",
		// fontSize:"24px"
	};
}