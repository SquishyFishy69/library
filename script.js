const addButton = document.getElementById("add");
const bodyDiv = document.getElementsByClassName("body")[0];
const myLibrary = JSON.parse(localStorage.getItem("mylibrary")) || [];

class Book {
  constructor(title = "Unknown", author = "Unknown", pages = 0, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const showForm = () => {
  const form = document.querySelector(".form");
  switchDisplay();
  form.onsubmit = addBookToLibrary;
};

function switchDisplay() {
  const form = document.querySelector(".form");
  form.style.display =
    form.style.display == "flex"
      ? (form.style.display = "none")
      : (form.style.display = "flex");
}

const addBookToLibrary = (e) => {
  e.preventDefault();
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");

  if (
    title.checkValidity() &&
    author.checkValidity() &&
    pages.checkValidity() &&
    read.checkValidity()
  ) {
    const titleVal = title.value;
    const authorVal = author.value;
    const pagesVal = pages.value;
    const readVal = read.checked;
    const newBook = new Book(titleVal, authorVal, pagesVal, readVal);

    addBook(newBook);
    switchDisplay();
  }
};

function addBook(book) {
  myLibrary.push(book);
  localStorage.setItem("mylibrary", JSON.stringify(myLibrary));
  loopBooks();
}

const loopBooks = () => {
  while (bodyDiv.firstChild) {
    bodyDiv.removeChild(bodyDiv.lastChild);
  }
  myLibrary.forEach(function (book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add(
      book["title"].replace(/\s/g, "").toLowerCase(),
      "card"
    );

    const removeBookContainer = document.createElement("div");

    const removeBook = document.createElement("input");
    removeBook.setAttribute("type", "image");
    removeBook.setAttribute(
      "src",
      "https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-1/253988/11-512.png"
    );

    removeBook.classList.add("closeBtn", book["title"].split(" ").join(""));
    removeBook.addEventListener("click", removeBookBtn);
    removeBookContainer.appendChild(removeBook);

    bookCard.appendChild(removeBookContainer);

    const bookCardBottom = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = book["title"];
    bookCardBottom.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book["author"]}`;
    bookCardBottom.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `${book["pages"]} pages`;
    bookCardBottom.appendChild(pages);

    const read = document.createElement("input");
    read.setAttribute("type", "button");
    read.classList.add(book["title"].split(" ").join(""));
    if (book.read) {
      read.setAttribute("value", "Read");
      read.classList.add("readBtn");
    } else {
      read.setAttribute("value", "Not read");
      read.classList.add("notReadBtn");
    }
    read.addEventListener("click", changeReadClass);
    bookCardBottom.appendChild(read);

    bookCard.appendChild(bookCardBottom);
    bodyDiv.appendChild(bookCard);
  });
};

addButton.addEventListener("click", showForm, false);
window.addEventListener("load", loopBooks);

const changeReadClass = (e) => {
  console.log(e.target);
  if (e.target.classList[1] === "readBtn") {
    e.target.setAttribute("value", "Not read");
    e.target.classList.replace("readBtn", "notReadBtn");
  } else {
    e.target.setAttribute("value", "Read");
    e.target.classList.replace("notReadBtn", "readBtn");
  }
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == e.target.classList[0])
      myLibrary[i].read = !myLibrary[i].read;
  }
};

const removeBookBtn = (e) => {
  const bookID = e.target.classList[1];
  bodyDiv.removeChild(document.querySelector(`.${e.target.classList[1]}`));
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i]["title"].replace(/\s/g, "").toLowerCase() == bookID) {
      myLibrary.splice(i, 1);
      break;
    }
  }
};
