export type Board = number[][];

export type Coords = {
	r: number;
	c: number;
};

export type Step = { coords: Coords; value: number };
