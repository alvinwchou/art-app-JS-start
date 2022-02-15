// What are we doing in our app?

// Create an app object (to make use of namespacing)
const artApp = {};
// Save information which will  be used (API key) within properties on the app object
artApp.rijksApiUrl = 'https://www.rijksmuseum.nl/api/en/collection'
artApp.rijksApiKey = '3PhkUBOp';

// Create a method which will make a call to the API and get some Date back
    // THEN we weill take that data and put it ion the page
    // Dont want data floating in the global scope, it can be changed and can slow things down
artApp.getArt = (chosenAnimal) => {
    // use the URL constructor to format the API endpoint to which we will be making our request
    const rijksUrl = new URL(artApp.rijksApiUrl);
    // console.log(rijksUrl);

    // format our parameters to our URL
    rijksUrl.search = new URLSearchParams({
        // include the API parameters here:
        key: artApp.rijksApiKey,
        q: chosenAnimal,
        imgonly: 'true',
    });

    // now it is time to FETCH the data fro the beautiful API we have just constructed
    fetch(rijksUrl).then(apiResponse => apiResponse.json())
    .then(jsonResponse => {
        // console.log(jsonResponse.artObjects)
        // take the data returned fro th eAPI and passing it to the display method
        artApp.displayArt(jsonResponse.artObjects)
    });
};

// Creeate a method which will take the API data and display onour page
artApp.displayArt = (artArray) => {
    // clear the gallery of old art BEFORE adding new art to the page
    document.getElementById("artwork").innerHTML = "";
    artArray.forEach( (artItem) => {
        // console.log(artItem);

        // extract the data from teh API (artist name, piece title, image URL, alt text) and save it within variables
        const artworkTitle = artItem.title;
        const artworkUrl = artItem.webImage.url;
        const artist = artItem.principalOrFirstMaker;
        const altText = artItem.longTitle;
        // console.log(artworkTitle, artworkUrl, artist, altText);

        // create li element with a class of "piece" in which this information wil be added
        const listElement = document.createElement('li')
        listElement.classList.add('piece');
        // create an h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;
        // create an img to hold the artwork picture
        const image = document.createElement('img');
        image.src = artworkUrl;
        image.alt = altText;
        // create a p with a class of "artist" to hold the artist name
        const paragraphElement = document.createElement('p')
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        // take the elements we have created and add them to the li
        listElement.append(heading, image, paragraphElement);

        // add th eli to the ul (so that the data is finally in the DOM!!)
        document.getElementById("artwork").appendChild(listElement);
    });
};

// create a method which will update the heading of the page
artApp.updateAnimalHeading = (animal) => {
    document.querySelector('#page-title span').textContent = `${animal}s`;
};

// create a method which sets up all of the event listeners within this app
artApp.eventListenerSetUp = () => {
    // first event listener: on the select element (whenever the user selects a differnt option, take the chosen animal and get the art related to that animal)
    document.querySelector('#animalChoices').addEventListener('change', function() {
        // console.log("I have selected a new animal");

        // This will give us back the object which owns the currently executing code (AKA the select element node object!)
        console.log(this);

        // this will give us the value of the user's selected option
        // console.log(this.value);
        artApp.getArt(this.value);

        // update the title of the page to reflect the user's animal choice
        artApp.updateAnimalHeading(this.value);
        
    })
    
}
console.log(document.getElementById('animalChoices').value);

// create and initialization method which will kick start our app
artApp.init = () => {
    // console.log('App is initialized');
    
    // set up our event listeners (so they are ready to go as the user moves through the app)
    artApp.eventListenerSetUp();
    // call the method which will get us our art data
    artApp.getArt('bears');
};

// Call the initializatoin method (at the end of our code)
artApp.init();