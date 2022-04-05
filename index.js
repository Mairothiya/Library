console.log("Welcome to library");
showList();

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

//submit event listener
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let type;
    let fiction = document.getElementById("fiction");
    let science = document.getElementById("science");
    let commerce = document.getElementById("commerce");

    if (fiction.checked) {
        type = fiction.value;
    } else if (science.checked) {
        type = science.value;
    } else if (commerce.checked) {
        type = commerce.value;
    }

    let book = new Book(name, author, type);
    let display = new Display();

    if (display.validate(book)) {
        let libraryForm = localStorage.getItem("libraryForm");
        let f=false;
        if (libraryForm == null) {
            
            f=true;
        }
        display.add(book, f);
        display.clear();
        display.show("success");
    }else {
        display.show("error");
    }
}

//validate
Display.prototype.validate = function(book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}

//add methods to display prototype
Display.prototype.add = function(book, f) {
    if(f){
        array = [];
        array.push(book);
        localStorage.setItem("libraryForm",JSON.stringify(array));
    }
    else{
        let libraryForm = localStorage.getItem("libraryForm");
        array = JSON.parse(libraryForm);
        array.push(book);
        localStorage.setItem("libraryForm",JSON.stringify(array));
    }
    showList();
}

//clear
Display.prototype.clear = function() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//show error
Display.prototype.show = function(type) {
    let alertBox = document.getElementById("msg");
    let alert;
    if (type === "success") {
        alert = `<div class="alert alert-success d-flex align-items-center" role="alert">
                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                        <div>
                        book added to the list
                    </div>
                </div>`
        alertBox.innerHTML += alert;
    } else if (type === "error") {
        alert = `<div class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                    invalid book or author
                </div>
            </div>`
        alertBox.innerHTML += alert;
    }
    setTimeout(function() {
        alertBox.innerHTML = "";
    }, 2000);
}

//showList
function showList () {
    let libraryForm = localStorage.getItem("libraryForm");
    if(libraryForm){
        array = JSON.parse(libraryForm);
        DisplayList(array);
    }
};

//display list
function DisplayList(array){
    let html = "";
    let i = 1;
    array.forEach(function(libraryForm) {

    html += `<tr>
        <td>${i++}</td>
                            <td class="bookName" style="word-break: break-word;">${libraryForm.name}</td>    
                            <td class="authorName" style="word-break: break-word;">${libraryForm.author}</td>
                            <td class="type" style="word-break: break-word;">${libraryForm.type}</td>
                            </tr>`;
    });
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = html;
}

  //search by button
function changeSearchButton(value){
    let searching = document.getElementById("dropdownMenuButton1");
    searching.innerHTML = `Search by ${value}`;
}

function nameVar(value){
    return document.getElementById(`search${value}`)
}

function searchButton(value){
    nameVar(value).addEventListener("click",function(e){
        e.preventDefault();
        changeSearchButton(value)
        return value;
    })
}

searchButton("Author")
searchButton("Type")
searchButton("Name")

// search bar 
let search = document.getElementById("search");
search.addEventListener("input",function(){
    let input = search.value.toLowerCase();
    if(document.getElementById("dropdownMenuButton1").innerHTML === "Search by"){
        let alertBox = document.getElementById("msg");
        let alert;
        alert = `<div class="alert alert-danger d-flex align-items-center" role="alert">
                      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                            <div>
                            Select search by
                        </div>
                    </div>`
            alertBox.innerHTML = alert;
            setTimeout(function() {
                alertBox.innerHTML = "";
            }, 2000);
    }
    else{
        searchIn = document.getElementById("dropdownMenuButton1").innerHTML.slice(10).toLowerCase();
        console.log(searchIn);
    }
    let newArray;
    if(searchIn === "name"){
        newArray= array.filter(function(element){
            return element.name.includes(input);
        })
    }else if(searchIn === "author"){
        newArray= array.filter(function(element){
            return element.author.includes(input);
        })
    }else if(searchIn === "type"){
        newArray= array.filter(function(element){
            return element.type.includes(input);
        })
    }
    DisplayList(newArray);
});

