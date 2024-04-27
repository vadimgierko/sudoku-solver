export default function Footer() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();

	return (
		<footer>
			<hr />
			&copy;{" "}
			<a href="https://github.com/vadimgierko" target="_blank" rel="noreferrer">
				Vadim Gierko
			</a>{" "}
			2022-{currentYear}
		</footer>
	);
}
