
import React, { useState, useMemo, useCallback } from 'react';
import type { Todo } from './types';
import { View } from './types';
import TodoItem from './components/TodoItem';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [view, setView] = useState<View>(View.InProgress);

  const addTodo = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: crypto.randomUUID(),
      title: newTodo.trim(),
      checked: false,
      createdAt: new Date(),
    };
    setTodos(prevTodos => [newTodoItem, ...prevTodos]);
    setNewTodo('');
  }, [newTodo]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      view === View.InProgress ? !todo.checked : todo.checked
    );
  }, [todos, view]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            체크리스트
          </h1>
        </header>

        <nav className="flex justify-center bg-gray-800 p-2 rounded-lg mb-6 shadow-lg">
          <button
            onClick={() => setView(View.InProgress)}
            className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
              view === View.InProgress
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            진행중
          </button>
          <button
            onClick={() => setView(View.Completed)}
            className={`px-6 py-2 rounded-md font-semibold transition-colors duration-300 ${
              view === View.Completed
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            완료
          </button>
        </nav>

        <main>
          <form onSubmit={addTodo} className="flex gap-3 mb-8">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="할 일을 입력하세요."
              className="flex-1 p-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={!newTodo.trim()}
            >
              +
            </button>
          </form>

          <div className="space-y-4">
            {filteredTodos.length > 0 ? (
              <ul className="space-y-4">
                {filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center p-10 bg-gray-800 rounded-lg">
                <p className="text-gray-400">
                  {view === View.InProgress
                    ? '모든 일을 완료했습니다! 수고하셨어요 :)'
                    : '아직 완료한 일이 없어요 :<'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
