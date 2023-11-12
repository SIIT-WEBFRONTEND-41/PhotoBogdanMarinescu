export default function MovieForm(props) {
    const { onSubmit, movie = {} } = props;

    function handleSubmit(event) {
      event.preventDefault();
      const { url, year, genre, pg, title } = event.target;

      const updatedMovie = {
        ...movie,
        image: url.value,
        year: year.value,
        genre: genre.value,
        pg: pg.value,
        title: title.value,
    };
    onSubmit(updatedMovie);
    event.target.reset();
  }

    return (
        <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            name="url"
            defaultValue={movie?.image}
          ></input>
        </fieldset>

        <fieldset>
          <label htmlFor="year">Year of release:</label>
          <input
            id="year"
            type="number"
            name="year"
            min={1900}
            max={2100}
            defaultValue={movie?.year}
          ></input>
        </fieldset>

        <fieldset>
          <label htmlFor="genre">Genre:</label>
          <select id="genre" name="genre" defaultValue={movie?.genre}>
            <option value="Comedy">Comedy</option>
            <option value="Action">Action</option>
            <option value="SF">SF</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Drama">Drama</option>
            <option value="Thriler">Thriler</option>
            <option value="Historical">Historical</option>
            <option value="Horror">Horror</option>
            <option value="Biography">Biography</option>
            <option value="Documentary">Documentary</option>
            <option value="Animation">Animation</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Sports">Sports</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="pg">Rating:</label>
          <select id="pg" name="pg" defaultValue={movie?.pg}>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={movie?.title}
          ></input>
        </fieldset>

        <button>Submit</button>
      </form>
    )
}