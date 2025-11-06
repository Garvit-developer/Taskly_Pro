// import { useState } from "react";
// import { useTodos } from "../context/TodoContext";
// import {
//   FaEdit,
//   FaPlus,
//   FaCalendarAlt,
//   FaTag,
//   FaFlag,
//   FaSearch,
// } from "react-icons/fa";
// import { AiFillDelete } from "react-icons/ai";
// import { format } from "date-fns";

// const Home = () => {
//   const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
//   const [todo, setTodo] = useState("");
//   const [category, setCategory] = useState("Work");
//   const [priority, setPriority] = useState("medium");
//   const [dueDate, setDueDate] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [showFinished, setShowFinished] = useState(true);
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [filterPriority, setFilterPriority] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const categories = ["Work", "Personal", "Shopping", "Health", "Education", "Other"];
//   const priorities = [
//     { value: "high", label: "High", color: "red" },
//     { value: "medium", label: "Medium", color: "yellow" },
//     { value: "low", label: "Low", color: "green" },
//   ];

//   const handleAdd = () => {
//     if (todo.trim().length > 0) {
//       addTodo({ todo: todo.trim(), category, priority, dueDate: dueDate || null });
//       resetForm();
//     }
//   };

//   const handleEdit = (id) => {
//     const todoItem = todos.find((t) => t.id === id);
//     if (todoItem) {
//       setTodo(todoItem.todo);
//       setCategory(todoItem.category || "Work");
//       setPriority(todoItem.priority || "medium");
//       setDueDate(todoItem.dueDate || "");
//       setEditingId(id);
//     }
//   };

//   const handleUpdate = () => {
//     if (todo.trim().length > 0 && editingId) {
//       updateTodo(editingId, { todo: todo.trim(), category, priority, dueDate: dueDate || null });
//       resetForm();
//     }
//   };

//   const resetForm = () => {
//     setTodo("");
//     setCategory("Work");
//     setPriority("medium");
//     setDueDate("");
//     setEditingId(null);
//   };

//   const filteredTodos = todos.filter((todo) => {
//     const matchesSearch = todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = filterCategory === "all" || todo.category === filterCategory;
//     const matchesPriority = filterPriority === "all" || todo.priority === filterPriority;
//     const matchesFinished = showFinished || !todo.isCompleted;
//     return matchesSearch && matchesCategory && matchesPriority && matchesFinished;
//   });

//   const getPriorityClasses = (priority) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-500 text-white";
//       case "medium":
//         return "bg-yellow-400 text-gray-800";
//       case "low":
//         return "bg-green-500 text-white";
//       default:
//         return "bg-gray-200 text-gray-700";
//     }
//   };

//   const isOverdue = (dueDate, todoId) => {
//     if (!dueDate) return false;
//     const todo = todos.find((t) => t.id === todoId);
//     return new Date(dueDate) < new Date() && todo && !todo.isCompleted;
//   };

//   const pendingCount = todos.filter((t) => !t.isCompleted).length;
//   const completedCount = todos.filter((t) => t.isCompleted).length;

//   return (
//     <div className="mx-3 md:container md:mx-auto  p-6 mt-20 rounded-2xl bg-gradient-to-br from-[#faf8ff] to-[#f3f1ff] shadow-lg min-h-[85vh] md:w-[90%] max-w-5xl">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <h1 className="font-bold text-2xl md:text-3xl text-gray-800 tracking-tight">
//           ✨ Manage Your Todos
//         </h1>
//         <div className="flex gap-3 text-xs font-semibold">
//           <div className="bg-blue-500 text-white px-4 py-1 rounded-full">
//             📋 Pending: {pendingCount}
//           </div>
//           <div className="bg-green-500 text-white px-4 py-1 rounded-full">
//             ✅ Completed: {completedCount}
//           </div>
//         </div>
//       </div>

//       {/* Todo Form */}
//       <div className="rounded-xl bg-white border border-gray-200 shadow p-5 mb-8">
//         <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
//           <span className="text-xl">📝</span> {editingId ? "Edit Todo" : "Add a Todo"}
//         </h2>

//         <div className="flex flex-col gap-4 text-sm">
//           <input
//             onChange={(e) => setTodo(e.target.value)}
//             value={todo}
//             type="text"
//             placeholder="Enter your todo..."
//             className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-xs font-semibold flex items-center gap-1 mb-1 text-gray-700">
//                 <FaTag /> Category
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               >
//                 {categories.map((cat) => (
//                   <option key={cat}>{cat}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-xs font-semibold flex items-center gap-1 mb-1 text-gray-700">
//                 <FaFlag /> Priority
//               </label>
//               <select
//                 value={priority}
//                 onChange={(e) => setPriority(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               >
//                 {priorities.map((p) => (
//                   <option key={p.value} value={p.value}>
//                     {p.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-xs font-semibold flex items-center gap-1 mb-1 text-gray-700">
//                 <FaCalendarAlt /> Due Date
//               </label>
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3 mt-2">
//             {editingId ? (
//               <>
//                 <button
//                   onClick={handleUpdate}
//                   disabled={todo.length <= 1}
//                   className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-4 py-2 rounded-lg text-white font-medium text-sm"
//                 >
//                   Update Todo
//                 </button>
//                 <button
//                   onClick={resetForm}
//                   className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium text-sm"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={handleAdd}
//                 disabled={todo.length <= 1}
//                 className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center gap-2"
//               >
//                 <FaPlus /> Add Todo
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="rounded-xl bg-white border border-gray-200 shadow p-4 mb-6">
//         <div className="flex flex-col md:flex-row gap-3 items-center text-sm">
//           <div className="relative flex-1 w-full">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search todos..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-9 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <select
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//             className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="all">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat}>{cat}</option>
//             ))}
//           </select>

