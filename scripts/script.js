const addToLibraryBtn = document.querySelector('.openModal');
const bookDialog = document.querySelector('#bookDialog');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const readIt = document.getElementsByName('read');
const addBookBtn = document.querySelector('.addBookBtn');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.table(myLibrary);
}

addToLibraryBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  let read = '';

  for (let i = 0; i < readIt.length; i++) {
    if (readIt[i].checked) { read = readIt[i].value; }
  }

  addBookToLibrary(title, author, pages, read);

  bookDialog.close();

  bookTitle.value = '';
  bookAuthor.value = '';
  bookPages.value = '';
  readIt.value = 'no';

});

