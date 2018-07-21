require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
const COMMAND_LINE_ORIGIN = "command_line";
const FILE_ORIGIN = "file";
const DEFAULT_SONG = "The Sign";
const DEFAULT_ARTIST = "Ace of Base";

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

processCommand(command, process.argv, COMMAND_LINE_ORIGIN);

/////////////////////////////////
// Functions
/////////////////////////////////
function processCommand(command, arguments, origin) {

    // process the given command
    switch (command) {

        case 'my-tweets':
            console.log("in my-tweets");
            var tweet = '';

            var client = new Twitter(keys.twitter);
            console.log(client);

            // when in file will be in index 1 but when in command line will be in position 3
            if (origin === FILE_ORIGIN) {
                // console.log("Argument1: " + arguments[1]);
                tweet = arguments[1];
            } else if (origin === COMMAND_LINE_ORIGIN) {
                // console.log("Argument3: " + arguments[3]);
                tweet = arguments[3];
            }

            // show last 20 tweets and when they were created


            
            break;

        case 'spotify-this-song':
            console.log("spotify-this-song");
            var song_title = '';

            var spotify = new Spotify(keys.spotify);
            // console.log(spotify);

            ///////////////////////////////////
            // functions
            ///////////////////////////////////
            function getArtists(artist) {
                var artistList = '';
                for (var i = 0; i < artist.length; i++) {
                    if (i !== 0) {
                        artistList = artistList + ", ";
                    }
                    artistList = artistList + artist[i].name;
                }
                return artistList;
            }

            function getTrack(item,index) {
                // console.log("Track " + index + ": " + JSON.stringify(item));
                // console.log("-------------------------------------------------------------------------------\nTrack " + index + ": ");
                // console.dir(item);

                //show output for spotify
                console.log("Artist(s): " + getArtists(item.artists));
                console.log("Song Name: " + item.name);
                console.log("Preview Link: " + item.preview_url);
                console.log("Album: " + item.album.name);
            }

            // when in file will be in index 1 but when in command line will be in position 3
            if (origin === FILE_ORIGIN) {
                // console.log("Argument1: " + arguments[1]);
                song_title = arguments[1];
            } else if (origin === COMMAND_LINE_ORIGIN) {
                // console.log("Argument3: " + arguments[3]);
                song_title = arguments[3];
            }

            var title = (song_title === undefined) ? "track:" + DEFAULT_SONG + ' artist:' + DEFAULT_ARTIST : "track:" + song_title;
            console.log("TITLE: " + title);

            spotify
                .search({type: 'track', query: title, limit: 1})
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
            var movie_title = '';

            // when in file will be in index 1 but when in command line will be in position 3
            if (origin === FILE_ORIGIN) {
                // console.log(arguments[1]);
                movie_title = arguments[1];
            } else if (origin === COMMAND_LINE_ORIGIN) {
                // console.log(arguments[3]);
                movie_title = arguments[3];
            }
            
            var title = (movie_title === undefined) ? "Mr. Nobody" : movie_title;
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
                    console.log("Release Date: " + movie.Year);
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

                processCommand(cmd,output,FILE_ORIGIN);
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
