//////////////////////////
// npm require
//////////////////////////
require("dotenv").config();
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

///////////////////////////////
// constants and variables
///////////////////////////////
const COMMAND_LINE_ORIGIN = "command_line";
const FILE_ORIGIN = "file";
const DEFAULT_SONG = "The Sign";
const DEFAULT_ARTIST = "Ace of Base";

var cmdObj = {
    command: '',
    options: []
}

///////////////////////////////////
// check that a command is given
///////////////////////////////////

// load command and options if present
if (process.argv[2] === undefined) {
    console.log("Please provide a command.\nOptions are: 'my-tweets','spotify-this-song', 'movie-this', 'do-what-it-says'"); 
    return;
} else {
    cmdObj.command = process.argv[2];
    if (process.argv.length > 3) {
        cmdObj.options = process.argv.slice(3,process.argv.length + 1);
    }
    console.log("------------------------------");
    console.log("[COMMAND LINE arguments]");
    console.log("command: " + cmdObj.command);
    console.log("options: " + cmdObj.options);
}

// processCommand(cmdObj.command, cmdObj.options, COMMAND_LINE_ORIGIN);
processCommand(cmdObj);

/////////////////////////////////
// Functions
/////////////////////////////////
function processCommand(commandConfig) {

    // process the given command
    switch (commandConfig.command) {

        case 'my-tweets':
            // console.log("in my-tweets");

            // var client = new Twitter(keys.twitter);
            // console.log(client);

            var tweet = (commandConfig.options[0] === undefined) ? "" : commandConfig.options[0];

            // show last 20 tweets and when they were created


            ///////////////////////////
            // console log output
            ///////////////////////////
            console.log("------------------------------");
            console.log("***** TWEETS *****");
            
            ///////////////////////
            // log tweet output
            ///////////////////////
            var logData = "***** TWEETS *****" + "\n" ;
                // + "Artist(s): " + getArtists(item.artists) + "\n"
                // + "Song Name: " + item.name + "\n"
                // + "Preview Link: " + item.preview_url + "\n"
                // + "Album: " + item.album.name;
            logOutput(logData);

            // logOutput("***** TWEETS *****");
            // logOutput("Artist(s): " + getArtists(item.artists));
            // logOutput("Song Name: " + item.name);
            // logOutput("Preview Link: " + item.preview_url);
            // logOutput("Album: " + item.album.name);

            break;

        case 'spotify-this-song':
            // console.log("in spotify-this-song");

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
                ///////////////////////////
                // console log output
                ///////////////////////////

                // console.log("Track " + index + ": " + JSON.stringify(item));
                // console.log("-------------------------------------------------------------------------------\nTrack " + index + ": ");
                // console.dir(item);

                //show output for spotify
                console.log("------------------------------");
                console.log("***** SONG *****");
                console.log("Artist(s): " + getArtists(item.artists));
                console.log("Song Name: " + item.name);
                console.log("Preview Link: " + item.preview_url);
                console.log("Album: " + item.album.name);

                ///////////////////////
                // log song output
                ///////////////////////
                var logData = "***** SONG *****" + "\n" 
                    + "Artist(s): " + getArtists(item.artists) + "\n"
                    + "Song Name: " + item.name + "\n"
                    + "Preview Link: " + item.preview_url + "\n"
                    + "Album: " + item.album.name;
                logOutput(logData);

                // logOutput("***** SONG *****");
                // logOutput("Artist(s): " + getArtists(item.artists));
                // logOutput("Song Name: " + item.name);
                // logOutput("Preview Link: " + item.preview_url);
                // logOutput("Album: " + item.album.name);
            }

            ////////////////////////////////
            // search Spotify
            ////////////////////////////////
            var spotify = new Spotify(keys.spotify);
            // console.log(spotify);

            var title = (commandConfig.options[0] === undefined) ? "track:" + DEFAULT_SONG + ' artist:' + DEFAULT_ARTIST : "track:" + commandConfig.options[0];
            // console.log("TITLE: " + title);

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
            // console.log("in movie-this");

            /////////////////////////////////////
            // search for movies in OMDB api
            /////////////////////////////////////
            var title = (commandConfig.options[0] === undefined) ? "Mr. Nobody" : commandConfig.options[0];
            var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&type=movie&r=json&apikey=a5f801e8";
            // console.log(queryUrl);

            request(queryUrl, function(err, response, body) {
                // if the request is unsuccessful
                if (err) { return console.log(err); }
                // debugger;

                // If the request is successful
                if (!err && response.statusCode === 200) {
                    var movie = JSON.parse(body);

                    ///////////////////////////
                    // console log output
                    ///////////////////////////
                    console.log("------------------------------");
                    console.log("***** MOVIE *****");
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

                    ///////////////////////
                    // log movie output
                    ///////////////////////
                    var logData = "***** MOVIE *****" + "\n" 
                        + "Title: " + movie.Title + "\n"
                        + "Release Date: " + movie.Year + "\n"
                        + "IMDB Rating: " + movie.imdbRating + "\n"
                        + "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n"
                        + "Production Country: " + movie.Country + "\n"
                        + "Language: " + movie.Language + "\n"
                        + "Plot: " + movie.Plot + "\n"
                        + "Actors: " + movie.Actors;
                    logOutput(logData);

                    // logOutput("***** MOVIE *****");
                    // logOutput("Title: " + movie.Title);
                    // logOutput("Release Date: " + movie.Year);
                    // logOutput("IMDB Rating: " + movie.imdbRating);
                    // logOutput("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);     
                    // logOutput("Production Country: " + movie.Country);
                    // logOutput("Language: " + movie.Language);
                    // logOutput("Plot: " + movie.Plot);
                    // logOutput("Actors: " + movie.Actors);
                }
            });
            break;

        case 'do-what-it-says':
            // console.log("in do-what-it-says");

            // process the file   
            fs.readFile("random.txt","utf8", function(err, data) {
                if (err) { return console.log(err); }

                ///////////////////////////////////////////////
                // read command and option(s) from file
                ///////////////////////////////////////////////
                var output = data.split(",");
                var cmd = output[0];

                if (output[0] === undefined) {
                    console.log("File must contain a valid command.\nOptions are: 'my-tweets','spotify-this-song', 'movie-this', 'do-what-it-says'"); 
                    return;
                } else {
                    cmdObj.command = output[0];
                    if (output.length > 1) {
                        cmdObj.options = output.slice(1,output.length + 1);
                    }

                    ///////////////////////////
                    // console log output
                    ///////////////////////////
                    console.log("------------------------------");
                    console.log("***** DO WHAT IT SAYS *****");
                    console.log("Command: " + cmdObj.command);
                    console.log("Options: " + cmdObj.options);

                    ////////////////////////////////
                    // log read from file output
                    ////////////////////////////////
                    var logData = "***** DO WHAT IT SAYS *****" + "\n" 
                        + "Command: " + cmdObj.command + "\n"
                        + "Options: " + cmdObj.options;
                    logOutput(logData);

                    // logOutput("***** DO WHAT IT SAYS *****");
                    // logOutput("Command: " + cmdObj.command;
                    // logOutput("Options: " + cmdObj.options);
                }

                /////////////////////////////////////
                // do action read from file
                /////////////////////////////////////
                processCommand(cmdObj);
            });
            break;

        default:
            console.log("invalid answer");    
    }
}

function logOutput (msg) {
    // append each logged output on own line
    msg = "------------------------------\n" + msg + "\n";

    // Add to file and if the file didn't exist then it gets created on the fly.
    fs.appendFile("log.txt", msg, 'utf8', function(err) {
        if (err) { console.log(err); }
        else { 
            console.log("Logged data!"); 
        }
    });
};
