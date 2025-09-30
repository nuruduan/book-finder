export default function Titles({ title, likes, onLike, onDelete }) {
  return (
    <div className="flex justify-between items-center border rounded p-3 bg-gray-50 shadow-sm">
      <div>
        <h2 className="font-medium text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">👍 Likes: {likes}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onLike}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Like
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
