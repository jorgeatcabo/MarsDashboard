let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

//Make Bar Info Not Visible
var barInfo = false

var info = false
var roverData = []

function openTab(evt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(evt.currentTarget.myParam).style.display = "block";
    evt.currentTarget.className += " active";
    
}


const updateStore = (store, newState) => {
    store = Object.assign(store, newState)    
    render(root, store)
}

var dashboard = document.createElement('div');

const render = async (root, state) => {

    var { rovers, apod } = state

    const fetchingData = async () => {

        await state.rovers.reduce(async (previousPromise, url) => {
            await previousPromise
            const response = await fetch(`http://localhost:3000/${url}`)
            const data = await response.json();
            roverData.push(data)


            //Make Bar Info Visible
            barInfo = true

            return Promise.resolve()
        }, Promise.resolve())
    }

    await fetchingData()

    //Creating Tab
    var tab = document.createElement('div');
    tab.classList.add("tab");
    tab.id = "parent"

    //Adding Tab to Dashboard
    dashboard.appendChild(tab);

    //Creating Tabs
    rovers.map((element, index) => {
        let button = document.createElement('button');
        tab.appendChild(button);
        button.classList.add("tablinks");
        button.textContent = element


        if (index === 0) button.setAttribute("id", "defaultOpen");

    })

    const createTabsContent=(rovers) =>{

        let tabsContent = rovers.map((element) => {
            //Creating Room for Content 
            let tabContent = document.createElement('div');
            tabContent.id = element;
            tabContent.classList.add("tabcontent");

            let h3Content = document.createElement('h3');
            h3Content.textContent = element

            //Adding Content
            tabContent.appendChild(h3Content);

            return tabContent

        })

        return tabsContent
    }

    var tabsContent=""

    //Higher-Order Function for Adding Images to Tabs' Content
    const addImages = (createTabsContent, rovers) => {

        tabsContent = createTabsContent(rovers);

        rovers.map((element,index) => {

            //Creating img Element for Content 
            let imgContent = document.createElement('img');
            imgContent.src = roverData[index].latest_photos[0].img_src;
            imgContent.width = "850";
            imgContent.height = "200";

            tabsContent[index].appendChild(imgContent);

        })

    }

    const createExtraInfo = (rovers) => {

        let extraInfoTags = rovers.map((element) => {
            let div = document.createElement('div');
            div.id = element;

            return div

        })

        return extraInfoTags

    }

    var extraInfoTag = ""

    //Higher-Order Function for Adding Extra Info to Tabs' Content
    const addExtraInfo = (createExtraInfo, rovers) => {

        extraInfoTag = createExtraInfo(rovers);

        rovers.map((element, index) => {

            //Creating p Elements for Content 
            let pLaunch_date = document.createElement('p');
            pLaunch_date.textContent = `Launch Date: ${roverData[index].latest_photos[0].rover.launch_date}`;

            let pLanding_date = document.createElement('p');
            pLanding_date.textContent = `Landing Date: ${roverData[index].latest_photos[0].rover.landing_date}`;

            let pStatus = document.createElement('p');
            pStatus.textContent = `Status: ${roverData[index].latest_photos[0].rover.status}`;

            extraInfoTag[index].appendChild(pLaunch_date);
            extraInfoTag[index].appendChild(pLanding_date);
            extraInfoTag[index].appendChild(pStatus);

        })

        ////Add Extra Info to Tab's Content
        extraInfoTag.forEach((extraInfo,index) => tabsContent[index].appendChild(extraInfo));

         //Add Content to Each Bar's Tab
    tabsContent.forEach(tabContent => dashboard.appendChild(tabContent));
    }

    //Execute Higher-Order Function for Adding Images to Tabs' Content
    addImages(createTabsContent, rovers);

    addExtraInfo(createExtraInfo, rovers)

    root.innerHTML = App(state)

    var buttons = document.querySelectorAll('.tablinks');

    //Add click event for each tab's button
    for (var i = 0; i < buttons.length; i++) {
        let rover = rovers[i]
        buttons[i].addEventListener('click', openTab, false);
        buttons[i].myParam = rover;
    }   

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main id='main'>
            ${barInfo ? dashboard.innerHTML : `<h1>Loading Bar Section...</h1>` }
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

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod, rover) => {
    
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    /*console.log(photodate.getDate(), today.getDate());*/

    /*console.log(photodate.getDate() === today.getDate());*/
    if (!apod || apod.date === today.getDate()) {    
        getImageOfTheDay(store,rover)
    }

    /*<img src="${apod.latest_photos[1].img_src}" height="240px" width="100%" />*/
    if (apod) {
        /*console.log(`second apod ${apod.latest_photos[1].img_src}`)*/
        return apod.latest_photos[1].img_src;
    }
    else
    {
        return (`
           
        `)
    }
}



// ------------------------------------------------------  API CALLS

// Example API call
function getImageOfTheDay (state,rover) {
    let { apod } = state
    //fetch(`http://localhost:3000/${rover}`)
    //    .then(res => res.json())
    //    .then(apod => updateStore(store, { apod }))

    //const opportunityResponse=await fetch(`http://localhost:3000/opportunity`)
    //const opportunity = await opportunityResponse.json();

    //const curiosityResponse = await fetch(`http://localhost:3000/curiosity`)
    //const curiosity = await curiosityResponse.json();

    //const spiritResponse = await fetch(`http://localhost:3000/spirit`)
    //const spirit = await spiritResponse.json();

    //updateStore(store, { opportunity })
    //updateStore(store, { curiosity })
    //updateStore(store, { spirit })

    //var response = ""
    //var data =""
    //async function getData(state) {
    //    for (let rover of state.rovers) {

    //        response = await fetch(`http://localhost:3000/${rover}`)
    //        data = await response.json();
    //        console.log(rover)
    //        updateStore(store, { data })

    //    }
    //}

    //getData(state)

    

    const fetching = async () => {
        

        await store.rovers.reduce(async (previousPromise, url) => {
            await previousPromise
            const response = await fetch(`http://localhost:3000/${url}`)
            const data = await response.json();
            roversData.push(data)
            return Promise.resolve()
        }, Promise.resolve())

    }

    fetching()

    //state.rovers.forEach(async (rover) => {
    //    console.log(rover)
    //    let response = await fetch(`http://localhost:3000/${rover}`)
    //    let data = await response.json();
        
    //    updateStore(store, { data })
    //});

  



    /*return movies;*/

    //fetch(`http://localhost:3000/opportunity`)
    //    .then(res => res.json())
    //    .then(apod => updateStore(store, { apod }))    


    //fetch(`http://localhost:3000/curiosity`)
    //    .then(res => res.json())
    //    .then(apod => updateStore(store, { apod }))    

    //fetch(`http://localhost:3000/spirit`)
    //    .then(res => res.json())
    //    .then(apod => updateStore(store, { apod }))    

    
}



/*store.rovers.forEach(rover => getImageOfTheDay(store, rover));*/

//store.rovers.map((rover) => {
//    console.log(rover)
//    getImageOfTheDay(store,rover)
//})


//getImageOfTheDay(store, "opportunity")

/*getImageOfTheDay(store, "curiosity")*/


/*console.log(store.apod.latest_photos[1].img_src)*/

