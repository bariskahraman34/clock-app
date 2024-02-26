const blockquote = document.querySelector('.blockquote');
const changeBtn = document.querySelector('.change-btn');
const writer = document.querySelector('.writer');
const userLocationContent = document.querySelector('.location');
const timeContent = document.querySelector('.time');
const timezoneMessage = document.querySelector('.timezone-message');
const timezone = document.querySelector('.time-zone');
const moreBtn = document.querySelector('.more-btn');

changeBtn.addEventListener('click',getNewQuote);

moreBtn.addEventListener('click',showDeatils);

async function getNewQuote(){
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return renderQuote(data)
}

async function getUserLocation(){
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();
    return renderUserLocation(data);
}

async function renderQuote(quote){
    blockquote.textContent = `"${quote.content}"`;
    writer.textContent = quote.author;
}

async function renderUserLocation(userInfos){
    userLocationContent.textContent = 
    `
        IN ${userInfos.city.toLocaleUpperCase()}, 
        ${userInfos.countryCode.toLocaleUpperCase()}
    `;
}


timezone.innerHTML = `${new Date().toString().split(' ')[2]} ${new Date().toString().split(' ')[1]}`

function updateTime() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    hours = hours % 24;

    if(hours < 5 && hours > 12){
        timezoneMessage.innerHTML = "Good Morning".toLocaleUpperCase();
    }else if(hours < 12 && hours > 6){
        timezoneMessage.innerHTML = "Good Afternoon".toLocaleUpperCase();
    }else{
        timezoneMessage.innerHTML = "Good Evening".toLocaleUpperCase();
    }

    if(hours >= 5 && hours <= 17){
        document.querySelector('body').classList.add('morning');
        document.querySelector('.greeting-container img').src = "assets/img/sun-icon.svg";
    }else{
        document.querySelector('body').classList.add('evening');
        document.querySelector('.greeting-container img').src = "assets/img/moon-icon.svg";
    }

    timeContent.innerHTML = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
    setTimeout(updateTime,interval)
}

function showDeatils(){
    document.querySelector('.quotes-container').classList.toggle('d-none');

    if(moreBtn.firstChild.textContent === "MORE"){
        moreBtn.firstChild.textContent = "LESS";
    }else{
        moreBtn.firstChild.textContent = "MORE";
    }
}

updateTime();
getUserLocation();
getNewQuote();