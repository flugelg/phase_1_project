const APP_KEY = ''

const init = () => {
    const inputForm = document.querySelector('form');

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('#searchFood').value;
        let vegan = document.querySelector("#vegan");
        let api;

        if(vegan.checked === true){
            api = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=80633b55&app_key=${APP_KEY}&health=vegan&random=true`
            console.log("vegan")
        }
        else{
            api = `https://api.edamam.com/api/recipes/v2?type=public&q="${input}"&app_id=80633b55&app_key=${APP_KEY}&random=true`
            console.log("not Vegan")
        }

        fetch(api)
        .then(response => response.json())
        .then(data => useAPIData(data.hits))
    });

    favorited();
}

function useAPIData(data) {
    let ingredientsLeft = document.querySelector('#ingredientsLeft');
    let ingredientsArray = data[0].recipe.ingredients;
    let ingredientsArrayRight = data[1].recipe.ingredients;

    document.querySelector(".results").style.visibility = "visible"; //make results visible
    document.querySelector('#foodLabel1').textContent = data[0].recipe.label;
    document.querySelector("#pictureLeft").src = data[0].recipe.image;
    document.querySelector('#foodLabel2').textContent = data[1].recipe.label;
    document.querySelector("#pictureRight").src = data[1].recipe.image;

    ingredientsLeft.innerHTML = ''; //clearing unordered list of ingredients
    ingredientsRight.innerHTML = '';
    ingredientsArray.forEach((ingr) =>{ //iterate array for left ingredients
        let li = document.createElement("li");
        li.textContent = ingr.text;
        ingredientsLeft.appendChild(li);
    })

    ingredientsArrayRight.forEach((ingr) =>{ //iterate array for right ingredients
        let li = document.createElement("li");
        li.textContent = ingr.text;
        ingredientsRight.appendChild(li);
    })
    console.log(data)
}

function favorited(){
    document.querySelector('#favorite').addEventListener('click', function(){
        console.log(document.querySelector('#foodLabel1').textContent);
        let favorited1 = [document.querySelector('#foodLabel1').textContent];
        favoriteFoods(favorited1);
    })
    document.querySelector('#favorite2').addEventListener('click', function(){
        console.log(document.querySelector('#foodLabel2').textContent);
        let favorited2 = [document.querySelector('#foodLabel2').textContent];
        favoriteFoods(favorited2);
    })
}

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

document.addEventListener("DOMContentLoaded", init)