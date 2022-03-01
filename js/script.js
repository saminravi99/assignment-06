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
    const main = document.getElementById('main');
    main.classList.remove("d-none");
    for(const phone of data) {
        console.log(phone);
        const card = document.createElement('div');
        card.innerHTML = `
          <div class="col container mx-auto">
                <div class="card ">
                    <div  class="card-body  d-flex flex-column align-items-center justify-content-center border-0 ">
                        <img src="${phone.image}" class="card-img-top w-25" alt="...">
                        <h4 class="card-title mt-3 d-flex align-items-center ">${phone.phone_name}</h4>
                        <p class="phone-brand">Brand : ${phone.brand}</p>
                        <button class="btn btn-primary" onclick="displayDetails('${phone.slug}')">Explore</button>
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
    document.getElementById('card-clear').innerHTML = '';
    document.getElementById('card-info').innerHTML = '';

}

const displayDetails = (slug) => {
    console.log(slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetailResult(data.data));
}

const displayDetailResult = (data) => {
     const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = '';
    const cardInfo = document.getElementById('card-info');
    cardInfo.classList.add("card-info");

    const card = document.createElement('div');
    card.classList.add("row");
    card.setAttribute('id', 'card-clear'); 


    card.innerHTML = `
             <div class="left col-lg-6 col-12 d-flex justify-content-center">
                <img src="${data.image}" alt="">
            </div>
            <div class="right col-lg-6 col-12  mt-lg-0 mt-4">
                <h1 id="phone-name">${data.name}</h1>
                <h5 id="release-date"></h5>
                
                <div class="mt-5">
                    <h4>Main Features: </h4>
                    <p class="mt-3">Storage : ${data.mainFeatures.storage}</p>
                    <p>Display : ${data.mainFeatures.displaySize}</p>
                    <p>Processor : ${data.mainFeatures.chipSet}</p>
                    <p>RAM : ${data.mainFeatures.memory}</p>  
                    <p>Sensors : ${data.mainFeatures.sensors.join(', ')}</p>                                       
                                                           
                </div>
                <div class="mt-5">
                    <h4 id="Others"></h4>
                    <p class="mt-3" id="WLAN"></p>
                    <p id="Bluetooth"></p>
                    <p id="GPS"></p>
                    <p id="NFC"></p>                    
                    <p id="Radio"></p>                    
                    <p id="USB"></p>                    
                </div>
            </div>
                    `;
           
    cardInfo.appendChild(card);
    const releaseDate = `${data.releaseDate}`;
    const other = `${data.others}`
    console.log(other); 
    if(releaseDate.length === 0) {
        document.getElementById('release-date').innerText = 'Release date not available';
    }else{
        document.getElementById('release-date').innerText = `Release date : ${data.releaseDate}`;
    }


    if(other === "undefined") {
        
        document.getElementById('Others').innerText = '';
        document.getElementById('WLAN').innerText = '';
        document.getElementById('Bluetooth').innerText = '';
        document.getElementById('GPS').innerText = '';
        document.getElementById('NFC').innerText = '';
        document.getElementById('Radio').innerText = '';
        document.getElementById('USB').innerText = '';
    }else{
        document.getElementById('Others').innerText = 'Others :';
        document.getElementById('WLAN').innerText = `WLAN : ${data.others.WLAN}`;
        document.getElementById('Bluetooth').innerText = `Bluetooth : ${data.others.Bluetooth}`;
        document.getElementById('GPS').innerText = `GPS : ${data.others.GPS}`;
        document.getElementById('NFC').innerText = `NFC : ${data.others.NFC}`;
        document.getElementById('Radio').innerText = `Radio : ${data.others.Radio}`;
        document.getElementById('USB').innerText = `USB : ${data.others.USB}`;
}
}