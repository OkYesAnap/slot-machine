import {ISlotImage} from "../types/slotMachiteTypes";
import image1 from "../assets/slot-1.png";
import image2 from "../assets/slot-2.png";
import image3 from "../assets/slot-3.png";
import image4 from "../assets/slot-4.png";
import image5 from "../assets/slot-5.png";
import image6 from "../assets/slot-6.png";
import image7 from "../assets/slot-7.png";
import image8 from "../assets/slot-8.png";
import image9 from "../assets/slot-9.png";

export const SLOTS_IMAGES: ISlotImage[] = [
	{id: 1, image: image1},
	{id: 2, image: image2},
	{id: 3, image: image3},
	{id: 4, image: image4},
	{id: 5, image: image5},
	{id: 6, image: image6},
	{id: 7, image: image7},
	{id: 8, image: image8},
	{id: 9, image: image9}
];

export const CANVAS_HEIGHT = 510;
export const CANVAS_WIDTH = 530;
export const IMAGE_HEIGHT = 170;
export const IMAGE_WIDTH = 170;
export const ROLLING_SPEED = 25;
export const ROLLING_WAIT_DELAY = 1500;
export const LINES = 3;