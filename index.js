const APP_ID = "80633b55";
const API_KEY = "43b0ca757ed3a995c4e1e7e237192e39"

async function sendRequest(api){
    fetch(api)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => useAPIData(data))
}

function useAPIData(data){
    const list = document.querySelector('#ingredients')

    document.querySelector("#url").setAttribute("href", data.hits[0].recipe.url);
    document.querySelector("#foodLabel").textContent = data.hits[0].recipe.label
    document.querySelector(".results").style.visibility = "visible"
    document.querySelector("img").src = data.hits[0].recipe.image;

    const labelArray = data.hits[0].recipe.label.split(" ")
    for(let i = 0; i<labelArray.length; i++){
        console.log(labelArray[i])
    }
    list.innerHTML = '';
    for(let i = 0; i<data.hits[0].recipe.ingredients.length; i++){
        let li = document.createElement("li")
        li.textContent = data.hits[0].recipe.ingredients[i].text
        list.appendChild(li)
    }

    console.log(data)

}

document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#food")
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
         event.preventDefault();
         document.querySelector("#search").click();
        }
    });
    document.querySelector("#search").addEventListener('click', function(e){
        e.preventDefault();
        let stuff = document.querySelector("#food").value
        let api = `https://api.edamam.com/api/recipes/v2?type=public&q="${stuff}"&app_id=80633b55&app_key=43b0ca757ed3a995c4e1e7e237192e39&random=true`
        console.log(stuff)
        console.log(api)
        sendRequest(api);
    })
  });