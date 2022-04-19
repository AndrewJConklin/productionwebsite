const url = 'https://api.tvmaze.com/shows/216/episodes'
const navigatedUrl = new URL(window.location)
const queryString = new URLSearchParams(navigatedUrl.search)
const currentSeason = queryString.get('season')

createSeasonHeader()
updateButtons()
hideButton()

fetchAndParse(url)
    .then(allEpisodeList => {
        allEpisodeList.filter(episode => {
            return episode.season === +currentSeason === true
        }).map(filteredEpisodeList => {
            return createEpisodeLi(filteredEpisodeList)
        }).forEach(episodeLi => appendLi(episodeLi))
        removeLoader()
    }).catch(redirect)

function createEpisodeLi(episode) {
    const episodeLi = document.createElement('li')
    episodeLi.classList.add("episode-listing")
    episodeLi.innerHTML = `
        <figure>
            <figcaption>
                <a href="episode.html?season=${currentSeason}&episode=${episode.number}">Episode ${episode.number} - ${episode.name}</a>
            </figcaption>
            <a href="episode.html?season=${currentSeason}&episode=${episode.number}">
                <img src="${episode.image.original}" alt="Still from ${episode.name}"></img>
            </a>
            ${episode.summary}
        </figure>`
    return episodeLi
}

function appendLi(episodeLi) {
    const $episodeList = document.querySelector('#episode-list')
    $episodeList.append(episodeLi)
}

function createSeasonHeader() {
    const header = document.querySelector('#season-header')
    header.textContent = `Season ${currentSeason}`
}

function updateButtons() {
    const next = document.querySelector('#next')
    const previous = document.querySelector('#previous')
    next.addEventListener('click', event => {
        event.preventDefault()
        location.href = `season.html?season=${(+currentSeason + 1)}`
    })

    previous.addEventListener('click', event => {
        event.preventDefault()
        location.href = `season.html?season=${(+currentSeason - 1)}`
    })
}

function hideButton() {
    const next = document.querySelector('#next')
    const previous = document.querySelector('#previous')
    if (+currentSeason === 5) {
        next.classList.add('hidden')
    }
    else if (+currentSeason === 1) {
        previous.classList.add('hidden')
    }
}

function removeLoader() {
    const loader = document.querySelector('.loader')
    loader.classList.add('remove')
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}

function redirect() {
    window.location.href = '404.html'
}


fetchAndParse(url)
    .then(allEpisodeList => {
        const seasonsListed = allEpisodeList.map(episode => episode.season)
        const uniqueSeasons = [...new Set(seasonsListed)]
        console.log(uniqueSeasons)
    })

function createDropdownOption(episode) {
    console.log(seasonOptGroup)

}



const form = document.querySelector('form')
// form.innerHTML = `
//     <label for="episode-selector">Episode Selector</label>
//     <select id="episode-selector" name="episode-selector">
//     <option value="select" disabled selected> Select an episode</option>
//         <optgroup label="Season 1"> 
//             <option value="1-1">Episode 1</option>
//             <option value="1-2">Episode 2</option>
//             <option value="1-3">Episode 3</option>
//             <option value="1-4">Episode 4</option>
//             <option value="1-5">Episode 5</option>
//             <option value="1-6">Episode 6</option>
//             <option value="1-7">Episode 7</option>
//             <option value="1-8">Episode 8</option>
//             <option value="1-9">Episode 9</option>
//             <option value="1-10">Episode 10</option>
//             <option value="1-11">Episode 11</option>
//         </optgroup>
//         <optgroup label="Season 2"> 
//             <option value="2-1">Episode 1</option>
//             <option value="2-2">Episode 2</option>
//             <option value="2-3">Episode 3</option>
//             <option value="2-4">Episode 4</option>
//             <option value="2-5">Episode 5</option>
//             <option value="2-6">Episode 6</option>
//             <option value="2-7">Episode 7</option>
//             <option value="2-8">Episode 8</option>
//             <option value="2-9">Episode 9</option>
//             <option value="2-10">Episode 10</option>
//         </optgroup>
//         <optgroup label="Season 3"> 
//             <option value="3-1">Episode 1</option>
//             <option value="3-2">Episode 2</option>
//             <option value="3-3">Episode 3</option>
//             <option value="3-4">Episode 4</option>
//             <option value="3-5">Episode 5</option>
//             <option value="3-6">Episode 6</option>
//             <option value="3-7">Episode 7</option>
//             <option value="3-8">Episode 8</option>
//             <option value="3-9">Episode 9</option>
//             <option value="3-10">Episode 10</option>
//         </optgroup>
//         <optgroup label="Season 4"> 
//             <option value="4-1">Episode 1</option>
//             <option value="4-2">Episode 2</option>
//             <option value="4-3">Episode 3</option>
//             <option value="4-4">Episode 4</option>
//             <option value="4-5">Episode 5</option>
//             <option value="4-6">Episode 6</option>
//             <option value="4-7">Episode 7</option>
//             <option value="4-8">Episode 8</option>
//             <option value="4-9">Episode 9</option>
//             <option value="4-10">Episode 10</option>
//         </optgroup>
//         <optgroup label="Season 5"> 
//             <option value="5-1">Episode 1</option>
//             <option value="5-2">Episode 2</option>
//             <option value="5-3">Episode 3</option>
//             <option value="5-4">Episode 4</option>
//             <option value="5-5">Episode 5</option>
//             <option value="5-6">Episode 6</option>
//             <option value="5-7">Episode 7</option>
//             <option value="5-8">Episode 8</option>
//             <option value="5-9">Episode 9</option>
//             <option value="5-10">Episode 10</option>
//         </optgroup>
//     </select>
// `

form.addEventListener('change', (event) => {
    event.preventDefault()
    const selection = event.target.value
    const season = selection.split('-')[0]
    const episode = selection.split('-')[1]
    window.location.href = `episode.html?season=${season}&episode=${episode}`
})
