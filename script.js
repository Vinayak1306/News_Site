const API_KEY = "4d201197e1024fb3ac35ddae84cd9691";
const API_URl = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${API_URl}${query}&apiKey=${API_KEY}`);

    const data = await res.json();
    console.log(data);

    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage)
            return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSrc.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    })
}

let currSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);

    const navItems = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItems;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input');

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query)
        return;

    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;

})