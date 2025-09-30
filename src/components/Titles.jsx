import { useState } from "react";

export default function Titles({ title, likes, onLike, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  const saveEdit = () => {
    if (draft.trim() !== "") {
      onEdit(draft);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="border rounded p-1 text-gray-800"
          />
        ) : (
          <h2 className="font-semibold text-gray-800">{title}</h2>
        )}
        <p className="text-sm text-gray-500">👍 Likes: {likes}</p>
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:opacity-90"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:opacity-90"
          >
            Edit
          </button>
        )}
        <button
          onClick={onLike}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:opacity-90"
        >
          Like
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
