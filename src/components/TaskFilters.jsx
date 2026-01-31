const categories = [
  { value: null, label: "All" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
];

const sortOptions = [
  { value: null, label: "Default" },
  { value: "priority", label: "Priority" },
  { value: "dueDate", label: "Due Date" },
];

export default function TaskFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <div className="flex gap-1 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value ?? "all"}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === cat.value
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm text-gray-600">Sort:</label>
        <select
          value={sortBy ?? ""}
          onChange={(e) => onSortChange(e.target.value || null)}
          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value ?? "default"} value={opt.value ?? ""}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
