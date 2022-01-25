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
    const labelLeft = document.querySelector("#foodLabel")
    const labelRight = document.querySelector("#foodLabel2")
    const imgLeft = document.querySelector("#picture")
    const imgRight = document.querySelector("#picture2")

    document.querySelector(".results").style.visibility = "visible"

    document.querySelector("#url").setAttribute("href", data[0].recipe.url);
    labelLeft.textContent = data[0].recipe.label
    labelRight.textContent = data[1].recipe.label
    imgLeft.src = data[0].recipe.image;
    imgRight.src = data[1].recipe.image;

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