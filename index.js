

const autoComplateConfig = {
    renderOption : (movie) => {
        const imgSrc = movie.Poster === 'N/A'? '' : movie.Poster;
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
    `;
        },
      //option select
        inputValue(movie){
            return movie.Title;
        },
        async fetchData(searchTerm) {
            const response = await axios.get('https://www.omdbapi.com/', {
                params: {
                    apikey:'f2e5b1fc',
                    s: searchTerm
                }
            });
            if(response.data.Error){
                return [];
            };
            return response.data.Search;    
        }

};
creatAutoComplate({
    ...autoComplateConfig,
 root: document.querySelector('.left-autocomplate'),
 onOptionSelect(movie){
document.querySelector(".tutorial").classList.add('is-hidden')
onMovieSelect(movie, document.querySelector(".left-summary"), 'left');
}

});
creatAutoComplate({
 ...autoComplateConfig,
root: document.querySelector('.right-autocomplate'),
onOptionSelect(movie){
document.querySelector(".tutorial").classList.add('is-hidden')
onMovieSelect(movie, document.querySelector(".right-summary"), 'right');
}
});

let leftMovie;
let rightMovie;
const onMovieSelect = async  (movie, summaryElement, side) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey:'f2e5b1fc',
            i: movie.imdbID
        }
    });

    summaryElement.innerHTML = movieTemolate(response.data)
    if(side === 'left'){
        leftMovie = response.data;
    }else {
        rightMovie = response.data;
    }
    if(leftMovie && rightMovie){
        runComparison();
    }
};

const runComparison = () => {
    const letfSideStats = document.querySelectorAll('.left-summary .notification');
    const rightSideStats = document.querySelectorAll('.right-summary .notification');

     letfSideStats.forEach((leftState, index) => {
         const rightstate = rightSideStats[index];
         
         const leftSideValue = leftState.dataset.value;
         const rightSideValue = rightstate.dataset.value;


         if(rightSideValue > leftSideValue){
             leftState.classList.remove("is-primary")
             leftState.classList.add("is-warning")
         }else {
            rightstate.classList.remove("is-primary")
            rightstate.classList.add("is-warning")
         }
     })
};

const movieTemolate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVote = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    
    const awards = movieDetail.Awards.split(' ').reduce((prev , word) => {
        const value = parseInt(word);

        if(isNaN(value)){
            return prev;
        }else {
            return prev + value;
        }
    }, 0);
    


    return `
        <article class="media">
            <figure class="media-left">
                <p class="img">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
            
        </article>
        <article data-value =${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value =${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value =${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value =${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value =${imdbVote} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
}