//           <select
//             value={filterPriority}
//             onChange={(e) => setFilterPriority(e.target.value)}
//             className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="all">All Priorities</option>
//             {priorities.map((p) => (
//               <option key={p.value}>{p.label}</option>
//             ))}
//           </select>

//           <label className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-lg bg-white">
//             <input
//               type="checkbox"
//               checked={showFinished}
//               onChange={(e) => setShowFinished(e.target.checked)}
//               className="w-4 h-4 accent-indigo-600"
//             />
//             <span className="font-medium text-gray-700 text-sm">Show Finished</span>
//           </label>
//         </div>
//       </div>

//       {/* Todo List */}
//       <div>
//         <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
//           📋 Your Todos ({filteredTodos.length})
//         </h2>

//         {filteredTodos.length === 0 ? (
//           <div className="text-center py-10 rounded-xl bg-white border border-gray-200 shadow-inner">
//             <div className="text-4xl mb-3">📭</div>
//             <p className="text-sm text-gray-600 font-medium">No Todos to display</p>
//             <p className="text-xs text-gray-500 mt-1">Add a todo to get started!</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {filteredTodos.map((item) => (
//               <div
//                 key={item.id}
//                 className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-sm ${item.isCompleted ? "opacity-70" : ""
//                   } ${isOverdue(item.dueDate, item.id)
//                     ? "border-l-4 border-red-500 bg-red-50"
//                     : ""
//                   }`}
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <input
//                     name={item.id}
//                     onChange={() => toggleComplete(item.id)}
//                     type="checkbox"
//                     checked={item.isCompleted}
//                     className="w-4 h-4 cursor-pointer accent-indigo-600"
//                   />
//                   <div className="flex-1">
//                     <div
//                       className={`flex items-center gap-2 flex-wrap ${item.isCompleted ? "line-through" : ""
//                         }`}
//                     >
//                       <span className="text-gray-800 font-medium">{item.todo}</span>
//                       {item.category && (
//                         <span className="bg-blue-500 text-white px-2 py-[2px] rounded-full text-xs font-semibold">
//                           {item.category}
//                         </span>
//                       )}
//                       {item.priority && (
//                         <span
//                           className={`${getPriorityClasses(
//                             item.priority
//                           )} px-2 py-[2px] rounded-full text-xs font-semibold`}
//                         >
//                           {item.priority}
//                         </span>
//                       )}
//                     </div>

//                     {item.dueDate && (
//                       <div
//                         className={`text-xs mt-1 flex items-center gap-1 ${isOverdue(item.dueDate, item.id)
//                             ? "text-red-600 font-semibold"
//                             : "text-gray-500"
//                           }`}
//                       >
//                         <FaCalendarAlt /> {format(new Date(item.dueDate), "MMM dd, yyyy")}
//                         {isOverdue(item.dueDate, item.id) && " ⚠️ Overdue!"}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-2 mt-3 md:mt-0">
//                   <button
//                     onClick={() => handleEdit(item.id)}
//                     className="bg-indigo-600 hover:bg-indigo-700 p-2 text-white rounded-lg text-xs font-semibold"
//                     title="Edit"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => deleteTodo(item.id)}
//                     className="bg-red-500 hover:bg-red-600 p-2 text-white rounded-lg text-xs font-semibold"
//                     title="Delete"
//                   >
//                     <AiFillDelete />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import {
  FaEdit,
  FaPlus,
  FaCalendarAlt,
  FaTag,
  FaFlag,
  FaSearch,
} from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { format } from "date-fns";

