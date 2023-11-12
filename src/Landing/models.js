export class MovieItem {
    constructor(id, title, year, genre, image, pg, bookmarked) {
      this.id = id;
      this.title = title;
      this.year = year;
      this.genre = genre;
      this.image = image;
      this.pg = pg;
      this.bookmarked = bookmarked;
    }

    bookmark(bookmarked) {
      this.bookmarked = bookmarked;
    }
  }