require("dotenv").config();
var inquirer = require("inquirer");
var fs = require("fs");

var keys = require("./keys.js");

// import {keys} from 'keys.js';

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);
console.log(client);

var askQuestion = inquirer.prompt([
    {
        type: list,
        name: "command",
        message: "Select a command:",
        choices: [
            'my-tweets',
            'spotify-this-song',
            'movie-this',
            'do-what-it-says',
            'end-game'
        ]
    }
    ]).then(function(answers) {

        console.log(JSON.stringify(answers, null, '  '));

        switch (answers.command) {
            case 'my-tweets':
                console.log("in my-tweets");

                break;
            case 'spotify-this-song':
                console.log("spotify-this-song");

                break;
            case 'movie-this':
                console.log("movie-this");

                break;
            case 'do-what-it-says':
                console.log("do-what-it-says");

                break;
            case 'end-game':
                console.log("end-game");

                return;
            default:
                console.log("invalid answer";    
        }

        // run the askquestion function again to end the loop or ask the questions again
        askQuestion();
    });

fs.readFile("random.txt","utf8", function(err, data) {

    if (err) {
        return console.log(err);
    }

    var output = data.split(",");

    for (var i=0; i < output.length; i++) {
        console.log(output[i]);
    }

});

function logOutput (msg) {
    // Add to file and if the file didn't exist then it gets created on the fly.
    fs.appendFile("log.txt", msg, function(err) {

        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added!");
        }

    });

}