async function admin () {

let response = await fetch ("http://localhost:3001/listBooks")
let books = await response.json()
console.log(books)
books.forEach(book => renderBooks(book))
}

let root = document.querySelector("#root")
let ul = document.createElement("ul") 
uk.style.listStyleType = "none"

function renderBooks(book){
    let li = document.createElement("li")
    li.textContent = book.title

    let numBooks = document.createElement("input")
    numBooks.setAttribute("type", "number")
    numBooks.value = book.quanity 

    let submitBtn = document.createElement("button")
    submitBtn.textContent = "Save"

    submitBtn.addEventListener("click", async function(){
        let response = await fetch("http://localhost:3001/updateBook", {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: book.id,
                quanity: numBooks.value 
            })
        })
        let updateBook = await response.json()
        console.log(updatedBook)
    })

    let delBtn = document.createElement("button")
    delBtn.textContent = "Delete"
    delBtn.addEventListener("click", async function(){
        let response = await fetch (`http://localhost:3001/removeBook/${book.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        let deletedBook = await response.json()
        console.log (deletedBook)
        ul.removeChild(li)
        //li.remove
        // inner.innerHTML = "" these 2 would also work in place of ul.removeChild()
    })

    li.append(numBooks, submitBtn, delBtn)
    ul.append(li)
}

function addBook(){
    let formContainer = document.createElement("div")
    let form = document.createElement("form")
    let header = document.createElement("h2").textContent = "Add Book"

    let titleInput = document.createElement("input")
    titleInput.placeholder = "Book Title"

    let descInput = document.createElement("input")
    descInput.placeholder = "Book Description"

    let imgInput = document.createElement("input")
    imgInput.placeholder = "URL"

    let submitBtn = document.createElement("input")
    submitBtn.setAttribute("type", "submit")
        
        submitBtn.addEventListener("click", async function(e){
            e.preventDefault()
            const year = new Date().getFullYear();

            let response = await fetch ("http://localhost:3001/addBook",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: titleInput.value,
                    description: descInput.value,
                    year: year,
                    quanity: 10,
                    imageurl: imgInput.value
                })
            })
            form.append(titleInput, descInput, imgInput, submitBtn)
            formContainer.append(header, form)
            root.append(formContainer)
        })
}
addBook()




root.append(ul)


admin() 