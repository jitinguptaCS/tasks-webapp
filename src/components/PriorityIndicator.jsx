const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export default function PriorityIndicator({ priority }) {
  return (
    <div
      className={`w-1 h-full rounded-full ${priorityColors[priority]}`}
      title={`${priority} priority`}
    />
  );
}
