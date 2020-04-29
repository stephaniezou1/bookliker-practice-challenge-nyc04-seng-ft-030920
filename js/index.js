let bookList = document.getElementById("list")
let showPanel = document.getElementById("show-panel")

fetch(`http://localhost:3000/books`)
    .then(response => response.json())
    .then((booksArr) => {
        booksArr.forEach((singleBook) => {
            createHTMLForBook(singleBook)
        })
        addBookInfoToPage(booksArr[0])
    })

let createHTMLForBook = (book) => {

    let bookLi = document.createElement("li")

    bookLi.innerHTML = `<h2>${book.title}</h2>`

    bookList.append(bookLi)

    bookLi.addEventListener("click", (evt) => {
        addBookInfoToPage(book)
    })

    let likeButton = document.createElement("button")
    
    likeButton.innerText = "Like"

    bookLi.append(likeButton)

    likeButton.addEventListener("click", (evt) => {
        
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
            },
            body: JSON.stringify({
                "users": "pouros"
            }),
            })
                .then((response) => response.json())
                .then((updatedBook) => {
                    book.users = updatedBook.users
                    let userLi = document.createElement("li")
                    userLi.innerText = `${updatedBook.users.username} liked this`
                    userLi.id = "show-panel"
                    showPanel.append(userLi)
            })
        }) // evt listener
} // end of big function

let addBookInfoToPage = (book) => {
    // showPanel.innerHTML = `<h3> ${book.description} </h3>`
    showPanel.innerHTML = `<img src= ${book.img_url}></img> <br/> <div>${book.description}</div>`

    // rendering users here by iterating thru users
    book.users.forEach((singleUserHash) => {
        // console.log(book)
        let userLi = document.createElement("li")
        userLi.innerText = singleUserHash.username
            // userLi.id = "show-panel"
        showPanel.append(userLi)
    })
}

document.addEventListener("DOMContentLoaded", function() {});