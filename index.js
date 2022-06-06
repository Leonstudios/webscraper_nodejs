const axios = require('axios');
const server = require('./server.js');
const cheerio = require('cheerio');
const url = "https://www.imdb.com/search/title?title_type=feature&release_date=2019-01-01,2019-12-31&count=100&start=1";
const url2 = "https://google.com/robots.txt";
const app = server.app;
async function getMovies() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const movies = [];
        $('div.lister-item').each((index, element) => {
            const title = $(element).find('h3.lister-item-header a').text();
            const year = $(element).find('span.lister-item-year').text();
            const rating = $(element).find('div.ratings-bar span.rating-other-user-rating').text();
            const movie = {
                title,
                year,
                rating
            }
            movies.push(movie);
        });
        return movies;
    } catch (error) {
        console.log(error);
    }
}

getMovies().then(movies => {
    console.log(movies);
});

async function getText(url2) {
    try {
        const response = await axios.get(url2);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

getText(url2).then(text => {
    console.log(text);
});