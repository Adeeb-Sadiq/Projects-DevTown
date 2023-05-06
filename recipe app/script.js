// variables

const app_id = '6f7ca9d9'
const app_key = 'ff6aeccf1295b3e8245c4e2122df3dcf'

// selectors


const input = document.querySelector('#input')
const search = document.querySelector('#search')
const info = document.querySelector('#info')
const constainer = document.querySelector('#container')
const loader = document.querySelector('#loader')

// functions

const genrateEndpoint = (searchstring = '') => `https://api.edamam.com/api/recipes/v2?type=public&q=${searchstring}&app_id=${app_id}&app_key=${app_key}`

const showloader = () => {
    loader.style = 'display:flex'
}

const hideloader = () => {
    loader.style = 'display:none'
}

const getrecipe = async () => {
    try {
        showloader()
        const searchstring = input.value
        const response = await fetch(genrateEndpoint(searchstring))
        const data = await response.json()
        const recipes = data.hits
        constainer.innerHTML = ''
        recipes.forEach(obj => {
            const {recipe} = obj
            console.log(recipe)
            const div = document.createElement('div')
            div.innerHTML = card(recipe.image,recipe.label)
            constainer.appendChild(div)
        });
    } catch (error) {
        console.log(error)
    }
    finally {
        hideloader()
        input.value = ''
    }
}
//   pizza
const card = (image,label) => `  
<div class="w-72 bg-indigo-50 px-4 p-3 m-3">
            <div>
              <img src=${image} class="h-auto w-full" />
              <div class="p-5">
                <div class="bold text-xl">${label}</div>
                <p class="text-medium mb-5 text-gray-700">Well, aren't you going up to the lake tonight, you've been planning it for two weeks.</p>
                <button id="info" class="w-full rounded-md bg-yellow-300 text-xl py-2">Details</button>
              </div>
            </div>
          </div>`

// events

search.addEventListener('click',getrecipe)

// main 

constainer.innerHTML = ''