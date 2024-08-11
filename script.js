const ApiKey="&apiKey=46e3c71ae88e46e19178c3817717b215";
const URL="https://newsapi.org/v2/everything?q="
window.addEventListener("load",()=>fetchNews("india"));

async function fetchNews(newstype){
    const responce=await fetch(URL+newstype+ApiKey);
    const data=await responce.json();
    MakingCard(data.articles)
}

function MakingCard(Atricles){
    const CardContainer=document.querySelector(".news-cards")
    const card=document.querySelector("#template")
    CardContainer.innerHTML="";
    Atricles.forEach(article=>{
        if(!article.urlToImage){
            return;
        }
        const clone=card.content.cloneNode(true);
        SetDataInCard(clone,article);
        CardContainer.append(clone)
    })
}

function SetDataInCard(card,data){
    const cd=card
    const Title=card.querySelector("#card-title");
    const img=card.querySelector(".news-img img");
    const desc=card.querySelector("#news-desc");
    const source=card.querySelector("#card-source");
    Title.innerText=data.title
    img.src=data.urlToImage;
    desc.innerHTML=data.description;
    const date=new Date(data.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    source.innerText=date;

   card.querySelector(".card").addEventListener("click",()=>{
    console.log("card clicked")
    window.open(data.url,"_blank")
   })
}
let selected;
document.querySelector("#ipl").addEventListener("click",()=>{
    fetchNews("ipl");
    if(selected){
        selected.classList.remove("clicked")
    }
    const element=document.querySelector("#ipl");
    element.classList.add("clicked")
    selected=element;
})
document.querySelector("#finance").addEventListener("click",()=>{
    fetchNews("finance");
    if(selected){
        selected.classList.remove("clicked")
    }
    const element=document.querySelector("#finance");
    element.classList.add("clicked")
    selected=element;

})
document.querySelector("#politics").addEventListener("click",()=>{
    fetchNews("politics");
    if(selected){
        selected.classList.remove("clicked")
    }
    const element=document.querySelector("#politics");
    element.classList.add("clicked")
    selected=element;

})
function clicked(){
    let searched=document.querySelector(".news-input").value
    fetchNews(searched);
}
document.querySelector(".search-btn").addEventListener("click",clicked)
   
