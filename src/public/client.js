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
        <main id='main'>
            ${Bar(state)}
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

const Bar = (state) => {
    let { rovers, apod } = state

    var parent = document.createElement('div');    
    
    //Creating Tab
    var tab = document.createElement('div');
    tab.classList.add("tab");

    parent.appendChild(tab);
    


    //Creating Tab Elements
    rovers.map((element, index) => {
        let button = document.createElement('button');
        tab.appendChild(button);
        button.classList.add("tablinks");
        button.textContent = element
        
        
        if (index === 0) button.setAttribute("id", "defaultOpen");

        /*button.addEventListener("click", openCity(event, element));*/

    })

    let contentTabs = rovers.map((element, index) => {
        let tabContent = document.createElement('div');
        tabContent.id = element;
        tabContent.classList.add("tabContent");
        let h3Content = document.createElement('h3');
        h3Content.textContent = element

        tabContent.appendChild(h3Content);

        parent.appendChild(tabContent);

        

    })

    




    //for (let i = 0; i <= shuffleDinosObjects.length - 1; i++) {

    //    // Generate Tiles for each Dino in Array
    //    let div = document.createElement('div');
    //    let h3 = document.createElement('h3');
    //    let p = document.createElement('p');
    //    let img = document.createElement('img');

    //    // Add tiles to DOM
    //    grid.appendChild(div);
    //    div.appendChild(h3);
    //    div.appendChild(img);
    //    div.appendChild(p);

    //    if (shuffleDinosObjects[i].getSpecies() !== "Human") {
    //        h3.textContent = shuffleDinosObjects[i].getSpecies()
    //        p.textContent = shuffleDinosObjects[i].getFact()
    //    }
    //    else {
    //        h3.textContent = shuffleDinosObjects[i].getName()
    //    }

    //    img.src = `./images/${shuffleDinosObjects[i].getImage()}`

    //    div.classList.add("grid-item");
    //}

//    return `
//        <div class="tab">
//            <button class="tablinks" onclick="openCity(event, 'Curiosity')" id="defaultOpen">London</button>
//            <button class="tablinks" onclick="openCity(event, 'Opportunity')">Opportunity</button>
//            <button class="tablinks" onclick="openCity(event, 'Spirit')">Spirit</button>
//        </div>

//        <div id="Curiosity" class="tabcontent">
//            <h3>Curiosity Rover</h3>
//             ${ImageOfTheDay(apod)}
//        </div>

//        <div id="Opportunity" class="tabcontent">
//            <h3>Opportunity</h3>
//        </div>

//        <div id="Spirit" class="tabcontent">
//            <h3>Spirit</h3>
//        </div>
//`

    return `${parent.outerHTML}`
}

const BarContent = (state) => {
    let { rovers, apod } = state
    //Creating Tab
    //var tabContent = document.createElement('div');
    //tabContent.classList.add("tabcontent");
    //tabContent.id = 'Curiosity';

    //let h3Content = document.createElement('h3');
    //h3Content.textContent="Curiosity"
    //tabContent.appendChild(h3Content);

    //let h3Content2 = document.createElement('h3');
    //h3Content2.textContent = "Opportunity"
    //tabContent.appendChild(h3Content2);

    var tabContent = ""


    //Creating Tabs' Content
    let contentTabs=rovers.map((element, index) => {
        let tabContent = document.createElement('div');
        let h3Content = document.createElement('h3');
        h3Content.textContent = "Curiosity"

        tabContent.appendChild(h3Content);
        return tabContent

        /* div.after(divNext);*/
        /*button.addEventListener("click", openCity(event, element));*/

    })

    console.log(contentTabs[0].outerHTML)
    console.log(contentTabs[1].outerHTML)
    console.log(contentTabs[2].outerHTML)

    //for (let i = 0; i <= shuffleDinosObjects.length - 1; i++) {

    //    // Generate Tiles for each Dino in Array
    //    let div = document.createElement('div');
    //    let h3 = document.createElement('h3');
    //    let p = document.createElement('p');
    //    let img = document.createElement('img');

    //    // Add tiles to DOM
    //    grid.appendChild(div);
    //    div.appendChild(h3);
    //    div.appendChild(img);
    //    div.appendChild(p);

    //    if (shuffleDinosObjects[i].getSpecies() !== "Human") {
    //        h3.textContent = shuffleDinosObjects[i].getSpecies()
    //        p.textContent = shuffleDinosObjects[i].getFact()
    //    }
    //    else {
    //        h3.textContent = shuffleDinosObjects[i].getName()
    //    }

    //    img.src = `./images/${shuffleDinosObjects[i].getImage()}`

    //    div.classList.add("grid-item");
    //}

    //    return `
    //        <div class="tab">
    //            <button class="tablinks" onclick="openCity(event, 'Curiosity')" id="defaultOpen">London</button>
    //            <button class="tablinks" onclick="openCity(event, 'Opportunity')">Opportunity</button>
    //            <button class="tablinks" onclick="openCity(event, 'Spirit')">Spirit</button>
    //        </div>

    //        <div id="Curiosity" class="tabcontent">
    //            <h3>Curiosity Rover</h3>
    //             ${ImageOfTheDay(apod)}
    //        </div>

    //        <div id="Opportunity" class="tabcontent">
    //            <h3>Opportunity</h3>
    //        </div>

    //        <div id="Spirit" class="tabcontent">
    //            <h3>Spirit</h3>
    //        </div>
    //`

    return `${contentTabs[0].outerHTML}`
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
            <img src="${apod.latest_photos[1].img_src}" height="240px" width="100%" />
        `)
    }
    else
    {
        return (`
           
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
