import { useState } from "react";
import { PencilSquareIcon, TrashIcon, HandThumbUpIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function Titles({ title, category, likes, liked, onLike, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const saveEdit = () => {
    if (newTitle.trim() !== "") {
      onEdit(newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm transition transform hover:scale-[1.02] opacity-0 animate-fadeIn">
      <div className="flex flex-col">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded p-1 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
          />
        ) : (
          <>
            <h2 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
            {category && (
              <span className="inline-block bg-purple-400 dark:bg-purple-700 text-purple-900 dark:text-purple-200 text-xs px-2 py-0.5 rounded-md mt-1">
                {category}
              </span>
            )}
          </>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">👍 Likes: {likes}</p>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
            >
              <CheckIcon className="h-4 w-4" /> Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 dark:bg-gray-600 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
            >
              <TrashIcon className="h-4 w-4" /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 dark:bg-yellow-600 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
          >
            <PencilSquareIcon className="h-4 w-4" /> Edit
          </button>
        )}

        <button
          onClick={onLike}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 hover:opacity-90 ${
            liked
              ? "bg-green-700 dark:bg-green-600 text-white"
              : "bg-green-500 dark:bg-green-500 text-white"
          }`}
        >
          <HandThumbUpIcon className="h-4 w-4" /> Like
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" /> Delete
        </button>
      </div>
    </div>
  );
}
