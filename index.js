const booksNames = [];
var dialog = document.querySelector('dialog');
let contPages = 0
let tiempoDeLectura = 0;
let deleteInfo = false;
let pagesDeleted = 0;
let contDiv = 0;
let infoVerification;
const divInfo = [];
const divs = [];



const informationDiv = document.getElementById("info");
const buttonDisplayer = document.getElementById("show");

const img = document.createElement("img")
img.classList.add("img")
img.src = "IMG/flecha-correcta.png"
buttonDisplayer.appendChild(img);

let informationVerificator = true;

function showInformation() {

  let completed = parseFloat(document.getElementById("completed-pages").value);

  if (isNaN(completed)) {
    completed = 0;
  }

  if (deleteInfo == false) {

    contPages = contPages + completed;
    tiempoDeLectura = (contPages * 2) / 60;

  } else {
    contPages = contPages - pagesDeleted;
    tiempoDeLectura = (contPages * 2) / 60;
    deleteInfo = false;

  }



  informationDiv.innerHTML = `
<h2>Information</h2>
<p> Books read: ${booksNames.length}</p>
<p>Total completed pages: ${contPages} </p>
<p>Time reading: ${tiempoDeLectura}H </p>

`;

}

function divShow() {
  if (informationVerificator == true) {

    buttonDisplayer.addEventListener("mousedown", function () {

      informationDiv.classList.remove("none")
      img.src = "IMG/flecha-correcta (1).png"

    });
    informationVerificator = false;
  } else {

    buttonDisplayer.addEventListener("mousedown", function () {

      informationDiv.classList.add("none")
      img.src = "IMG/flecha-correcta.png"

    });
    informationVerificator = true;
  }
}


window.addEventListener("load", function () {
  divShow();
});


function showDialog() {
  document.getElementById("dialog").showModal();
}

function saveDialog(event) {

  event.preventDefault()


  const total = document.getElementById("total-pages").value;
  const completed = document.getElementById("completed-pages").value;


  if (isBookNameUnique() == true) {
    if (completed <= total) {
      error.innerText = "";



      const bookName = document.getElementById("book-name").value;
      const author = document.getElementById("author").value;
      const totalPages = document.getElementById("total-pages").value;
      let completedPages = document.getElementById("completed-pages").value;




      if (isNaN(completedPages) || completedPages == "") {
        completedPages = 0;
      }



      let status;

      if (completed == total) {
        status = "Read";

      } else {
        status = "Not Read"
      }
      infoVerification = status;

      let bookInformation = {
        bookName: bookName,
        author: author,
        totalPages: totalPages,
        completedPages: completedPages,
        status: status
      }

      divInfo.push(bookInformation);
      console.log(showInformation());
      console.log(bookInformation)
      dialog.close();
      displayBook(bookInformation);
      console.log(isBookNameUnique())


    } else {


      validatePages();
      /*
      const error2 = document.createElement("span");
  
      error2.innerHTML = 
        <p> Error <p>
      ; */
    }
  } else {
    const error = document.getElementById("error");
    error.style.color = "red";
    error.innerText = "Error: Este libro ya ha sido introducido antes.";
    isBookNameUnique();

  }

}



function validatePages() {
  const totalInput = document.getElementById("total-pages");
  const completedInput = document.getElementById("completed-pages");
  const total = parseInt(totalInput.value);
  let completed = parseInt(completedInput.value);
  const error = document.getElementById("error");

  if (isNaN(completed) || completed == "") {
    completed = 0;
  }


  if (completed <= total) {
    error.innerText = ""
  } else {

    error.style = "color: red"
    error.innerText = "Error: El numero de paginas \nleidas debe ser menor o igual al \nnumero de paginas totales";
  }


}

/*function createDeleteButton(bookDetailsList) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Eliminar";

  deleteButton.addEventListener("click", function () {

    console.log(divInfo)
    console.log("HOLA")
    pagesDeleted = divInfo[bookDetailsList.id].completedPages;
    
    if (bookDetailsList.id == "0") {
      divInfo.splice(bookDetailsList.id, bookDetailsList.id + 1);
      booksNames.splice(bookDetailsList.id, bookDetailsList.id + 1);
    } else {
      divInfo.splice(bookDetailsList.id, bookDetailsList.id)
      booksNames.splice(bookDetailsList.id, bookDetailsList.id);
    }
    deleteInfo = true;
    console.log(divInfo)
    showInformation();
    bookDetailsList.remove();
    

  });
  return deleteButton;
}*/

function createDeleteButton(bookDetailsList) {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Eliminar";

  deleteButton.addEventListener("click", function () {

    console.log(divInfo)
    console.log(booksNames)
    console.log(bookDetailsList.id)

    let id = parseFloat(bookDetailsList.id);
    
    pagesDeleted = divInfo[bookDetailsList.id].completedPages;

    console.log(divInfo.length-1)
 
    
    divInfo.splice(bookDetailsList.id, 1);
    booksNames.splice(bookDetailsList.id, 1);
    divs.splice(bookDetailsList.id, 1);
      
    deleteInfo = true;
    contDiv--;


    for (let i = 0; i < divInfo.length; i++) {
      divs[i].setAttribute("id", i);

    }

    bookDetailsList.remove();
    console.log("Nuevo array: ")
    console.log(divInfo)
    console.log(booksNames)
    console.log(divs)

  });
  return deleteButton;
}





function createReadButton() {
  const readButton = document.createElement("button");
  readButton.classList.add("read-button");

  if (infoVerification == "Read") {
    readButton.textContent = "Read";
    readButton.style = "background-color: #C4DF9B;";
  } else {
    readButton.textContent = "Reading";
    readButton.style = "background-color:  rgb(255, 255, 153)";
  }

  readButton.addEventListener("click", function () {
    if (infoVerification == "Not Read") {
      infoVerification = "Reading";
      readButton.textContent = "Reading";
      readButton.style = "background-color:  rgb(255, 255, 153)";
    } else {
      infoVerification = "Not Read";
      readButton.textContent = "Read";
      readButton.style = "background-color: #C4DF9B;";
      readButton.classList.add("read");
    }
  });

  return readButton;
}



function isBookNameUnique() {
  let bookNameInput = document.getElementById("book-name");
  let bookNameValue = bookNameInput.value;

  // Verifica si el valor ya existe en el arreglo
  if (booksNames.includes(bookNameValue)) {
    return false; // Retorna falso si el nombre ya existe
  } else {
    booksNames.push(bookNameValue); // Agrega el nombre nuevo al arreglo
    return true; // Retorna verdadero si el nombre es único
  }
}

function displayBook(book, bookIndex) {
  const bookList = document.getElementById("book-list");

  const bookDetailsList = document.createElement("div");
  bookDetailsList.classList.add("card");
  bookDetailsList.setAttribute("id", divInfo.length-1);
  bookList.appendChild(bookDetailsList);


  bookDetailsList.innerHTML = `
      <p> "${book.bookName}"</p>
      <p>Author: ${book.author} </p>
      <p>Progress: ${book.completedPages} / ${book.totalPages} Pages </p>

    `;


  const readButton = createReadButton();
  bookDetailsList.appendChild(readButton);

  const deleteButton = createDeleteButton(bookDetailsList);
  deleteButton.setAttribute("id", divInfo.length);
  bookDetailsList.appendChild(deleteButton);

  divs.push(bookDetailsList)
  console.log(divInfo)

  console.log(divs)

  contDiv++;

}

function hideDialog() {
  dialog.close();
}
