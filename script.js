// Book array
const myLibrary = [];

// Book constructor
function newBook(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// Create a new book and add to array
function addNewBook(title, author, pages, read) {
    let tempBook = new newBook(title, author, pages, read);
    myLibrary.push(tempBook);
}

// DOM references
const titleinput = document.getElementById("title-input");
const authorinput = document.getElementById("author-input");
const pagesinput = document.getElementById("pages-input");

const addbtn = document.getElementById("addbtn");
const createBookbtn = document.getElementById("createBookbtn");
const closebtn = document.getElementById("closebtn");

const dialog = document.getElementById("input-dialog");
const form = document.getElementById("book-form");

// Show dialog
createBookbtn.addEventListener("click", function () {
    dialog.showModal();
});

// Close dialog
closebtn.addEventListener("click", function () {
    dialog.close();
});

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let title = titleinput.value.trim();
    let author = authorinput.value.trim();
    let pages = Number(pagesinput.value);

    let read = document.querySelector('input[name="status"]:checked').value === "true";

    addNewBook(title, author, pages, read);

    form.reset();
    dialog.close();
});

console.log(myLibrary)