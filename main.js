// Last searched items
let items =["Internet Cats", "Meme's", "Typing", "Space", "Rick and Morty"];

// Adding searched items to HTML
function addItems() {
    
    items.forEach(item => {
        var tag = document.createElement("button");
        tag.innerHTML = item;
        document.getElementById("search-history").appendChild(tag);
    })
}

// API call
// class DataService {
//     static async getGif(item) {
//         try{
//             const response = fetch("https://api.giphy.com/v1/gifs/search?" + new URLSearchParams({
//                 api_key:'LZUsjE9N2zpPI5QnY6gIBJEFpZ2opbUa',
//                 q: item
//             }));
//             return response;
//         } catch {
//             return [];
//         }
//     }
// }

function startSearch() {
    console.log("here");
}


function main() {
    addItems();
    document.getElementsByClassName("btn").addEventListener('click',startSearch());
}

window.addEventListener('load',main);