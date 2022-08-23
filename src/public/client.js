let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

//// Get the element with id="defaultOpen" and click on it
//document.getElementById("defaultOpen").click();

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    console.log(store)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Bar(apod)}
            ${Greeting(store.user.name)}
   
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

const Bar = (apod) => {

    return `
        <div class="tab">
            <button class="tablinks" onclick="openCity(event, 'London')" id="defaultOpen">London</button>
            <button class="tablinks" onclick="openCity(event, 'Paris')">Paris</button>
            <button class="tablinks" onclick="openCity(event, 'Tokyo')">Tokyo</button>
        </div>

        <div id="London" class="tabcontent">
            <h3>London</h3>
             ${ImageOfTheDay(apod)}
        </div>

        <div id="Paris" class="tabcontent">
            <h3>Paris</h3>
            <p>Paris is the capital of France.</p>
        </div>

        <div id="Tokyo" class="tabcontent">
            <h3>Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
        </div>


`
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    /*console.log(photodate.getDate(), today.getDate());*/

    /*console.log(photodate.getDate() === today.getDate());*/
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    if (apod) {
        return (`
            <img src="${apod.latest_photos[1].img_src}" height="350px" width="100%" />
            <p>${apod.latest_photos[1].rover.name}</p>
        `)

    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/curiosity`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))    
}
