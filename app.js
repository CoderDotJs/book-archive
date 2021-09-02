const input = document.getElementById('input');

  //fetch data from the api

const getData = () =>{
    fetch(`http://openlibrary.org/search.json?q=${input.value}`)
    .then(res => res.json())
    .then(data => displayData(data))
}

//display data from the api to the dom

const displayData = (data) => {
    const booksDisplay= document.getElementById('books-display');
    const display = document.getElementById('display')
    const searchFound = document.getElementById('search-found');
      //error handalling

    if(data === null || data === undefined || data.numFound === 0){
      display.innerHTML = `<div>
      <h1 class="text-center my-5">No Searches Found!!!</h1>
      </div>`
    }else{
      display.innerHTML = ''
    }
    searchFound.innerHTML = `Total searches found: ${data.numFound}`;
    const newBook = document.createElement('div');
        newBook.classList.add('row', 'container', 'mx-auto', 'row-cols-1' ,'row-cols-md-3', 'g-4');

          //display every books search to the dom

      data.docs.slice(0,30).forEach( (book) => {
        const books = document.createElement('div');
        books.classList.add('col')
        books.innerHTML = `
        <div class="card shadow-lg">
        <img src="https://covers.openlibrary.org/b/oclc/${book?.oclc}-M.jpg" class="card-img-top d-block mx-auto" alt="${book.conver_i ? book.title : 'No image found'}">
        <div class="card-body">
          <h5 class="card-title">
          <span class="fw-bold">Title: </span> ${book.title ? book.title : 'No Title Found'}</h5>
          <p class="card-text">
          <span class="fw-bold">Auther: </span> ${book.author_name ? book.author_name : 'No Auther Found'}</p>
          <p class="card-text">
          <span class="fw-bold">Publisher: </span> ${book.publisher ? book.publisher : 'No Publisher Found'}</p>
          <p class="card-text">
          <span class="fw-bold">First Published: </span> ${book.first_publish_year ? book.first_publish_year : 'No First Published Year Found'}</p>
        </div>
      </div>`;
      newBook.appendChild(books);
      display.appendChild(newBook);
      
      input.value = ''
        console.log(book)
    });
}


//add event listener to the search button

document.getElementById('search').addEventListener('click', (e) =>{
    e.preventDefault();
    getData()
})