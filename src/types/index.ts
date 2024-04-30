export type AllowedValue = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export interface Cell {
	x: number;
	y: number;
	value: AllowedValue | null | ""; // ⚠️ THERE IS EMPTY STRING ONLY TO SATISFY TEMPLATE SUDOKUS VALUES... FIX THIS
	potentialValues: string[];
	color: string;
	backgroundColor: string;
	potentialCell: boolean;
}

export type Row = Cell[];

export type Board = Row[];

export type Mode = "set" | "run";
