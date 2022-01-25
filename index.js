const APP_ID = "80633b55";
const API_KEY = "43b0ca757ed3a995c4e1e7e237192e39"

async function sendRequest(api){
    fetch(api)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => useAPIData(data.hits))
}

function useAPIData(data){
    const list = document.querySelector('#ingredients')
    const list2 = document.querySelector('#ingredients2')

    document.querySelector("#url").setAttribute("href", data[0].recipe.url);
    document.querySelector("#foodLabel").textContent = data[0].recipe.label
    document.querySelector("#foodLabel2").textContent = data[1].recipe.label
    document.querySelector(".results").style.visibility = "visible"
    document.querySelector("#picture").src = data[0].recipe.image;
    document.querySelector("#picture2").src = data[1].recipe.image;

    const labelArray = data[0].recipe.label.split(" ")
    for(let i = 0; i<labelArray.length; i++){
        console.log(labelArray[i])
    }
    list.innerHTML = '';
    list2.innerHTML = '';
    for(let i = 0; i<data[0].recipe.ingredients.length; i++){
        let li = document.createElement("li")
        li.textContent = data[0].recipe.ingredients[i].text
        list.appendChild(li)
    }

    for(let i = 0; i<data[1].recipe.ingredients.length; i++){
        let li = document.createElement("li")
        li.textContent = data[1].recipe.ingredients[i].text
        list2.appendChild(li)
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