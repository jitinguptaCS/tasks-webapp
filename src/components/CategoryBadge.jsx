const categoryStyles = {
  work: "bg-blue-100 text-blue-800",
  personal: "bg-purple-100 text-purple-800",
  shopping: "bg-orange-100 text-orange-800",
  health: "bg-green-100 text-green-800",
  other: "bg-gray-100 text-gray-800",
};

const categoryLabels = {
  work: "Work",
  personal: "Personal",
  shopping: "Shopping",
  health: "Health",
  other: "Other",
};

export default function CategoryBadge({ category }) {
  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryStyles[category]}`}
    >
      {categoryLabels[category]}
    </span>
  );
}
