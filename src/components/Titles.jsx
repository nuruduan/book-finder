import { useState } from "react";
import { PencilSquareIcon, TrashIcon, HandThumbUpIcon, CheckIcon } from "@heroicons/react/24/solid";

export default function Titles({ title, category, likes, onLike, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const saveEdit = () => {
    if (newTitle.trim() !== "") {
      onEdit(newTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition transform hover:scale-[1.02] opacity-0 animate-fadeIn">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded p-1 text-gray-800"
          />
        ) : (
          <h2 className="font-semibold text-gray-800">{title}</h2>
        )}
        <p className="text-xs text-gray-400 italic">{category}</p>
        <p className="text-sm text-gray-500">👍 Likes: {likes}</p>
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
            >
              <CheckIcon className="h-4 w-4" /> Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
            >
              <TrashIcon className="h-4 w-4" /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
          >
            <PencilSquareIcon className="h-4 w-4" /> Edit
          </button>
        )}
        <button
          onClick={onLike}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
        >
          <HandThumbUpIcon className="h-4 w-4" /> Like
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:opacity-90 flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" /> Delete
        </button>
      </div>
    </div>
  );
}
