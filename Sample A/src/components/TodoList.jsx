import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
        <span className="text-5xl mb-4 select-none">✨</span>
        <p className="text-slate-600 font-medium text-[0.95rem]">Nothing here — you're all clear!</p>
      </div>
    );
  }

  return (
    <ul className="max-h-[440px] overflow-y-auto scrollbar-thin">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