const Home = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showFinished, setShowFinished] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Work", "Personal", "Shopping", "Health", "Education", "Other"];
  const priorities = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  // ✅ Add Todo
  const handleAdd = () => {
    if (todo.trim().length > 0) {
      addTodo({ todo: todo.trim(), category, priority, dueDate: dueDate || null });
      resetForm();
    }
  };

  // ✅ Edit Todo
  const handleEdit = (id) => {
    const todoItem = todos.find((t) => t.id === id);
    if (todoItem) {
      setTodo(todoItem.todo);
      setCategory(todoItem.category || "Work");
      setPriority(todoItem.priority || "medium");
      setDueDate(todoItem.dueDate || "");
      setEditingId(id);
    }
  };

  // ✅ Update Todo
  const handleUpdate = () => {
    if (todo.trim().length > 0 && editingId) {
      updateTodo(editingId, { todo: todo.trim(), category, priority, dueDate: dueDate || null });
      resetForm();
    }
  };

  // ✅ Reset Form
  const resetForm = () => {
    setTodo("");
    setCategory("Work");
    setPriority("medium");
    setDueDate("");
    setEditingId(null);
  };

  // ✅ Priority-based styling
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

  // ✅ Check overdue tasks
  const isOverdue = (dueDate, todoId) => {
    if (!dueDate) return false;
    const todo = todos.find((t) => t.id === todoId);
    return new Date(dueDate) < new Date() && todo && !todo.isCompleted;
  };

  // ✅ Enhanced Filtering + Search
  const filteredTodos = todos.filter((todo) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      search === "" ||
      [todo.todo, todo.category, todo.priority]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(search));

    const matchesCategory =
      filterCategory === "all" || todo.category === filterCategory;

    const matchesPriority =
      filterPriority === "all" || todo.priority === filterPriority;

    const matchesFinished = showFinished || !todo.isCompleted;

    return matchesSearch && matchesCategory && matchesPriority && matchesFinished;
  });

  // ✅ Stats
  const pendingCount = todos.filter((t) => !t.isCompleted).length;
  const completedCount = todos.filter((t) => t.isCompleted).length;

  return (
    <div className="mx-3 md:container md:mx-auto p-6 mt-20 rounded-2xl bg-gradient-to-br from-[#faf8ff] to-[#f3f1ff] shadow-lg min-h-[85vh] md:w-[90%] max-w-5xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-800 tracking-tight">
          ✨ Manage Your Todos
        </h1>
        <div className="flex gap-3 text-xs font-semibold">
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full">
            📋 Pending: {pendingCount}
          </div>
          <div className="bg-green-500 text-white px-4 py-1 rounded-full">
            ✅ Completed: {completedCount}
          </div>
        </div>
      </div>

      {/* Todo Form */}
      <div className="rounded-xl bg-white border border-gray-200 shadow p-5 mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span className="text-xl">📝</span> {editingId ? "Edit Todo" : "Add a Todo"}
        </h2>

        <div className="flex flex-col gap-4 text-sm">
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text"
            placeholder="Enter your todo..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Select Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="text-xs font-semibold flex items-center gap-1 mb-1 text-gray-700">
                <FaTag /> Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-xs font-semibold flex items-center gap-1 mb-1 text-gray-700">
                <FaFlag /> Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {priorities.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="text-xs font-semibold flex items-center gap-1 mb-1 text-gray-700">
                <FaCalendarAlt /> Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            {editingId ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={todo.length <= 1}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-4 py-2 rounded-lg text-white font-medium text-sm"
                >
                  Update Todo
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium text-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                disabled={todo.length <= 1}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center gap-2"
              >
                <FaPlus /> Add Todo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-white border border-gray-200 shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-center text-sm">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search todos, category, or priority..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All Priorities</option>
            {priorities.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          {/* Show Finished */}
          <label className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-lg bg-white">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={(e) => setShowFinished(e.target.checked)}
              className="w-4 h-4 accent-indigo-600"
            />
            <span className="font-medium text-gray-700 text-sm">Show Finished</span>
          </label>
        </div>
      </div>

      {/* Todo List */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
          📋 Your Todos ({filteredTodos.length})
        </h2>

        {filteredTodos.length === 0 ? (
          <div className="text-center py-10 rounded-xl bg-white border border-gray-200 shadow-inner">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm text-gray-600 font-medium">No Todos to display</p>
            <p className="text-xs text-gray-500 mt-1">Add a todo to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-sm ${
                  item.isCompleted ? "opacity-70" : ""
                } ${
                  isOverdue(item.dueDate, item.id)
                    ? "border-l-4 border-red-500 bg-red-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    name={item.id}
                    onChange={() => toggleComplete(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-4 h-4 cursor-pointer accent-indigo-600"
                  />
                  <div className="flex-1">
                    <div
                      className={`flex items-center gap-2 flex-wrap ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      <span className="text-gray-800 font-medium">{item.todo}</span>
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
                      <div
                        className={`text-xs mt-1 flex items-center gap-1 ${
                          isOverdue(item.dueDate, item.id)
                            ? "text-red-600 font-semibold"
                            : "text-gray-500"
                        }`}
                      >
                        <FaCalendarAlt /> {format(new Date(item.dueDate), "MMM dd, yyyy")}
                        {isOverdue(item.dueDate, item.id) && " ⚠️ Overdue!"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 p-2 text-white rounded-lg text-xs font-semibold"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteTodo(item.id)}
                    className="bg-red-500 hover:bg-red-600 p-2 text-white rounded-lg text-xs font-semibold"
                    title="Delete"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

