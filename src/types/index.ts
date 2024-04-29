export interface Cell {
	x: number;
	y: number;
	value: string;
	potentialValues: string[];
	color: string;
	backgroundColor: string;
	potentialCell: boolean;
}

export type Row = Cell[];

export type Board = Row[];
