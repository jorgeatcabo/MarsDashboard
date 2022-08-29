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

    //Create Tabs Content With Pure Function
    //let tabsContent = rovers.map((element) => {
    //    //Creating Room for Content 
    //    let tabContent = document.createElement('div');
    //    tabContent.id = element;
    //    tabContent.classList.add("tabcontent");

    //    let h3Content = document.createElement('h3');
    //    h3Content.textContent = element

    //    //Creating img Element for Content 
    //    let imgContent = document.createElement('img');
    //    imgContent.id = `${element}Image`
       

    //    //Adding Content
    //    tabContent.appendChild(h3Content);
    //    tabContent.appendChild(imgContent);

    //    return tabContent
        

    //})

    ////Add Content to Each Bar's Tab
    //tabsContent.forEach(tabContent => dashboard.appendChild(tabContent));

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
            /*tabContent.appendChild(imgContent);*/

            return tabContent

        })

        return tabsContent
    }

    //Higher-Order Function for Adding Images to Tabs' Content
    const addImages = (createTabsContent, rovers) => {

        let tabsContent = createTabsContent(rovers);

        rovers.map((element,index) => {

            //Creating img Element for Content 
            let imgContent = document.createElement('img');
            imgContent.src = roverData[index].latest_photos[0].img_src

            console.log(roverData)

            tabsContent[index].appendChild(imgContent);


        })


        ////Add Tab's Content to Dashboard
        tabsContent.forEach(tabContent => dashboard.appendChild(tabContent));
    }

    //Execute Higher-Order Function for Adding Images to Tabs' Content
    addImages(createTabsContent, rovers);

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
            ${info ? Info(state) : `<h1>Loading Info Section...</h1>` }
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


//function bar(parent) {
//    console.log(parent)
//    return `${parent.outterHTML}`
//}


//function bar(state) {
//    /*return function () {*/
//    var roversData = []
//    var parentResult = 'nada';
//    console.log('first')
//    /*var parent = document.createElement('div');*/

//    const fetching = async () => {

//        await store.rovers.reduce(async (previousPromise, url) => {
//            await previousPromise
//            const response = await fetch(`http://localhost:3000/${url}`)
//            const data = await response.json();
//            roversData.push(data)

//            return Promise.resolve()
//        }, Promise.resolve())
//        console.log(roversData)
//    }

//    var createParent = new Promise(async function (resolve, reject) {
//        console.log('second')
//        await fetching()

//        let { rovers, apod } = state

//        /*var parent = document.createElement('div');*/

//        //Creating Tab
//        //var tab = document.createElement('div');
//        //tab.classList.add("tab");
//        //tab.id = "parent"

//        //parent.appendChild(tab);

//        ////Creating Tabs
//        //rovers.map((element, index) => {
//        //    let button = document.createElement('button');
//        //    tab.appendChild(button);
//        //    button.classList.add("tablinks");
//        //    button.textContent = element


//        //    if (index === 0) button.setAttribute("id", "defaultOpen");

//        //})

//        //Create Tabs Content
//        /*  rovers.map((element, index) => {*/
//        //let tabContent = document.createElement('div');
//        //tabContent.id = element;
//        //tabContent.classList.add("tabcontent");

//        //let h3Content = document.createElement('h3');
//        //h3Content.textContent = element

//        //let img = document.createElement('img');

//        //tabContent.appendChild(h3Content);
//        //tabContent.appendChild(img);

//        //parent.appendChild(tabContent);


//        resolve(parent);

//        /*     })*/



//    });

//    /*const parentResult = await createParent*/
//    const getParent = async () => {

//            /*parentResult = */await createParent
//        /* return parentResult*/



//    }

//    getParent()

//    /*return a*/



//    return `
//        <div class="tab">
//            <button class="tablinks" onclick="openTab(event, 'Curiosity')" id="defaultOpen">Curiosity</button>
//            <button class="tablinks" onclick="openTab(event, 'Opportunity')">Opportunity</button>
//            <button class="tablinks" onclick="openTab(event, 'Spirit')">Spirit</button>
//        </div>

//        <div id="Curiosity" class="tabcontent">
//            <h3>Curiosity Rover</h3>
//             <img>
//        </div>

//        <div id="Opportunity" class="tabcontent">
//            <h3>Opportunity</h3>
//        </div>

