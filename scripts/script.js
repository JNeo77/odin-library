const addToLibraryBtn = document.querySelector('.openModal');
const bookDialog = document.querySelector('#bookDialog');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const readIt = document.getElementsByName('read');
const bookForm = document.querySelector('#book-form');
const cancelBtn = document.querySelector('.cancelBtn');

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  let read = '';

  for (let i = 0; i < 2; i++) {
    if (readIt[i].checked) { read = readIt[i].value; }
  }

  const newBook = new Book(title, author, pages, read);
  
  myLibrary.push(newBook);

  console.table(myLibrary);
}

addToLibraryBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

bookForm.addEventListener("submit", (e) => {
 e.preventDefault();
 addBookToLibrary();
 bookDialog.close();
 bookForm.reset();
});

cancelBtn.addEventListener("click", () => {
  bookDialog.close();
  bookForm.reset();
});

