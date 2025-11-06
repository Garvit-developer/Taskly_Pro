import { useTodos } from "../context/TodoContext";
import {
  FaChartBar,
  FaCheckCircle,
  FaClock,
  FaTag,
  FaFlag,
  FaTrophy,
  FaTasks,
} from "react-icons/fa";

const Analytics = () => {
  const { todos, getStats } = useTodos();
  const stats = getStats();

  const completionRate =
    stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0;

  const categoryEntries = Object.entries(stats.byCategory);
  const priorityEntries = Object.entries(stats.byPriority);

  return (
    <div className="mx-3 md:container md:mx-auto rounded-2xl p-6 mt-20 bg-gradient-to-br from-[#faf8ff] to-[#f3f1ff] shadow-lg min-h-[85vh] md:w-[90%] max-w-5xl">
      {/* Header */}
      <h1 className="font-bold text-center text-2xl md:text-3xl mb-8 text-gray-800 flex items-center justify-center gap-2">
        <FaChartBar className="text-indigo-600" />
        Analytics Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Total Todos",
            value: stats.total,
            icon: <FaTasks />,
            color: "bg-indigo-500",
          },
          {
            title: "Completed",
            value: stats.completed,
            icon: <FaCheckCircle />,
            color: "bg-green-500",
          },
          {
            title: "Pending",
            value: stats.pending,
            icon: <FaClock />,
            color: "bg-yellow-400",
          },
          {
            title: "Completion Rate",
            value: `${completionRate}%`,
            icon: <FaTrophy />,
            color: "bg-blue-500",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">
                  {card.title}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {card.value}
                </p>
              </div>
              <div
                className={`${card.color} w-10 h-10 flex items-center justify-center rounded-lg text-white text-lg`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm mb-8">
        <h2 className="text-base font-bold mb-3 text-gray-800 flex items-center gap-2">
          <FaTasks className="text-indigo-600" /> Overall Progress
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
          <div
            className="bg-green-500 h-6 text-white text-xs font-semibold flex items-center justify-center transition-all duration-700"
            style={{ width: `${completionRate}%` }}
          >
            {completionRate > 10 && `${completionRate}%`}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
          <span>✅ Completed: {stats.completed}</span>
          <span>⏳ Pending: {stats.pending}</span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm mb-8">
        <h2 className="text-base font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FaTag className="text-blue-500" /> Todos by Category
        </h2>
        {categoryEntries.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-4">
            📭 No categories yet
          </div>
        ) : (
          <div className="space-y-3">
            {categoryEntries.map(([category, count], i) => {
              const percentage =
                stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : 0;
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-gray-700">
                    <span className="capitalize">{category}</span>
                    <span>
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Priority Breakdown */}
      <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm mb-8">
        <h2 className="text-base font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FaFlag className="text-red-500" /> Todos by Priority
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {priorityEntries.map(([priority, count]) => {
            const percentage =
              stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : 0;
            const colorMap = {
              high: "bg-red-500",
              medium: "bg-yellow-400",
              low: "bg-green-500",
            };
            return (
              <div
                key={priority}
                className="rounded-xl p-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold capitalize text-gray-800">
                    {priority}
                  </span>
                  <span className="font-bold text-gray-600">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${colorMap[priority]} h-3 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {percentage}% of total
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl p-6 bg-white border border-gray-200 shadow-sm">
        <h2 className="text-base font-bold mb-4 text-gray-800 flex items-center gap-2">
          📜 Recent Activity
        </h2>
        {todos.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-4">
            📭 No recent activity
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            {todos
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all"
                >
                  <span
                    className={`text-gray-800 font-medium ${
                      todo.isCompleted ? "line-through opacity-70" : ""
                    } flex items-center gap-2`}
                  >
                    {todo.isCompleted ? "✅" : "📝"} {todo.todo}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-50 px-2 py-[2px] rounded-full border border-gray-200">
                    {todo.createdAt
                      ? new Date(todo.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
