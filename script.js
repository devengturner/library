const myLibrary = [];
let numberOfBooks = 0;
let totalBooks = 0;
let totalRead = 0;
let totalUnread = 0;
let totalPages = 0;

const addButton = document.querySelector(".add-button");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-button");
const titleText = document.querySelector("#title");
const authorText = document.querySelector("#author");
const pagesText = document.querySelector("#pages");
const dialog = document.querySelector("dialog");
const library = document.querySelector(".library");
const readCheckBox = document.querySelector("#read");
const totalBooksEl = document.querySelector(".total-books");
const totalReadEl = document.querySelector(".total-read");
const totalUnreadEl = document.querySelector(".total-unread");
const totalPagesEl = document.querySelector(".total-pages");

totalBooksEl.textContent = "Total books: 0";
totalReadEl.textContent = "Total read: 0";
totalUnreadEl.textContent = "Total unread: 0";
totalPagesEl.textContent = "total pages read: 0";

addButton.addEventListener("click", function () {
  dialog.showModal();
});

closeButton.addEventListener("click", function () {
  dialog.close();
});

submitButton.addEventListener("click", function () {
  let title = titleText.value;
  let author = authorText.value;
  let pages = +pagesText.value;

  const newBook = new Book(title, author, pages);
  addBookToLibrary(newBook);
  displayBook(title, author, pages);
  dialog.close();
  titleText.value = "";
  authorText.value = "";
  pagesText.value = "";
  readCheckBox.checked = false;

  numberOfBooks++;
});

function Book(title, author, numberOfPages) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook(title, author, pages) {
  const bookElement = document.createElement("div");
  const titleElement = document.createElement("h1");
  const authorElement = document.createElement("p");
  const pagesElement = document.createElement("p");
  const removeButton = document.createElement("button");
  const readButton = document.createElement("button");
  const buttonContainer = document.createElement("div");

  titleElement.textContent = title;
  authorElement.textContent = author;
  pagesElement.textContent = pages;

  pagesElement.style.marginBottom = "25px";
  readButton.textContent = "Read";

  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", function () {
    bookElement.remove();
    totalBooks--;
    if (bookElement.classList.contains("read")) {
      totalRead--;
      totalPages = totalPages - pages;
    } else {
      totalUnread--;
    }

    totalBooksEl.textContent = "Total books: " + totalBooks;
    totalReadEl.textContent = "Total read: " + totalRead;
    totalUnreadEl.textContent = "Total unread: " + totalUnread;
    totalPagesEl.textContent = "Total pages read: " + totalPages;
  });

  readButton.addEventListener("click", function () {
    if (bookElement.classList.contains("read")) {
      totalRead--;
      totalUnread++;
      totalPages -= pages;
      totalReadEl.textContent = "Total read: " + totalRead;
      totalUnreadEl.textContent = "Total unread: " + totalUnread;
      totalPagesEl.textContent = "Total pages read: " + totalPages;
    } else {
      totalUnread--;
      totalRead++;
      totalPages += pages;
      totalUnreadEl.textContent = "Total unread: " + totalUnread;
      totalReadEl.textContent = "Total read: " + totalRead;
      totalPagesEl.textContent = "Total pages read: " + totalPages;
    }

    readButton.textContent =
      readButton.textContent == "Read" ? "Unread" : "Read";
    bookElement.classList.toggle("read");
  });

  if (readCheckBox.checked) {
    bookElement.classList.add("read");
    readButton.textContent = "Unread";
    totalRead++;
    totalBooks++;
    totalReadEl.textContent = "Total read: " + totalRead;
    totalBooksEl.textContent = "Total books: " + totalBooks;
    totalPages += pages;
    totalPagesEl.textContent = "Total pages read: " + totalPages;
  } else {
    bookElement.classList.add("unread");
    readButton.textContent = "Read";
    totalUnread++;
    totalBooks++;
    totalUnreadEl.textContent = "Total unread: " + totalUnread;
    totalBooksEl.textContent = "Total books: " + totalBooks;
  }

  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "20px";
  buttonContainer.style.alignContent = "flex-end";
  buttonContainer.style.justifyContent = "center";

  buttonContainer.style.marginTop = "auto";

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorElement);
  bookElement.appendChild(pagesElement);
  bookElement.appendChild(buttonContainer);
  bookElement.classList.add("book");

  bookElement.style.display = "flex";
  bookElement.style.flexDirection = "column";
  readButton.style.alignSelf = "bottom";
  removeButton.style.alignSelf = "bottom";

  library.appendChild(bookElement);
}
