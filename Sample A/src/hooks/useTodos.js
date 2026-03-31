import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'react-tailwind-todos';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

export function useTodos() {
  const [todos, setTodos] = useState(load);

  const persist = (next) => {
    setTodos(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addTodo = useCallback((text, priority) => {
    persist(prev => [{
      id: uuidv4(), text, priority,
      completed: false, createdAt: Date.now(),
    }, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    persist(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTodo = useCallback((id) => {
    persist(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    persist(prev => prev.filter(t => !t.completed));
  }, []);

  const editTodo = useCallback((id, text) => {
    persist(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, editTodo };
}
