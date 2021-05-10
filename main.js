// Last searched items
let items =["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

// Adding searched items to HTML
function addItems() {
    
    items.forEach(item => {
        var tag = document.createElement("button");
        tag.innerHTML = item;
        tag.value=item;
        document.getElementById("search-history").appendChild(tag).classList.add("btn", "btn-history");
    })
}

function startSearch() {
    var param;
    
    // Checking which button is clicked 

    // Clicked from search history
    if(this.classList.contains("btn-history")){
        param = {
            q: this.value,
            api_key: 'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
            limit: 20
        };

        // Call function to send request
        getGifs(param);
    }

    // Clicked from search
    if(this.classList.contains("btn-submit")){
        var input = document.getElementById("userInput").value;
        param = {
            q: input,
            api_key: 'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
            limit: 20
        };  
        
        // Call function to send request
        getGifs(param);
    }
    
    // Clicked from trends
     if(this.classList.contains("btn-trend")){
        param = {
            api_key: 'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
            limit: 20
        };
        
        // Call function to send request
        getTrends(param);
    }
}

async function getGifs(param){
    const response = await fetch("https://api.giphy.com/v1/gifs/search?" + new URLSearchParams(param));
    const gifs = await response.json();

    display(gifs);
}

async function getTrends(param) {
    const response = await fetch("https://api.giphy.com/v1/gifs/trending?" + new URLSearchParams(param));
    const gifs = await response.json();
    display(gifs);
}

function display(gifs){
    document.getElementById("result-gifs").innerHTML = '';
    console.log(gifs);
}

function main() {
    addItems();
    document.querySelectorAll(".btn").forEach( button => {
        button.addEventListener('click', startSearch)
    })

}

window.addEventListener('load',main);
