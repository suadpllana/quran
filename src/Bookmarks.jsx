import React from "react";

const Bookmarks = ({ bookmarks , setBookmarks }) => {
    function deleteBookmarkById(id){
        const filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        setBookmarks(filteredBookmarks)
    }
  return (
    <div className="bookmark-container">
        <h2>Bookmarked verses</h2>
        <hr />
      {bookmarks.length === 0 ? (
        <p>No bookmarks done</p>
      ) : (
        <div>
          {bookmarks.map((bookmark) => (
            <>
            <p key={bookmark.id}>{bookmark.text}</p>
            <p className="delete-bookmark" onClick={() => deleteBookmarkById(bookmark.id)}>X</p>
            <hr />
            </>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
