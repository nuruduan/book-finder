import { useState, useEffect } from "react";
import Titles from "../components/Titles";
import Skeleton from "../components/Skeleton";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [darkMode, setDarkMode] = useState(true); // default dark
  

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBooks = localStorage.getItem("books");
      if (savedBooks) setBooks(JSON.parse(savedBooks));
      else setBooks([]);
      setTimeout(() => setLoading(false), 800);
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
    if (newBook.trim() === "" || newCategory.trim() === "") return;
    setBooks([
      ...books,
      {
        id: crypto.randomUUID(),
        title: newBook,
        category: newCategory || "Uncategorized",
        likes: 0,
        liked: false,
      },
    ]);
    setNewBook("");
    setNewCategory("");
  };

  const likeBook = (id) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? {
              ...book,
              likes: book.liked ? book.likes - 1 : book.likes + 1,
              liked: !book.liked,
            }
          : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const editBook = (id, newTitle) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, title: newTitle } : book
      )
    );
  };

  const resetAll = () => {
    setBooks([]);
    localStorage.removeItem("books");
  };

  const filteredBooks = books
    .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
    .filter((book) => !categoryFilter || book.category === categoryFilter);

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "az") return a.title.localeCompare(b.title);
    if (sortOrder === "za") return b.title.localeCompare(a.title);
    if (sortOrder === "likes") return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 min-h-screen relative">
      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        📚 Book List
      </h1>

      {/* Add Book */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Book title..."
          className="flex-1 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200"
        />
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category..."
          className="border rounded-lg p-2 w-32 dark:bg-gray-800 dark:text-gray-200"
        />
        <button
          onClick={addBook}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
        >
          Add
        </button>
      </div>

      {/* Search + Sort + Filter */}
      <div className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg p-2 shadow-sm dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
          <option value="likes">Most Liked</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg p-2 shadow-sm dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="">All Categories</option>
          {Array.from(new Set(books.map((book) => book.category))).map(
            (cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            )
          )}
        </select>
        {process.env.NODE_ENV === "development" && (
          <button
            onClick={resetAll}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Book List */}
      <ul className="space-y-3">
        {loading ? (
          [...Array(books.length || 1)].map((_, i) => <Skeleton key={i} />)
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500">
            No books found 📭
          </p>
        ) : (
          sortedBooks.map((item) => (
            <Titles
              key={item.id}
              title={item.title}
              category={item.category}
              likes={item.likes}
              liked={item.liked}
              onLike={() => likeBook(item.id)}
              onDelete={() => deleteBook(item.id)}
              onEdit={(newTitle) => editBook(item.id, newTitle)}
            />
          ))
        )}
      </ul>
    </div>
  );
}
