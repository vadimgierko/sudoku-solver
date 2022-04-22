export default function Header() {
	return (
		<header>
			<h1>Sudoku Solver</h1>
			<p>
				<strong>
					This will be the app, which will be able to solve a sudoku. The app
					development is in progress... Don't use, until it completed ;-)
				</strong>
			</p>
			<p>At the moment:</p>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<li>UI & app structure set</li>
				<li>the app generates empty board</li>
				<li>
					you can input known (init) numbers of sudoku you want to solve
					(feature is blocked for algorithm tests)
				</li>
				<li>you can save the board (feature is blocked for algorithm tests)</li>
			</ul>
			<hr />
		</header>
	);
}
