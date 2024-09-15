import {ISlotImage} from "../types/slotMachiteTypes";
import {SLOTS_IMAGES} from "../constatns/slotMachineConstansts";

export const randomOutOfScreen = (imagesArr: ISlotImage[], randomFrom: number = 0, randomTo: number = 0): ISlotImage[] => {
	const shuffledArr = [...imagesArr];
	for (let i = 0; i < shuffledArr.length; i++) {
		if ((randomFrom < i) && (i < randomTo)) {
			i++;
		}
		shuffledArr[i] = SLOTS_IMAGES[Math.floor(Math.random() * SLOTS_IMAGES.length)];
	}
	return [...shuffledArr];
}