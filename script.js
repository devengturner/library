const myLibrary = [];
let numberOfBooks = 0;

const addButton = document.querySelector(".add-button");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-button");
const titleText = document.querySelector("#title");
const authorText = document.querySelector("#author");
const pagesText = document.querySelector("#pages");
const dialog = document.querySelector("dialog");
const library = document.querySelector(".library");
const readCheckBox = document.querySelector("#read");

addButton.addEventListener("click", function () {
  dialog.showModal();
});

closeButton.addEventListener("click", function () {
  dialog.close();
});

submitButton.addEventListener("click", function () {
  let title = titleText.value;
  let author = authorText.value;
  let pages = pagesText.value;
  let readStatus = false;

  if (readCheckBox.checked == true) {
    readStatus = true;
  }

  const newBook = new Book(title, author, pages);
  addBookToLibrary(newBook);
  displayBook(title, author, pages, readStatus);
  dialog.close();
  titleText.value = "";
  authorText.value = "";
  pagesText.value = "";
  readCheckBox.checked = false;
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
  const removeText = document.createTextNode("Remove");
  let readStatusMessage = document.createElement("p");

  pagesElement.style.marginBottom = "25px";
  readButton.textContent = "Read";

  removeButton.appendChild(removeText);
  removeButton.addEventListener("click", function () {
    bookElement.remove();
  });

  readButton.addEventListener("click", function () {
    readStatusMessage.textContent =
      readStatusMessage.textContent == "Read" ? "Unread" : "Read";
    readButton.textContent =
      readButton.textContent == "Read" ? "Unread" : "Read";
    bookElement.classList.toggle("read");
  });

  titleElement.textContent = title;
  authorElement.textContent = author;
  pagesElement.textContent = pages;

  if (readCheckBox.checked) {
    readStatusMessage.textContent = "Read";
    bookElement.classList.add("read");
    readButton.textContent = "Unread";
  } else {
    readStatusMessage.textContent = "Unread";
    bookElement.classList.add("unread");
    readButton.textContent = "Read";
  }

  bookElement.appendChild(titleElement);
  bookElement.appendChild(authorElement);
  bookElement.appendChild(pagesElement);
  bookElement.appendChild(readStatusMessage);
  bookElement.appendChild(removeButton);
  bookElement.appendChild(readButton);
  bookElement.classList.add("book");

  library.appendChild(bookElement);
}
