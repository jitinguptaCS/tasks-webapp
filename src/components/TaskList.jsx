import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks === undefined) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
