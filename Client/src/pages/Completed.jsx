import { useTodos } from "../context/TodoContext";
import { FaCheckCircle, FaCalendarAlt, FaUndo } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { format } from "date-fns";

const Completed = () => {
  const { todos, deleteTodo, toggleComplete } = useTodos();
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  const sortedTodos = [...completedTodos].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    return dateB - dateA;
  });

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
    <div className="mx-3 md:container md:mx-auto  rounded-2xl  p-6 mt-20 bg-gradient-to-br from-[#faf8ff] to-[#f3f1ff] shadow-lg min-h-[85vh] md:w-[90%] max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-800 flex items-center gap-2 tracking-tight">
          <FaCheckCircle className="text-green-500" />
          Completed Tasks
        </h1>

        <div className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
          🎉 {completedTodos.length}{" "}
          {completedTodos.length === 1 ? "Task" : "Tasks"}
        </div>
      </div>

      {/* Empty State */}
      {completedTodos.length === 0 ? (
        <div className="text-center py-12 rounded-xl bg-white border border-gray-200 shadow-inner">
          <div className="text-5xl mb-3">🎊</div>
          <p className="text-base text-gray-600 font-medium mb-1">
            No completed tasks yet
          </p>
          <p className="text-sm text-gray-500">
            Complete some tasks to see them here!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTodos.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  name={item.id}
                  onChange={() => toggleComplete(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="w-4 h-4 cursor-pointer accent-green-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap line-through opacity-80">
                    <span className="text-gray-800 text-sm font-medium">
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
                    <span className="bg-green-500 text-white px-2 py-[2px] rounded-full text-xs font-semibold flex items-center gap-1">
                      <FaCheckCircle /> Completed
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                    {item.createdAt && (
                      <span className="bg-gray-50 px-2 py-[2px] rounded-full font-medium border border-gray-200">
                        📅 Created: {format(new Date(item.createdAt), "MMM dd, yyyy")}
                      </span>
                    )}
                    {item.dueDate && (
                      <span className="bg-gray-50 px-2 py-[2px] rounded-full font-medium border border-gray-200 flex items-center gap-1">
                        <FaCalendarAlt /> Due:{" "}
                        {format(new Date(item.dueDate), "MMM dd, yyyy")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg text-white text-xs font-semibold flex items-center gap-1"
                  title="Reopen Task"
                >
                  <FaUndo /> Reopen
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white text-xs font-semibold flex items-center gap-1"
                  title="Delete Task"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completed;
