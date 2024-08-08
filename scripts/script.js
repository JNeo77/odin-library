const addToLibraryBtn = document.querySelector('.openModal');
const bookDialog = document.querySelector('#bookDialog');
const bookTitle = document.querySelector('#title-input');
const bookAuthor = document.querySelector('#author-input');
const bookPages = document.querySelector('#pages-input');
const readIt = document.getElementsByName('read');
const bookForm = document.querySelector('#book-form');
const cancelBtn = document.querySelector('.cancelBtn');
const bookContainer = document.querySelector('.book-container');

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    if (this.read === 'no') {
        this.read = 'yes';
      } else {
        this.read = 'no';
      }
    return this.read;
  }
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

  displayBooks(myLibrary);
}

function displayBooks(library) {
  let containerChild = bookContainer.lastElementChild;
  while (containerChild) {
    bookContainer.removeChild(containerChild);
    containerChild = bookContainer.lastElementChild;
  }

  library.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.dataset.index = library.indexOf(book);
    
    const bookCardTitle = document.createElement("h2");
    bookCardTitle.textContent = book.title;
    
    const bookCardAuthor = document.createElement("p");
    bookCardAuthor.classList.add("book-info");
    bookCardAuthor.textContent = `by ${book.author}`;
    
    const bookCardPages = document.createElement("p");
    bookCardPages.classList.add("book-info");
    bookCardPages.textContent = `${book.pages} Pages`;

    const bookCardRead = document.createElement("p");
    if (book.read === 'no') {
      bookCardRead.classList.add("not-read");
      bookCardRead.textContent = "Status: Not Read Yet";
    } else {
      bookCardRead.textContent = "Status: Read";
    }

    const cardBtns = document.createElement("div");
    cardBtns.classList.add("card-btns");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      const bookIndex = parseInt(bookCard.dataset.index);
      myLibrary.splice(bookIndex, 1);
      displayBooks(myLibrary);
    });
    
    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.textContent = book.read === "yes" ? "Not Read" : "Read";
    readBtn.addEventListener("click", () => {
      const readUpdate = book.toggleRead();
      if (readUpdate === 'no') {
        bookCardRead.textContent = "Status: Not Read Yet";
        readBtn.textContent = "Read";
      } else {
        bookCardRead.textContent = "Status: Read";
        readBtn.textContent = "Not Read";
      }
      bookCardRead.classList.toggle("not-read");
    });

    cardBtns.appendChild(deleteBtn);
    cardBtns.appendChild(readBtn);

    bookCard.appendChild(bookCardTitle);
    bookCard.appendChild(bookCardAuthor);
    bookCard.appendChild(bookCardPages);
    bookCard.appendChild(bookCardRead);
    bookCard.appendChild(cardBtns);

    bookContainer.appendChild(bookCard);
  });
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