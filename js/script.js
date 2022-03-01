const searchResult = () => {
    const searchInput = document.getElementById('search-input').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data.data));
    document.getElementById('header').innerHTML = '';
    const main = document.getElementById("main");
    main.classList.add("search-div2");
    const secondSearch = document.getElementById('second-search');
    secondSearch.classList.remove("d-none");
    secondSearch.classList.add("search-div2");

}

const displayResult = (data) => {
    
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = '';
    for(const phone of data) {
        console.log(phone);
        const card = document.createElement('div');
        card.innerHTML = `
          <div class="col container mx-auto">
                <div class="card ">
                    <div onclick="displayDetails('${phone.slug}')" class="card-body  d-flex flex-column align-items-center justify-content-center border-0 ">
                        <img src="${phone.image}" class="card-img-top w-25" alt="...">
                        <h4 class="card-title mt-3 d-flex align-items-center ">${phone.phone_name}</h4>
                    </div>
                </div>
            </div>
        `
        cardGrid.appendChild(card);
    }
     if(data.length === 0){
        const noResultDiv = document.getElementById('no-result-div');
        noResultDiv.classList.add("no-result-div");
        document.getElementById('no-result').innerText = 'No result found';
    }
}

const secondSearchResult = () => {
    document.getElementById('no-result-div').classList.remove("no-result-div");
    document.getElementById('no-result').innerText = '';
    const searchInput = document.getElementById('second-search-input').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data.data));
    document.getElementById('header').innerHTML = '';
    const main = document.getElementById("main");
    main.classList.add("search-div2");
    
   
}

const displayDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetailResult(data.data));
}

const displayDetailResult = (data) => {
     const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = '';
    const main = document.getElementById('main');

    const card = document.createElement('div');
    card.setAttribute('id', 'card-detail'); 
    card.innerHTML = `
        <div class="col container mx-auto">
            <div class="card ">
                <div class="card-body  d-flex flex-column align-items-center justify-content-center border-0 ">
                    <img src="${data.image}" class="card-img-top w-25" alt="...">
                    <h4 class="card-title mt-3 d-flex align-items-center ">${data.name}</h4>
                    <p class="card-text">${data.mainFeatures.storage}</p>
                </div>
            </div>
                    `;
    main.appendChild(card);
}