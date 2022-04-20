export default function ToDo({ todo }) {
	if (!todo) return null;
	return (
		<p className="todo">
			<strong>To do:</strong> {todo}
		</p>
	);
}
