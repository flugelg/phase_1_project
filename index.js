APP_KEY = ""

async function sendRequest(api){
    fetch(api)
        .then(response => response.json())
        .then(data => useAPIData(data.hits))
}

function useAPIData(data){
    let list = document.querySelector('#ingredients')
    let list2 = document.querySelector('#ingredients2')
    let labelLeft = document.querySelector("#foodLabel")
    let labelRight = document.querySelector("#foodLabel2")
    let imgLeft = document.querySelector("#picture")
    let imgRight = document.querySelector("#picture2")
    let favorite = document.querySelector("#addToFavorites")
    let favorite2 = document.querySelector("#addToFavorites2")

    document.querySelector(".results").style.visibility = "visible" //making results visible

    labelLeft.textContent = data[0].recipe.label //setting variables to data
    labelRight.textContent = data[1].recipe.label
    imgLeft.src = data[0].recipe.image;
    imgRight.src = data[1].recipe.image;
    list.innerHTML = ''; //Emptying ingredient lists
    list2.innerHTML = '';

    for(let i = 0; i<data[0].recipe.ingredients.length; i++){ //adding ingredients for recipe 1
        let li = document.createElement("li")
        li.textContent = data[0].recipe.ingredients[i].text
        list.appendChild(li)
    }

    for(let i = 0; i<data[1].recipe.ingredients.length; i++){ //adding ingredients for recipe 2
        let li = document.createElement("li")
        li.textContent = data[1].recipe.ingredients[i].text
        list2.appendChild(li)
    }

    favorite.addEventListener('click', function(){ //sending favorited food
        let favoritedFood1 = data[0].recipe;
        console.log("F1")
        //favoriteFoods(favoritedFood1);
    })
    favorite2.addEventListener('click', function(){
        let favoritedFood2 = data[1].recipe;
        favoriteFoods(favoritedFood2);
    })

    console.log(data) //show recipes in console
    
}

document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#food")
    input.addEventListener("keyup", function(event) { //So you can use enter instead of clicking search
        if (event.keyCode === 13) {
         event.preventDefault();
         document.querySelector("#search").click();
        }
    });
    document.querySelector("#search").addEventListener('click', function(){
        let foodSelection = document.querySelector("#food").value;
        let vegan = document.querySelector("#vegan");
        if(vegan.checked === true){
            let apiVegan = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodSelection}&app_id=80633b55&app_key=${APP_KEY}&health=vegan&random=true`
            sendRequest(apiVegan);
            console.log("vegan")
        }
        else{
            let api = `https://api.edamam.com/api/recipes/v2?type=public&q="${foodSelection}"&app_id=80633b55&app_key=${APP_KEY}&random=true`
            sendRequest(api);
            console.log("not Vegan")
        }
    })
  });

//saving favorites to json server
/*
function favoriteFoods(favorited){
    fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(favorited)
    })
    .then(res =>res.json())
    .then(food => console.log(food))
}
*/

function favoriteFoods(favorited){
    console.log(favorited)
}
