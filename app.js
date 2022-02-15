// What are we doing in our app?

// Create an app object (to make use of namespacing)
const artApp = {};
// Save information which will  be used (API key) within properties on the app object
artApp.rijksApiUrl = 'https://www.rijksmuseum.nl/api/en/collection'
artApp.rijksApiKey = '3PhkUBOp';

// Create a method which will make a call to the API and get some Date back
    // THEN we weill take that data and put it ion the page
    // Dont want data floating in the global scope, it can be changed and can slow things down
artApp.getArt = () => {
    // use the URL constructor to format the API endpoint to which we will be making our request
    const rijksUrl = new URL(artApp.rijksApiUrl);
    // console.log(rijksUrl);

    // format our parameters to our URL
    rijksUrl.search = new URLSearchParams({
        // include the API parameters here:
        key: artApp.rijksApiKey,
        q: 'monkey',
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
    artArray.forEach( (artItem) => {
        // console.log(artItem);

        // extract the data from teh API (artist name, piece title, image URL, alt text) and save it within variables
        const artworkTitle = artItem.title;
        const artworkUrl = artItem.webImage.url;
        const artist = artItem.principalOrFirstMaker;
        const altText = artItem.longTitle;
        console.log(artworkTitle, artworkUrl, artist, altText);

        // create li element in which this information wil be added
    });
};

// create and initialization method which will kick start our app
artApp.init = () => {
    // console.log('App is initialized');
    // call the method which will get us our art data
    artApp.getArt();
};

// Call the initializatoin method (at the end of our code)
artApp.init();