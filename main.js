// Last searched items
let items =["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

// Adding searched items to HTML
function addItems() {
    document.getElementById("search-history").innerHTML='';
    items.forEach(item => {
        var tag = document.createElement("button");
        tag.innerHTML = item;
        tag.value=item;
        document.getElementById("search-history").appendChild(tag).classList.add("btn", "btn-history");
    })

    // Adding eventlisteners on updated history
    document.querySelectorAll(".btn").forEach( button => {
        button.addEventListener('click', startSearch)
    })
}

async function startSearch() {
    var param;
    var input = document.getElementById("userInput").value;
    
   
    // Checking which button is clicked 

    // Clicked from search history
    if(this.classList.contains("btn-history")){
        param = {
            q: this.value,
            api_key: 'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
            limit: 20
        };
        // Call function to send request
        await DataService.getGifs(param);        
    }

    // Clicked from search
    if(this.classList.contains("btn-submit") && input !== ''){
        document.getElementById("userInput").value='';
        param = {
            q: input,
            api_key: 'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
            limit: 20
        };  

        // Updating search history

        if(!items.includes(input)){
            items.push(input);
            items.shift();
            addItems();
        } 
        
        // Call function to send request
        await DataService.getGifs(param);
    }
    
    // Clicked from trends
     if(this.classList.contains("btn-trend")){
        param = {
            api_key: 'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
            limit: 20
        };
        
        // Call function to send request
        await DataService.getTrends(param);
    }
}

// Class to fetch data
class DataService {
    static async getGifs(param) {
        try {
            const response = await fetch("https://api.giphy.com/v1/gifs/search?" + new URLSearchParams(param));
            const gifs = await response.json();
            display(gifs.data);
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    static async getTrends(param) {
        try {
            const response = await fetch("https://api.giphy.com/v1/gifs/trending?" + new URLSearchParams(param));
            const gifs = await response.json();
            display(gifs.data);
        } catch (e) {
            console.log(e);
            return [];
        }
    }

}

function display(gifs){
    const gifRoot=document.querySelector('.result-gifs');
    const renderer = new GifRenderer(gifRoot);
    renderer.gifRenderer(gifs);
}


class GifRenderer {
    constructor (root) {
        this.root = root;
    }

    gifRenderer(gifs) {
        this.root.innerHTML='';
        if(gifs){
            for (let index = 0; index < gifs.length; index++) {
                this.root.innerHTML += this._gifToHTML(gifs[index]);            
            }
        }
    }

    _gifToHTML(gif){
        let gifhtml='';        
            gifhtml += `
                <div class="gif">
                <img src="${gif.images.downsized.url}" alt="">
                <h4>${gif.title}</h4>
                </div>
            `;
       
        return `${gifhtml}`;
    }

}


function main() {
    addItems();

    // Enabling submiting via enter key
    var input = document.getElementById("userInput");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submit").click();
        }
    });
}

window.addEventListener('load',main);
