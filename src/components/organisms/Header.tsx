import Link from "next/link";

export default function Header({ text }: { text?: string }) {
	return (
		<header>
			<h1>Sudoku Solver</h1>
			<p>
				{
					text
						? text
						: <strong>
							This sub-app solves an easy sudoku. At the moment I&apos;m working on more
							advanced algorithms mimicking human logic, which will be
							able to solve more comlicated sudoku.
						</strong>
				}
				<br />
				If you want to try my sub-app using backtracking algorithm,
				which is able to solve any sudoku of any level of complexity,
				go <Link href="/use-backtracking-algorithm">here</Link>.
			</p>
			<p><Link href="/">home (custom algorithm)</Link> | <Link href="/use-backtracking-algorithm">backtracking algorithm</Link></p>
			<hr />
		</header>
	);
}
