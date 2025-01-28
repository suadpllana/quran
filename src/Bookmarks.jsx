import React from "react";
import { FaTrashAlt } from "react-icons/fa";
const Bookmarks = ({ bookmarks , setBookmarks }) => {
    function deleteBookmarkById(id){
        const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        setBookmarks(filteredBookmarks)
    }
  return (
    <div className="bookmark-container">
        <h2>Bookmarked verses</h2>
        {bookmarks.length> 0 && <button onClick={() => setBookmarks([])}>Delete All Quotes</button> }
        <hr />
      {bookmarks.length === 0 ? (
        <p>No bookmarks done</p>
      ) : (
        <div>
          {bookmarks.map((bookmark) => (
            <>
            <p key={bookmark.id}>{bookmark.text}</p>
            <FaTrashAlt className="delete-bookmark" onClick={() => deleteBookmarkById(bookmark.id)}/>
          
            <hr />
            </>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
