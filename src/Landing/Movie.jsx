import BookmarkIcon from "../Icons/Bookmark/bookmark";
import BookmarkFilledIcon from "../Icons/Bookmark-filled/bookmark-filled";
import { Link } from 'react-router-dom';

export function Movie({ movie, bookmark }) {
  // const {movie, bookmark} = props;
  const { id, image, year, genre, pg, title, bookmarked } = movie;

  return (
    <article className="movie">
      <div className="movie__image-container">
      <Link to={`movie/${id}`}>
      <img src={image} alt="Movie"></img>
      </Link>
        <span
          className="movie__bookmark movie__bookmark--active"
          onClick={() => bookmark(movie, bookmarked)}
        >
          {
          bookmarked ? (<BookmarkFilledIcon></BookmarkFilledIcon>) : (<BookmarkIcon></BookmarkIcon>)
          }
        </span>
      </div>
      <p className="movie__footer">
        <span className="movie__year">{year}</span>
        <span className="movie__genre">{genre}</span>
        <span className="movie__pg">{pg}</span>
      </p>
      <h5 className="movie__title">{title}</h5>
    </article>
  );
}
