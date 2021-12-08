const addButton = document.getElementById("add");
const bodyDiv = document.getElementsByClassName("body")[0];
let myLibrary = [
    { title: 'Hyperion', author: 'Dan Simmons', pages: '300', read: true },
    { title: 'Animal Farm', author: 'George Orwell', pages: '200', read: false },
    { title: 'In Search of Lost Time', author: "Marcel Proust", pages: '400', read: false }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages}, ${read}`;
    }
}

function addBookToLibrary() {
    let title = prompt("Enter the title of the book");
    let author = prompt("Enter the author of the book");
    let pages = prompt("Enter the number of pages");
    let read = prompt("Have you read the book? y/n");
    read = (read === 'y') ? true : false;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].author == author && myLibrary[i].title == title) {
            alert("You have entered an existing book!");
            return;
        } else if (!read > 0 || read % 1 != 0) {
            alert("You have not entered an integer for the page count!");
            return;
        }
    }
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    loopBooks()
}

function loopBooks() {
    while (bodyDiv.firstChild) {
        bodyDiv.removeChild(bodyDiv.lastChild);
    }
    myLibrary.forEach(function (book) {
        let bookCard = document.createElement('div');
        bookCard.classList.add(book['title'].split(' ').join(""), 'card');

        let removeBookContainer = document.createElement('div');
        removeBookContainer.setAttribute("style", "display: flex; flex-direction: row; flex-wrap: wrap; justify-content: right;")

        let removeBook = document.createElement('input');
        removeBook.setAttribute("type", "image");
        removeBook.setAttribute("src", "https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-1/253988/11-512.png")
        removeBook.setAttribute("style", "margin: 0; padding: 0; height: 20px; width: 20px;")
        removeBook.classList.add("closeBtn", book['title'].split(' ').join(""));
        removeBook.addEventListener("click", removeBookBtn);
        removeBookContainer.appendChild(removeBook);

        bookCard.appendChild(removeBookContainer);

        let bookCardBottom = document.createElement('div');
        bookCardBottom.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; align-items: center;")


        let title = document.createElement('h2');
        title.textContent = book['title'];
        title.setAttribute("style", "margin: 5px; padding: 0; font-size: 24px")
        bookCardBottom.appendChild(title);

        let author = document.createElement('p');
        author.textContent = `Author: ${book['author']}`;
        author.setAttribute("style", "margin: 5px; padding: 0;")
        bookCardBottom.appendChild(author);

        let pages = document.createElement('p');
        pages.textContent = `${book['pages']} pages`;
        pages.setAttribute("style", "margin: 5px; padding: 0;")
        bookCardBottom.appendChild(pages);

        let read = document.createElement('input');
        read.setAttribute("type", "button")
        read.classList.add(book['title'].split(' ').join(""));
        if (book.read) {
            read.setAttribute("value", "Read");
            read.classList.add("readBtn")
        } else {
            read.setAttribute("value", "Not read");
            read.classList.add("notReadBtn");
        }
        read.addEventListener("click", changeReadClass);
        bookCardBottom.appendChild(read);

        bookCard.appendChild(bookCardBottom);
        bodyDiv.appendChild(bookCard);
    })
}

addButton.addEventListener("click", addBookToLibrary, false);
window.addEventListener("load", loopBooks);

function changeReadClass(e) {
    console.log(e.target);
    if (e.target.classList[1] === 'readBtn') {
        e.target.setAttribute("value", "Not read");
        e.target.classList.replace("readBtn", "notReadBtn");
    } else {
        e.target.setAttribute("value", "Read");
        e.target.classList.replace("notReadBtn", "readBtn");
    }
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == e.target.classList[0]) myLibrary[i].read = !myLibrary[i].read;
    }
}

function removeBookBtn(e) {
    let bookID = e.target.classList[1];
    bodyDiv.removeChild(document.querySelector(`.${e.target.classList[1]}`));
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i]["title"].split(' ').join('') == bookID) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}