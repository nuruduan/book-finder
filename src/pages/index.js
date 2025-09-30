import { useState, useEffect } from "react";
import Titles from "../components/Titles";
import Skeleton from "../components/Skeleton";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBooks = localStorage.getItem("books");
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks));
      } else {
        setBooks([
          { title: "Atomic Habits", likes: 0 },
          { title: "The Pragmatic Programmer", likes: 0 },
          { title: "Clean Code", likes: 0 },
        ]);
      }
      setTimeout(() => setLoading(false), 1200);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books]);

  // --- functions ---
  const addBook = () => {
    if (newBook.trim() === "") return;
    setBooks([...books, { title: newBook, likes: 0 }]);
    setNewBook("");
  };

  const increaseLikes = (index) => {
    const updated = [...books];
    updated[index].likes += 1;
    setBooks(updated);
  };

  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const editBook = (index, newTitle) => {
    const updated = [...books];
    updated[index].title = newTitle;
    setBooks(updated);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "az") return a.title.localeCompare(b.title);
    if (sortOrder === "za") return b.title.localeCompare(a.title);
    if (sortOrder === "likes") return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-200">
        📚 Book List
      </h1>

      {/* Add Book */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Add a book..."
          className="flex-1 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addBook}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
        >
          Add
        </button>
      </div>

      {/* Search + Sort */}
      <div className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg p-2 shadow-sm"
        >
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>

      {/* List */}
      <ul className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => <Skeleton key={i} />)
        ) : (
          sortedBooks.map((book, index) => (
            <Titles
              key={index}
              title={book.title}
              likes={book.likes}
              onLike={() => increaseLikes(index)}
              onDelete={() => deleteBook(index)}
              onEdit={(newTitle) => editBook(index, newTitle)}
            />
          ))
        )}
      </ul>
    </div>
  );
}
