
import React from 'react';
import type { Todo } from '../types';
import CheckIcon from './icons/CheckIcon';
import TrashIcon from './icons/TrashIcon';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
      <span className={`flex-1 ${todo.checked ? 'line-through text-gray-500' : 'text-gray-100'}`}>
        {todo.title}
      </span>
      <div className="flex items-center space-x-3">
        {!todo.checked && (
          <button
            onClick={() => onToggle(todo.id)}
            aria-label="Complete task"
            className="p-2 text-white bg-green-600 rounded-full transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          className="p-2 text-white bg-red-600 rounded-full transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
