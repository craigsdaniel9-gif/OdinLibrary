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
//protoype method to toggle book
newBook.prototype.toggleRead = function () {
    this.read = !this.read;
};



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
    addBookToHTML(myLibrary);

    form.reset();
    dialog.close();
});

//a function that creates new elements

function addBookToHTML(myLibrary){
    document.getElementById("main").innerHTML=""
    for (const items of myLibrary){
        //create a div
        let tempdiv = document.createElement("div");
        tempdiv.classList.add("book");
        tempdiv.id = items.id;
        //create title
        let temph2 = document.createElement("h2");
        temph2.textContent = items.title;
        //create author
        let tempauthor = document.createElement("h4");
        tempauthor.textContent = `${items.author} ${items.pages}Pg`;
        //ADD THESE TO THE NEW DIV
        tempdiv.append(temph2);
        tempdiv.append(tempauthor);

        //CREATE A NEW DIV FOR BUTTONS
        let tempdiv2 = document.createElement("div");
        tempdiv2.classList.add("controls");

        //create a delete button
        let tempdel = document.createElement("button");
        tempdel.id = "delete";
        tempdel.innerHTML = '<i class="fa-solid fa-trash"></i>';

        //create a reading button
        let tempstatus = document.createElement("button");
        tempstatus.id = "toggle";
        if(items.read == true){
            tempstatus.style.backgroundColor="green";
           tempstatus.innerHTML = '<i class="fa-solid fa-check"></i>';
            
        }
        else{
          tempstatus.style.backgroundColor="gold";
          tempstatus.innerHTML = '<i class="fa-solid fa-exclamation"></i>';
        }

        //add these to button div
        tempdiv2.append(tempstatus);
        tempdiv2.append(tempdel);

        //add this to the book div
        tempdiv.append(tempdiv2);

        document.getElementById("main").append(tempdiv);

    }
}


//delete logic
function deleteBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
    addBookToHTML(myLibrary);
}

//toggle logic
function toggleBookStatus(bookId) {

    const book = myLibrary.find(book => book.id === bookId);

    if (book) {
        book.toggleRead();
    }

    addBookToHTML(myLibrary);
}

const main = document.getElementById("main");

main.addEventListener("click", function (e) {

    const deleteBtn = e.target.closest("#delete");
    const toggleBtn = e.target.closest("#toggle");

    if (deleteBtn) {
        const bookDiv = deleteBtn.closest(".book");
        deleteBook(bookDiv.id);
    }

    if (toggleBtn) {
        const bookDiv = toggleBtn.closest(".book");
        toggleBookStatus(bookDiv.id);
    }

});