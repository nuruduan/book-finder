import { useState, useEffect } from "react";
import Titles from "../components/Titles";
import Skeleton from "../components/Skeleton";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);

  // Load from localStorage (only in browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBooks = localStorage.getItem("books");
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks));
      }
      setTimeout(() => setLoading(false), 1200); // simulate loading
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books]);

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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "az") return a.title.localeCompare(b.title);
    if (sortOrder === "za") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Book List</h1>

      {/* Add Book */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Add a book..."
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Search + Sort */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 border rounded p-2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded p-2"
        >
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* Loading skeleton */}
      <div className="flex flex-col gap-3">
        {loading
          ? Array(books.length || 1)
              .fill(null)
              .map((_, i) => <Skeleton key={i} />)
          : sortedBooks.map((book, index) => (
              <Titles
                key={index}
                title={book.title}
                likes={book.likes}
                onLike={() => increaseLikes(index)}
                onDelete={() => deleteBook(index)}
              />
            ))}
      </div>
    </div>
  );
}
