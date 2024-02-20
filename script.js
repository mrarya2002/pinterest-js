let startIndex = 0
let lastIndex = 30;
let imagesArray = []
let queryArray = []

const getdata = async ()=>{
    const data =await fetch("./benimages.json")
    const response = await data.json()
    imagesArray=[...response]
    let dataArray = imagesArray.slice(startIndex,lastIndex)
    displayImages(dataArray)
}

getdata()
const imageContainer = document.querySelector(".container")
const searchBar = document.querySelector("#searchinput")
const bgOverlay = document.querySelector(".overlay")
const suggestionBox = document.querySelector(".searchdata")

function displayImages(data){
    data.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("box","relative")
        card.innerHTML=`<img src="${element.img}" alt="${element.name}">
        <div class="absolute w-full h-full top-0 left-0">
            <div class="p-3 flex justify-end gap-x-4">
                <p class="w-6 h-6 text-green-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path></svg></p>
                <a href="/" download="${element.img}" title="${element.name}">
                    <p class="w-6 h-6 text-green-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 13V18.585L14.8284 16.7574L16.2426 18.1716L12 22.4142L7.75736 18.1716L9.17157 16.7574L11 18.585V13H13ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18 17C18 13.6863 15.3137 11 12 11C8.7616 11 6.12243 13.5656 6.00414 16.7751L6 17L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"></path></svg></p>
                </a>
            </div>
        </div>`
        imageContainer.appendChild(card)
    });
}

searchBar.addEventListener("focus",()=>{
    suggestionBox.classList.add("block")
    bgOverlay.classList.replace("hidden","block")
})
searchBar.addEventListener("blur",()=>{
    suggestionBox.classList.add("hidden")
    bgOverlay.classList.replace("block","hidden")
})
searchBar.addEventListener("input",(e)=>{
    let data = searchBar.value
    let queryData = imagesArray.filter((obj)=>obj.name.includes(data))
    let selectedData = queryData.slice(0,6)
    if(selectedData){
        suggestionBox.innerHTML=""
        suggestionBox.classList.remove("hidden","block")
        showSuggestion(selectedData)
    }else{
        suggestionBox.innerHTML=""
        suggestionBox.classList.replace("block","hidden")
    }
})

const searchBtn = document.querySelector(".search")
searchBtn.addEventListener("click",()=>{
    suggestionBox.classList.add("hidden")
    if(searchBar.value){
        let data = searchBar.value
        queryArray = imagesArray.filter((obj)=>obj.name.includes(data))
        console.log(queryArray.length)
        if(queryArray.length>0){
            imageContainer.innerHTML=""
            lastIndex=30
            startIndex=0
            displayImages(queryArray)
        }else{
            startIndex=0
            lastIndex=0
            queryArray=[]
            displayImages(imagesArray)
        }
    }else{
        startIndex=0;
        lastIndex=30
        displayImages(imagesArray)
    }
})

function showSuggestion(data){
    let culter = ""
    data.forEach((ele)=>{
        culter+=`<div class="res flex px-8 py-3">
        <i class="ri-search-line font-semibold mr-5"></i>
        <h3 class="font-semibold">${ele.name}</h3>
    </div>`
    })
    suggestionBox.innerHTML=culter;
}

window.addEventListener("scroll",()=>{
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(queryArray.length<=0){
        if(scrollTop+clientHeight>=scrollHeight-5 && imagesArray[lastIndex]!=undefined){
            startIndex+=30
            lastIndex+=30
            let data = imagesArray.slice(startIndex,lastIndex)
            displayImages(data)
        }
    }else{
        if(scrollTop+clientHeight>=scrollHeight-5 && queryArray[lastIndex]!=undefined){
            startIndex+=30
            lastIndex+=30
            let data = queryArray.slice(startIndex,lastIndex)
            displayImages(data)
        }
    }

})