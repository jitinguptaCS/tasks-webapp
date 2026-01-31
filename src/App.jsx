import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const tasks = useQuery(api.tasks.list, {
    category: selectedCategory ?? undefined,
    sortBy: sortBy ?? undefined,
  });
  const addTask = useMutation(api.tasks.add);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  const handleAdd = async (taskData) => {
    await addTask(taskData);
  };

  const handleToggle = async (id) => {
    await toggleTask({ id });
  };

  const handleRemove = async (id) => {
    await removeTask({ id });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Tasks
        </h1>

        <TaskForm onAdd={handleAdd} />

        <TaskFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}

export default App;
