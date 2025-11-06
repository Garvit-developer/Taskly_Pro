import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import Categories from './pages/Categories';
import Completed from './pages/Completed';
import Settings from './pages/Settings';

function App() {
  return (
    <TodoProvider>
      <Router>
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />}  />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
