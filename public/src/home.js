function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;

  books.forEach(book => {
    if (!book.borrows[0].returned) count++;
  });

  return count;
}

function getMostCommonGenres(books) {
  const common = [];
/*  for each book, check if an entry for the genre exists
    inside 'common'. if yes, update the count. if not,
    create an object inside common for that genre.  */
  books.forEach(book => {
    let genre = book.genre;
    common.some((entry) => entry.name === genre) ?
      common.forEach((entry, i) => {if (entry.name === genre) common[i].count++}) :
      common.push({"name":`${genre}`, "count":1});
  });
  
  //sort and return shortened array if needed
  common.sort((a,b) => b.count - a.count);
  return common.length > 5 ? common.slice(0,5) : common;
}

function getMostPopularBooks(books) {
  // return descending-ordered array of <=5 book objects.
  // book object = name, count (times borrowed).
  let booksArr = [...books];
  const sortedArray = booksArr
    .sort((a,b) => b.borrows.length - a.borrows.length)
    .slice(0,5);
  
  // take sorted + shortened array and only return reduced objects.
  const popBooks = sortedArray.reduce((result, book) => {
    const name = book.title;
    const count = book.borrows.length;
    result.push({ name, count });
    return result;
  }, []);
  
  return popBooks;
}

function getMostPopularAuthors(books, authors) {
  // returns descending-order arr of <=5 author objs.
  // author objs = name, count (times books were borrowed).
  const allAuthors = authors.reduce((result, auth) => {
      const { id, name } = auth;
      const { first, last } = name;
      const count = getCheckoutCount(id, books);
      result.push({name: `${first} ${last}`, count });
      return result;
  }, []);
  
  // sort and shorten to 5 most popular.
  const popAuthors = allAuthors
    .sort((a,b) => b.count - a.count)
    .slice(0,5);

  return popAuthors;
}

// helper function to count how often an author's books were checked-out.
function getCheckoutCount(id, books) {
  let count = 0;
  books.forEach(book => {if (book.authorId === id) count+=book.borrows.length});
  return count;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
