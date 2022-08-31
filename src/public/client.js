let store = Immutable.Map({
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverData: '',
}
)

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

const updateStore = (state, newState) => {
    store = state.merge(newState)
}

var dashboard = document.createElement('div');

const render = async (root, state) => {

// ------------------------------------------------------  API CALLS
    const fetchingData = async () => {

        await store.get('rovers').reduce(async (previousPromise, url) => {
            await previousPromise
            const response = await fetch(`http://localhost:3000/${url}`)
            const data = await response.json();
            roverData.push(data)

            updateStore(store, { roverData })
            
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
    store.get('rovers').map((element, index) => {
        let button = document.createElement('button');
        tab.appendChild(button);
        button.classList.add("tablinks");
        button.textContent = element

        if (index === 0) button.setAttribute("id", "defaultOpen");

    })

    //Pure function for creating tabs
    const createTabsContent = (rovers) =>{

        let tabs = rovers.map((element) => {
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

        return tabs
    }

    var tabsContent=""

    let rovers = store.get('rovers');

    //Higher-Order Function for Adding Images to Tabs' Content
    const addImages = (createTabsContent,rovers) => {

        tabsContent = createTabsContent(rovers);

        store.get('rovers').map((element,index) => {

            //Creating img Element for Content 
            let imgContent = document.createElement('img');
            imgContent.src = store.get('roverData')[index].latest_photos[0].img_src;
            imgContent.width = "850";
            imgContent.height = "200";

            tabsContent[index].appendChild(imgContent);

        })

    }

    const createExtraInfo = (rovers) => {

        let extraInfoTags = store.get('rovers').map((element) => {
            let div = document.createElement('div');
            div.id = element;
            div.classList.add("info");

            return div

        })

        return extraInfoTags

    }

    var extraInfoTag = ""

    //Higher-Order Function for Adding Extra Info to Tabs' Content
    const addExtraInfo = (createExtraInfo, rovers) => {

        extraInfoTag = createExtraInfo(rovers);

        store.get('rovers').map((element, index) => {

            //Creating p Elements for Content 
            let pLaunch_date = document.createElement('p');
            pLaunch_date.textContent = `Launch Date: ${store.get('roverData')[index].latest_photos[0].rover.launch_date}`;

            let pLanding_date = document.createElement('p');
            pLanding_date.textContent = `Landing Date: ${store.get('roverData')[index].latest_photos[0].rover.landing_date}`;

            let pStatus = document.createElement('p');
            pStatus.textContent = `Status: ${store.get('roverData')[index].latest_photos[0].rover.status}`;

            let pPhotoDate = document.createElement('p');
            pPhotoDate.textContent = `Photo Date: ${store.get('roverData')[index].latest_photos[0].earth_date}`;

            extraInfoTag[index].appendChild(pLaunch_date);
            extraInfoTag[index].appendChild(pLanding_date);
            extraInfoTag[index].appendChild(pStatus);
            extraInfoTag[index].appendChild(pPhotoDate);

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
        let rover = store.get('rovers')[i]
        buttons[i].addEventListener('click', openTab, false);
        buttons[i].myParam = rover;
    }   

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
}

// create content
const App = (state) => {

    return `
        <header></header>
        <main id='main'>
            ${Dashboard(barInfo)}
        </main>
        <footer></footer>
    `
}


window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information.
const Dashboard = (barInfo) => {
    if (barInfo) {
        return dashboard.innerHTML
    }

    return `
        <h1>Hello!</h1>
    `
}