//        <div id="Spirit" class="tabcontent">
//            <h3>Spirit</h3>
//        </div>
//`



//}

//const buildingUI = (state) => {
//    var roversData = []
//    var parentResult = 'nada';
//    console.log('first')
//    var parent = document.createElement('div');



//        (async () => {
//            const fetching = async () => {


//                await store.rovers.reduce(async (previousPromise, url) => {
//                    await previousPromise
//                    const response = await fetch(`http://localhost:3000/${url}`)
//                    const data = await response.json();
//                    roversData.push(data)

//                    return Promise.resolve()
//                }, Promise.resolve())
//                console.log(roversData)
//            }



//            var createParent = new Promise(async function (resolve, reject) {
//                console.log('second')
//                await fetching()


//                let { rovers, apod } = state

//                /*var parent = document.createElement('div');*/

//                //Creating Tab
//                var tab = document.createElement('div');
//                tab.classList.add("tab");
//                tab.id = "parent"

//                parent.appendChild(tab);

//                //Creating Tabs
//                rovers.map((element, index) => {
//                    let button = document.createElement('button');
//                    tab.appendChild(button);
//                    button.classList.add("tablinks");
//                    button.textContent = element


//                    if (index === 0) button.setAttribute("id", "defaultOpen");

//                })

//                //Create Tabs Content
//                rovers.map((element, index) => {
//                    let tabContent = document.createElement('div');
//                    tabContent.id = element;
//                    tabContent.classList.add("tabcontent");

//                    let h3Content = document.createElement('h3');
//                    h3Content.textContent = element

//                    let img = document.createElement('img');

//                    tabContent.appendChild(h3Content);
//                    tabContent.appendChild(img);

//                    parent.appendChild(tabContent);

//                    /*console.log(roversData)*/

//                    resolve(parent);

//                })



//            });

//            /*const parentResult = await createParent*/
//            const getParent = async () => {
//                console.log(parentResult)
//                parentResult = await createParent
//                return parentResult



//            }

//            let a = await getParent()
//            return a



//        })()
//}

//const Bar = (func => {

//    return func(state);


//    //var roversData = []
//    //var parentResult = 'nada';
//    //console.log('first')
//    //var parent = document.createElement('div');

//    //if (parentResult == 'nada') {

//    //    (async () => {
//    //        const fetching = async () => {


//    //            await store.rovers.reduce(async (previousPromise, url) => {
//    //                await previousPromise
//    //                const response = await fetch(`http://localhost:3000/${url}`)
//    //                const data = await response.json();
//    //                roversData.push(data)

//    //                return Promise.resolve()
//    //            }, Promise.resolve())
//    //            console.log(roversData)
//    //        }



//    //        var createParent = new Promise(async function (resolve, reject) {
//    //            console.log('second')
//    //            await fetching()


//    //            let { rovers, apod } = state

//    //            /*var parent = document.createElement('div');*/

//    //            //Creating Tab
//    //            var tab = document.createElement('div');
//    //            tab.classList.add("tab");
//    //            tab.id = "parent"

//    //            parent.appendChild(tab);

//    //            //Creating Tabs
//    //            rovers.map((element, index) => {
//    //                let button = document.createElement('button');
//    //                tab.appendChild(button);
//    //                button.classList.add("tablinks");
//    //                button.textContent = element


//    //                if (index === 0) button.setAttribute("id", "defaultOpen");

//    //            })

//    //            //Create Tabs Content
//    //            rovers.map((element, index) => {
//    //                let tabContent = document.createElement('div');
//    //                tabContent.id = element;
//    //                tabContent.classList.add("tabcontent");

//    //                let h3Content = document.createElement('h3');
//    //                h3Content.textContent = element

//    //                let img = document.createElement('img');

//    //                tabContent.appendChild(h3Content);
//    //                tabContent.appendChild(img);

//    //                parent.appendChild(tabContent);

//    //                /*console.log(roversData)*/

//    //                resolve(parent);

//    //            })



//    //        });

//    //        /*const parentResult = await createParent*/
//    //        const getParent = async () => {
//    //            console.log(parentResult)
//    //            parentResult = await createParent
//    //            return parentResult



//    //        }

//    //        let a = await getParent()
//    //        console.log(a)



//    //    })()
//    //}
    
//    //return `${parentResult}`

    


    

    
//}





//const Bar = buildingUI(store);


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

