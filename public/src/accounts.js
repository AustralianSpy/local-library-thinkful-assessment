function findAccountById(accounts, id) {
  return accounts.find((acc) => acc.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b) => {
    if (a.name.last < b.name.last) return -1;
    if (a.name.last > b.name.last) return 1;
    return 0;
  });
}

function getTotalNumberOfBorrows(account, books) {
  // account is object -> account.id
  // array of books -> books.book.borrows.id (borrows is an array of objects)
  const { id } = account;
  let count = 0;

  books.forEach(book => {
    book.borrows.forEach(borrow => {
      if (borrow.id === id) count++;
    });
  });

  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  // account object, array of book objects, array of author objects.
  // return array of book objects w/ author info currently checked
  // out by account.
  const { id } = account;
  const unreturned = unreturnedBooks(books, id);
  // add author information to book objects.
  const unreturnedWithAuthors = unreturned.map((book) => {
    const { authorId } = book;
    const author = authors.find(author => {
      if (author.id === authorId) return author;
    });
    return {...book, author};
  });
  
  return unreturnedWithAuthors;
}

// helper function to find books account has not returned.
function unreturnedBooks(books, id) {
  const result = [];
  books.filter(book => {
    book.borrows.forEach(borrow => {
      if (borrow.id === id && !borrow.returned) result.push(book);
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
