require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// grab the arguments on the command line
var args = process.argv;
// console.log(keys);

// check that a command is given
if (process.argv[2] === undefined) {
    console.log("Please provide a command.  \nOptions are: 'my-tweets','spotify-this-song', 'movie-this', 'do-what-it-says'"); 
    return;
} else {
    var command = process.argv[2];
}

processCommand(command, process.argv);

/////////////////////////////////
// Functions
/////////////////////////////////
function processCommand(command, arguments) {
    // process the given command
    switch (command) {
        case 'my-tweets':
            console.log("in my-tweets");
            var client = new Twitter(keys.twitter);
            console.log(client);
            break;
        case 'spotify-this-song':
            console.log("spotify-this-song");
            var spotify = new Spotify(keys.spotify);
            // console.log(spotify);
            
            function getTrack(item, index) {
                // console.log("Track " + index + ": " + JSON.stringify(item));
                console.log("-------------------------------------------------------------------------------\nTrack " + index + ": ");
                console.dir(item);
            }

            console.log(arguments[1]);
            spotify
                .search({type: 'track', query: arguments[1], limit: 10})
                .then(function(data) {
                    // console.log(data); 
                    // console.log(data.tracks.items);
                    data.tracks.items.forEach(getTrack);
                })
                .catch(function(err) {
                    console.error('Error occurred: ' + err); 
                });
            break;
        case 'movie-this':
            console.log("movie-this");

            var title = (arguments[3] === undefined) ? "Mr. Nobody" : args[3];
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
            break;
        case 'do-what-it-says':
            console.log("do-what-it-says");

            // process the file   
            fs.readFile("random.txt","utf8", function(err, data) {
                if (err) { return console.log(err); }

                var output = data.split(",");

                var cmd = output[0];

                console.log("--------------------\nRead FILE:");
                for (var i=0; i < output.length; i++) {
                    console.log(output[i]);
                }
                console.log("--------------------");

                processCommand(cmd,output);
            });
            break;
        default:
            console.log("invalid answer");    
    }
}

function logOutput (msg) {
    // Add to file and if the file didn't exist then it gets created on the fly.
    fs.appendFile("log.txt", msg, function(err) {
        if (err) { console.log(err); }
        else { console.log("Content Added!"); }
    });
};
