function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // return array with two nested arrays
  // array 1: checked out books
  // array 2: returned books
  const checkedOut = books.filter((book) => {
    if (!book.borrows[0].returned) return book;
  });
  const returned = books.filter((book) => {
    if (book.borrows[0].returned) return book;
  });
  
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];

  book.borrows.forEach(borrow => {
    const { id, returned } = borrow;
    // find accounts whose id is within borrowed.
    let account = accounts.find(acc => {
      return acc.id === id;
    });
    // return account info plus return status.
    borrowers.push({...account, returned});
  });

  // limit array to 10 members.
  return borrowers.length > 10 ? borrowers.slice(0,10) : borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
