import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'

function App() {
  const [newTask, setNewTask] = useState('')
  const tasks = useQuery(api.tasks.list)
  const addTask = useMutation(api.tasks.add)
  const toggleTask = useMutation(api.tasks.toggle)
  const removeTask = useMutation(api.tasks.remove)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      await addTask({ text: newTask.trim() })
      setNewTask('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Tasks
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add
          </button>
        </form>

        {tasks === undefined ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks yet. Add one above!</div>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
              >
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleTask({ id: task._id })}
                  className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    task.isCompleted
                      ? 'line-through text-gray-400'
                      : 'text-gray-700'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => removeTask({ id: task._id })}
                  className="opacity-0 group-hover:opacity-100 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
