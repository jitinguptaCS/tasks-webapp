import PriorityIndicator from "./PriorityIndicator";
import CategoryBadge from "./CategoryBadge";

function formatDate(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(timestamp) {
  if (!timestamp) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return timestamp < today.getTime();
}

export default function TaskItem({ task, onToggle, onRemove }) {
  const overdue = !task.isCompleted && isOverdue(task.dueDate);

  return (
    <li
      className={`flex items-stretch gap-3 p-3 rounded-lg group ${
        overdue ? "bg-red-50" : "bg-gray-50"
      }`}
    >
      <PriorityIndicator priority={task.priority} />

      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task._id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer self-center"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`${
              task.isCompleted
                ? "line-through text-gray-400"
                : overdue
                ? "text-red-700"
                : "text-gray-700"
            }`}
          >
            {overdue && !task.isCompleted && (
              <span className="text-red-600 font-medium">Overdue: </span>
            )}
            {task.text}
          </span>
          <CategoryBadge category={task.category} />
        </div>

        {task.dueDate && (
          <div
            className={`text-xs mt-1 ${
              overdue && !task.isCompleted ? "text-red-600" : "text-gray-500"
            }`}
          >
            Due: {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      <button
        onClick={() => onRemove(task._id)}
        className="opacity-0 group-hover:opacity-100 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all self-center"
      >
        Delete
      </button>
    </li>
  );
}
