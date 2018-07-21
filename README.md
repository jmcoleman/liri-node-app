# liri-node-app
LIRI - Language Interpretation and Recognition Interface

LIRI interprets commands from the command line or a file named random.text and performs api calls to allow searches to be taken for movies, songs and tweets.  Results are provided to the console and logged to a file in log.txt.

The supported commands include:
- my-tweets
- movie-this
- spotify-this-song

Example:
- spotify-this-song,"I Want it That Way"
- movie-this,"Top Gun"

When a movie name is not provided, the movie search is done for "Mr. Nobody" .
When a song name is not provided, the song search is done for "The Sign" by Ace of Base.

**Problem it solves:** \
When your searching for details about movies, songs and your tweet history, LIRI has the answer.  It allows select commands to be executed agains the Spotify, Twitter, and OMDB api's such that songs, movies and tweet activity can be found.\
**How solved:** \
By specifing commands via the command line or in a batch via a file, the user is able to query and return desired activity on movies, songs and tweets.\
**Technical approach:** \
Leverages node packages for Spotify, Twitter and OMDB to execute calls against the apis.  The results from the api are interrogated and formatted to be presented to the user on the console and then additionally stored in a log file.\

## Getting Started

This project uses the command line and file input to provide commands that allow the user to search for movies using the Open Movie Database, their last 20 twitter tweets from Twitter, and songs from Spotify.

### Prerequisites

:warning: You must have API keys to: Spotify and Twitter.

### Installing

To get a development environment up and running, clone the repository locally.  You will need to create a .env file in the root and populate it with your API keys.

Structure is as follows:
`
# Spotify API keys

SPOTIFY_ID=enter_value_here
SPOTIFY_SECRET=enter_value_here

# Twitter API keys

TWITTER_CONSUMER_KEY=enter_value_here
TWITTER_CONSUMER_SECRET=enter_value_here
TWITTER_ACCESS_TOKEN_KEY=enter_value_here
TWITTER_ACCESS_TOKEN_SECRET=enter_value_here
`
## Running tests

Testing was done against both valid and invalid input commands aas well as with and without parameters.
The random.txt file was loaded with each valid command and tested.

## Deployment

The is a command line project which cannot be hosted on github pages.  Running it from a command line such as GitBash.

## Built With

This project is a node command line application that uses the following npm packages: node-spotify-api, twitter, fs, moment, dotenv and request.

**Technologies**\
JavaScript, Node

**API's**\
Spotify, Open Movie Database, Twitter

## Contributing

N/A

## Versioning

This is version 1.0

## Authors

* **Jenni** - Ticketmaster and Spotify API, Lightbox, UI/UX elements and integration of components.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


