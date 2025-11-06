import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { FaTag, FaCalendarAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Categories = () => {
  const { todos, deleteTodo, toggleComplete } = useTodos();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Work", "Personal", "Shopping", "Health", "Education", "Other"];

  const allCategories = [
    ...new Set([...categories, ...todos.map((t) => t.category).filter(Boolean)]),
  ];

  const filteredTodos =
    selectedCategory === "all"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  const categoryStats = allCategories.reduce((acc, cat) => {
    const categoryTodos = todos.filter((t) => t.category === cat);
    acc[cat] = {
      total: categoryTodos.length,
      completed: categoryTodos.filter((t) => t.isCompleted).length,
      pending: categoryTodos.filter((t) => !t.isCompleted).length,
    };
    return acc;
  }, {});

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-400 text-gray-800";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="mx-3 md:container md:mx-auto p-6 mt-20 rounded-2xl bg-gradient-to-br from-[#faf8ff] to-[#f3f1ff] shadow-lg md:w-[90%] max-w-5xl">
      {/* Header */}
      <h1 className="font-bold text-center text-2xl md:text-3xl mb-8 text-gray-800 flex items-center justify-center gap-2">
        <FaTag className="text-indigo-600" />
        Categories
      </h1>

      {/* Category Filter */}
      <div className="mb-8 rounded-xl bg-white border border-gray-200 shadow p-6">
        <h2 className="text-base font-bold mb-4 text-gray-800 flex items-center gap-2">
          🏷️ Filter by Category
        </h2>

        <div className="flex flex-wrap gap-3 text-sm">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 shadow-sm ${
              selectedCategory === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            🌟 All ({todos.length})
          </button>

          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 shadow-sm ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              {cat} ({categoryStats[cat]?.total || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Category Stats */}
      {selectedCategory !== "all" && categoryStats[selectedCategory] && (
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            {
              title: "Total",
              value: categoryStats[selectedCategory].total,
              color: "text-indigo-600",
            },
            {
              title: "Completed",
              value: categoryStats[selectedCategory].completed,
              color: "text-green-600",
            },
            {
              title: "Pending",
              value: categoryStats[selectedCategory].pending,
              color: "text-yellow-600",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-xs font-semibold text-gray-500 mb-1">
                {stat.title}
              </p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Todos Section */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          📋{" "}
          {selectedCategory === "all"
            ? "All Todos"
            : `${selectedCategory} Todos`}{" "}
          ({filteredTodos.length})
        </h2>

        {filteredTodos.length === 0 ? (
          <div className="text-center py-10 rounded-xl bg-white border border-gray-200 shadow-inner">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm text-gray-600 font-medium">
              No todos in this category
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            {filteredTodos.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] ${
                  item.isCompleted ? "opacity-70" : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => toggleComplete(item.id)}
                    className="w-4 h-4 cursor-pointer accent-indigo-600"
                  />
                  <div className="flex-1">
                    <div
                      className={`flex flex-wrap items-center gap-2 ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      <span className="text-gray-800 font-medium">
                        {item.todo}
                      </span>
                      {item.category && (
                        <span className="bg-blue-500 text-white px-2 py-[2px] rounded-full text-xs font-semibold">
                          {item.category}
                        </span>
                      )}
                      {item.priority && (
                        <span
                          className={`${getPriorityClasses(
                            item.priority
                          )} px-2 py-[2px] rounded-full text-xs font-semibold`}
                        >
                          {item.priority}
                        </span>
                      )}
                    </div>

                    {item.dueDate && (
                      <div className="text-xs mt-1 flex items-center gap-1 text-gray-500">
                        <FaCalendarAlt /> Due:{" "}
                        {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(item.id)}
                  className="mt-3 md:mt-0 bg-red-500 hover:bg-red-600 px-3 py-2 text-white rounded-lg text-xs font-semibold shadow-sm"
                  title="Delete Todo"
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
