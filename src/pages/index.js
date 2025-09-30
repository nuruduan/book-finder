import { useState, useEffect } from "react";

// Like component
function Like({ title, onDelete }) {
  const [likes, setLikes] = useState(0);

  return (
    <li style={{ marginBottom: "10px" }}>
      {title} — 
      <button onClick={() => setLikes(likes + 1)}>👍 Like {likes}</button>
      <button onClick={onDelete} style={{ marginLeft: "10px", color: "red" }}>
        ❌ Delete
      </button>
    </li>
  );
}

// defines a react component called Home
export default function Home() {

  // useState is a hook that let components have state variables(remember values between function calls)
  const [name, setName] = useState(""); 
  const [books, setBooks] = useState([
    "Atomic Habits",
    "The Pragmatic Programmer",
    "Clean Code",
    "Ayam"
  ]); 
  const [newBook, setNewBook] = useState("");
  const [search, setSearch] = useState(""); // search filter
  const [sortOrder, setSortOrder] = useState("az"); // sort A-Z or Z-A
  const [loading, setLoading] = useState(true); // skeleton state

  // Simulate loading effect (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
 
  const addBook = () => {
    if (newBook.trim() === "") return; // prevent adding empty book titles
    setBooks([...books, newBook]); // add new book to books array
    setNewBook(""); // clear input field
  };

  // Delete book by index
  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  // Apply search filter
  const filteredBooks = books.filter((book) =>
    book.toLowerCase().includes(search.toLowerCase())
  );

  // Apply sort order
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "az") return a.localeCompare(b);
    if (sortOrder === "za") return b.localeCompare(a);
    return 0;
  });

  // Reset everything
  const resetApp = () => {
    setName("");
    setBooks([
      { title: "Atomic Habits", likes: 0 },
      { title: "The Pragmatic Programmer", likes: 0 },
      { title: "Clean Code", likes: 0 },
      { title: "Ayam", likes: 0 },
    ]);
    localStorage.clear();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Hello, Book Finder!</h1>

      <input
        type="text" // input field
        placeholder="Enter your name" // placeholder text
        value={name} // is name state variable
        onChange={(e) => setName(e.target.value)} // update state
      />

      {/*
      if name is empty, show "stranger"
      if name has value, show name
      */}
      <p>Welcome, {name || "stranger"} 👋</p> 

        <div>
          <h1 style={{ padding: "20px" }}>📚 Book Finder (Demo List)</h1>

          {/* New book input */}
          <input
            type="text"
            placeholder="Add a new book"
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
          />
          <button onClick={addBook}>➕ Add Book</button>
          
          <br/>
          <br/>
          
          {/* Search input */}
          <input
            type="text"
            placeholder="🔍 Search books"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginLeft: "10px" }}
          />

          {/* Sort buttons */}
          <button onClick={() => setSortOrder("az")} style={{ marginLeft: "10px" }}>
            ⬆️ Sort A–Z
          </button>
          <button onClick={() => setSortOrder("za")} style={{ marginLeft: "5px" }}>
            ⬇️ Sort Z–A
          </button>

          <ul style={{ padding: "20px" }}>

              {loading ? (
              // Skeleton loader (show placeholders while loading)
              <>
                <li style={{ background: "#ddd", height: "20px", marginBottom: "10px" }}></li>
                <li style={{ background: "#ddd", height: "20px", marginBottom: "10px" }}></li>
                <li style={{ background: "#ddd", height: "20px", marginBottom: "10px" }}></li>
              </>
            ) : (

              /*
              books = state variable (array of book titles)
              .map = loop through each book in the array, create a <li> for each book
              key={index} = unique key for each list item (index is the position in the array)
              */

                sortedBooks.map((book, index) => (
                  
                  <Like
                  key={index}
                  title={book}
                  likes={book.likes} 
                  onLike={() => likeBook(index)} 
                  onDelete={() => deleteBook(index)} /> // pass title and onDelete function as props
              ))
            )}  
          </ul>

          {/* Reset button */}
          <button
            onClick={resetApp}
            style={{ marginLeft: "10px", color: "white" }}
          >
            🔄 Reset App
          </button>

      </div>
    </div>

    
  );
}