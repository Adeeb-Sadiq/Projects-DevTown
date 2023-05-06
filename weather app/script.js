// variables
const key = 'a08025cfd05864b937eb9480968ac082'

// selectors
const sbox = document.querySelector('#searchbox')
const sbutton = document.querySelector('#searchbutton')
const container  = document.querySelector('#container')


// functions
const geolocation = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`


const weather = async (lat,lon,place,state,country) => {
    const climate = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    const finalclimate = await climate.json()
    // console.log(finalclimate)
    // console.log(finalclimate.weather[0].description)
    // console.log(place) 
    // console.log(((finalclimate.main.temp)-273.15).toFixed(0)) 
    // console.log(((finalclimate.main.temp_min)-273.15).toFixed(0)) 
    // console.log(((finalclimate.main.temp_max)-273.15).toFixed(0)) 
    // console.log(finalclimate.weather[0].main)
    // console.log(finalclimate.weather[0].description)
    // console.log(((0.5144444*(finalclimate.wind.speed))*3.6).toFixed(1))
    // console.log(finalclimate.main.humidity)
    // console.log(finalclimate.visibility/1000)

    const temp = ((finalclimate.main.temp)-273.15).toFixed(0)
    const mintemp = ((finalclimate.main.temp_min)-273.15).toFixed(0)
    const maxtemp = ((finalclimate.main.temp_max)-273.15).toFixed(0)
    const weather = finalclimate.weather[0].main
    const weatherdes =  finalclimate.weather[0].description
    const windspeed = ((0.5144444*(finalclimate.wind.speed))*3.6).toFixed(1)
    const humidity = finalclimate.main.humidity
    const visibility = finalclimate.visibility/1000
    const div = document.createElement('div')
    div.innerHTML = generatecard(place,state,country,temp,mintemp,maxtemp,weather,weatherdes,windspeed,humidity,visibility)
    container.appendChild(div)
}

const generatecard = (place,state,country,temp,mintemp,maxtemp,weather,weatherdes,windspeed,humidity,visibility) =>
    `
    <div class="card bg-white w-96 flex flex-col items-center m-2 p-2">
            <div class="placename text-3xl">${place}</div>
            <div class="text-xl mt-1">${state} ${country}</div>
            <div class="temp mt-16 text-5xl">
                <span class="tempvalue">${temp}</span>
                C
            </div>
            <div class="minmax flex mt-4">
                <div class="mintemp mx-2">
                    Min:
                    <span class="min">${mintemp}</span>
                    C
                </div>
                <div class="maxtemp mx-2">
                    Max:
                    <span class="max">${maxtemp}</span>
                    C
                </div>
            </div>
            <div class="wheather mt-10">
                <div class="main flex justify-center text-3xl">${weather}</div>
                <div class="description text-xl">${weatherdes}</div>
            </div>
            <div class="details text-xl mt-10">
                <div class="wind">
                    Wind-Speed:
                    <span class="speed ml-32">${windspeed}</span>
                    kmph
                </div>
                <div class="humidity">
                    Humidity:
                    <span class="humid ml-52">${humidity}</span>
                </div>
                <div class="visibility">
                    Visibility:
                    <span class="visible ml-48">${visibility}</span>
                    km
                </div>
            </div>
        </div>
    `


const geoloc = async (city) =>{
    sbox.value = ''
    const loc = await fetch(geolocation(city))
    const finalloc = await loc.json()
    // console.log(finalloc)
    container.innerHTML = ''
    finalloc.forEach(element => {
        const lat = element.lat
        const lon = element.lon
        const name = element.name
        const state = element.state
        const country = element.country
        // console.log(name)
        weather(lat,lon,name,state,country)
        });
}


// main

sbutton.addEventListener('click', () => {
    // console.log(sbox.value)
    geoloc(sbox.value)
})

// geoloc('bangalore')

navigator.geolocation.getCurrentPosition(position => {
    // console.log(position)
    container.innerHTML = ''
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    weather(lat,lon,'current location','-','-')
})
