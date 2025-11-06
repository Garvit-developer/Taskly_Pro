import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = (todo) => {
    const newTodo = {
      id: crypto.randomUUID(),
      ...todo,
      createdAt: new Date().toISOString(),
      isCompleted: false
    };
    setTodos([...todos, newTodo]);
    return newTodo;
  };

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(t => t.isCompleted).length;
    const pending = total - completed;
    const byCategory = {};
    const byPriority = { high: 0, medium: 0, low: 0 };
    
    todos.forEach(todo => {
      const cat = todo.category || 'Uncategorized';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
      if (todo.priority) {
        byPriority[todo.priority] = (byPriority[todo.priority] || 0) + 1;
      }
    });

    return { total, completed, pending, byCategory, byPriority };
  };

  const value = {
    todos,
    darkMode,
    setDarkMode,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    getStats
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

