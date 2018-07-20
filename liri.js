require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

var args = process.argv;
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var title = (process.argv[3] === undefined) ? "Mr. Nobody" : process.argv[3];
var command = args[2];

console.log(args.join(","));
// console.log(spotify);
// console.log(client);

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&type=movie&r=json&apikey=a5f801e8";
console.log(queryUrl);

request(queryUrl, function(err, response, body) {
    // If the request is unsuccessful
    if (err) {
        return console.log(err);
    }

    // debugger;

    // If the request is successful
    if (!err && response.statusCode === 200) {
        var movie = JSON.parse(body);

        console.log("Title: " + movie.Title);
        console.log("Release date: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);     //"Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},
                                                                                        // {"Source":"Rotten Tomatoes","Value":"54%"},
                                                                                        // {"Source":"Metacritic","Value":"50/100"}],
        console.log("Production Country: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);

    }
});
    
fs.readFile("random.txt","utf8", function(err, data) {
    if (err) { return console.log(err); }

    var output = data.split(",");

    for (var i=0; i < output.length; i++) {
        console.log(output[i]);
    }
});

/////////////////////////////////
// Functions
/////////////////////////////////
function logOutput (msg) {
    // Add to file and if the file didn't exist then it gets created on the fly.
    fs.appendFile("log.txt", msg, function(err) {
        if (err) { console.log(err); }
        else { console.log("Content Added!"); }
    });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var askQuestion = inquirer.prompt([
//     {
//         type: list,
//         name: "command",
//         message: "Select a command:",
//         choices: [
//             'my-tweets',
//             'spotify-this-song',
//             'movie-this',
//             'do-what-it-says',
//             'end-game'
//         ]
//     }
//     ]).then(function(answers) {

//         console.log(JSON.stringify(answers, null, '  '));

//         switch (answers.command) {
//             case 'my-tweets':
//                 console.log("in my-tweets");

//                 break;
//             case 'spotify-this-song':
//                 console.log("spotify-this-song");

//                 break;
//             case 'movie-this':
//                 console.log("movie-this");

//                 break;
//             case 'do-what-it-says':
//                 console.log("do-what-it-says");

//                 break;
//             case 'end-game':
//                 console.log("end-game");

//                 return;
//             default:
//                 console.log("invalid answer";    
//         }

//         // run the askquestion function again to end the loop or ask the questions again
//         askQuestion();
//     });
