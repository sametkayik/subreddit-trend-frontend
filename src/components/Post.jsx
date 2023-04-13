import React from "react";
import "../App.css";
import PostHeader from "./Post/PostHeader";
import PostBody from "./Post/PostBody";
import PostFooter from "./Post/PostFooter";

export const Post = ({ item }) => {
  const [showText, setShowText] = React.useState(false);
  const [showThumbnail, setShowThumbnail] = React.useState(true);
  const [isFavorited, setIsFavorited] = React.useState(
    localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites")).some(
          (favorite) => favorite.id === item.id
        )
      : false
  );

  const handleClick = () => {
    setShowText(!showText);
    setShowThumbnail(!showThumbnail);
  };

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorited) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((favorite) => favorite.id !== item.id))
      );
      setIsFavorited(false);
    } else {
      favorites.push(item);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  return (
    <div className="post-card">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        {item.thumbnail && (
          <img
            className="thumbnail"
            src={item.thumbnail}
            alt=""
            style={{ margin: "10px", width: "140px", height: "140px" }}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <PostHeader item={item} />

          {showText ? (
            <button className="show-text-button" onClick={handleClick}>
              Hide content
            </button>
          ) : (
            <button className="show-text-button" onClick={handleClick}>
              Show content
            </button>
          )}

          <PostBody item={item} showText={showText} />

          <PostFooter
            item={item}
            isFavorited={isFavorited}
            handleFavoriteClick={handleFavoriteClick}
          />
        </div>
      </div>
    </div>
  );
};
