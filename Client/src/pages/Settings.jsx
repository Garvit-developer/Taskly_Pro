import { useTodos } from "../context/TodoContext";
import {
  FaTrash,
  FaDownload,
  FaUpload,
  FaInfoCircle,
  FaCog,
} from "react-icons/fa";

const Settings = () => {
  const { todos } = useTodos();

  const handleExport = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `todos-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedTodos = JSON.parse(event.target.result);
          if (Array.isArray(importedTodos)) {
            localStorage.setItem("todos", JSON.stringify(importedTodos));
            window.location.reload();
          } else {
            alert("Invalid file format");
          }
        } catch (error) {
          alert("Error importing file: " + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Delete all todos? This action cannot be undone.")) {
      localStorage.removeItem("todos");
      window.location.reload();
    }
  };

  const handleClearCompleted = () => {
    if (window.confirm("Delete all completed todos?")) {
      const pendingTodos = todos.filter((t) => !t.isCompleted);
      localStorage.setItem("todos", JSON.stringify(pendingTodos));
      window.location.reload();
    }
  };

  return (
    <div className="mx-3 md:container md:mx-auto rounded-2xl  p-6 mt-20 bg-gradient-to-br from-[#faf8ff] to-[#f3f1ff] shadow-lg min-h-[85vh] md:w-[90%] max-w-5xl">
      {/* Header */}
      <h1 className="font-bold text-center text-2xl md:text-3xl mb-8 text-gray-800 flex items-center justify-center gap-2">
        <FaCog className="text-indigo-600" />
        <span>Settings</span>
      </h1>

      {/* Data Management */}
      <section className="rounded-xl bg-white border border-gray-200 shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          💾 Data Management
        </h2>

        <div className="space-y-4 text-sm">
          {/* Export */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-gray-800">📥 Export Todos</p>
              <p className="text-gray-500 text-xs">
                Download all todos as a JSON file
              </p>
            </div>
            <button
              onClick={handleExport}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <FaDownload /> Export
            </button>
          </div>

          {/* Import */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-gray-800">📤 Import Todos</p>
              <p className="text-gray-500 text-xs">
                Import todos from a JSON file
              </p>
            </div>
            <label className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer">
              <FaUpload /> Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          {/* Clear Completed */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-gray-800">
                🗑️ Clear Completed Todos
              </p>
              <p className="text-gray-500 text-xs">
                Remove all completed tasks permanently
              </p>
            </div>
            <button
              onClick={handleClearCompleted}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <FaTrash /> Clear Completed
            </button>
          </div>

          {/* Clear All */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-red-300 bg-red-50 hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-red-700">⚠️ Clear All Todos</p>
              <p className="text-xs text-red-600">
                Permanently delete all todos
              </p>
            </div>
            <button
              onClick={handleClearAll}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
            >
              <FaTrash /> Clear All
            </button>
          </div>
        </div>
      </section>

      {/* About App */}
      <section className="rounded-xl bg-white border border-gray-200 shadow p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" /> About iTask
        </h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Version:</strong> 2.0.0
          </p>
          <p>
            <strong>Total Todos:</strong>{" "}
            <span className="text-indigo-600 font-semibold">
              {todos.length}
            </span>
          </p>
          <p>
            <strong>Completed:</strong>{" "}
            <span className="text-green-600 font-semibold">
              {todos.filter((t) => t.isCompleted).length}
            </span>
          </p>
          <p className="pt-2 text-gray-600 leading-relaxed">
            ✨ <strong>iTask</strong> is a clean and efficient productivity app
            designed to help you manage your tasks smartly with priorities,
            categories, and analytics — built using React and Tailwind CSS.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
