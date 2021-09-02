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

    //display total search found

    searchFound.innerHTML = `Total searches found: ${data.numFound}`;

    //append all the books data to this 

    const newBook = document.createElement('div');
        newBook.classList.add('row', 'container', 'mx-auto', 'row-cols-1' ,'row-cols-md-3', 'g-4');

          //display every books search to the dom

      data.docs.slice(0,30).forEach( (book) => {
        let img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        if(!book.cover_i){
          img = `https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png`
        }
        const books = document.createElement('div');
        books.classList.add('col')
        books.innerHTML = `
        <div class="card h-100 shadow-lg">
        <img src="${img}" class="card-img-top d-block mx-auto" alt="${book.conver_i ? book.title : 'No image found'}">
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
        console.log(data,book)
    });
}


//add event listener to the search button

document.getElementById('search').addEventListener('click', (e) =>{
    e.preventDefault();
    getData()
})