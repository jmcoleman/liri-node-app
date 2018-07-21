# LIRI: liri-node-app
LIRI - Language Interpretation and Recognition Interface

LIRI interprets commands from the command line or a file named 'random.text' and performs api calls to allow searches to be done for movies, songs and tweets.  Results are provided to the console and logged to a file named 'log.txt'.  The commands allow the user to search for movies using the Open Movie Database, the users last 20 tweets from Twitter, and songs from Spotify.

The supported commands include:
- my-tweets
- movie-this
- spotify-this-song

Example as run from the command line:
- node liri.js spotify-this-song,"I Want it That Way"
- node liri.js movie-this,"Top Gun"

When a movie name is not provided, the movie search is done for "Mr. Nobody".\
When a song name is not provided, the song search is done for "The Sign" by Ace of Base.

**Problem it solves:** \
When searching for details about movies, songs and your tweet history, LIRI has the answer.  It allows select commands to be executed against the Spotify, Twitter, and OMDB API's such that songs, movies and tweet activity can be found.\
**How solved:** \
By specifing commands via the command line or in a batch via a file, the user is able to query and return activity and details on movies, songs and tweets.\
**Technical approach:** \
Leverages node packages for Spotify, Twitter and OMDB to execute calls against the APIs.  The results from the API are interrogated and formatted to be presented to the user on the console and then additionally stored in a log file.

## Getting Started

Clone the repository locally and create API keys to Spotify and Twitter.

### Prerequisites

:warning: You must have API keys to: Spotify and Twitter.

### Installing

To get a development environment up and running, clone the repository locally.  You will need node installed and npm.  You will need to create a .env file in the root and populate it with your API keys.  

Structure is as follows:
```
    # Spotify API keys

    SPOTIFY_ID=enter_value_here
    SPOTIFY_SECRET=enter_value_here

    # Twitter API keys

    TWITTER_CONSUMER_KEY=enter_value_here
    TWITTER_CONSUMER_SECRET=enter_value_here
    TWITTER_ACCESS_TOKEN_KEY=enter_value_here
    TWITTER_ACCESS_TOKEN_SECRET=enter_value_here
```
## Running tests

Testing was done against both valid and invalid input commands as well as without parameters.
The random.txt file was loaded with each valid command and tested.

## Deployment

The is a command line project which cannot be hosted on github pages.  Run it from a command line such as GitBash.

## Built With

The following npm packages are used: node-spotify-api, twitter, fs, moment, dotenv and request.

**Technologies**\
JavaScript, Node

**API's**\
Spotify, Open Movie Database, Twitter

## Contributing

N/A

## Versioning

This is version 1.0

## Authors

* **Jenni** - Twitter, OMDB and Spotify API's leverage with the command line and in batch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


