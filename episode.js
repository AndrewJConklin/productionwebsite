const url = 'https://api.tvmaze.com/shows/216/episodes'
const navigatedUrl = new URL(window.location)
const queryString = new URLSearchParams(navigatedUrl.search)
const currentSeason = queryString.get('season')
const currentEpisode = queryString.get('episode')

fetchAndParse(url)
    .then(allEpisodeList => {
        const thisEpisode = findCurrentEpisode(allEpisodeList)
        createEpisodeDiv(thisEpisode)
    }).catch(redirect)

fetchAndParse(`https://rickandmortyapi.com/api/episode/${episodeIdMap(currentSeason, currentEpisode)}`)
    .then(episode => {
        removeLoader()
        const characterFetches = episode.characters
            .map(characterUrl => fetchAndParse(characterUrl))
        return Promise.all(characterFetches)
    }).then(characterArray =>
        characterArray.map(character => {
            return createLi(character)
        }).forEach(characterLi => {
            const characterList = document.querySelector('.characters')
            characterList.append(characterLi)
        })
    ).catch(redirect)

function createEpisodeDiv(episode) {
    const div = document.querySelector('#episode-info')
    div.innerHTML = `
        <h2>Season ${currentSeason}</h2>
        <h2>Episode ${currentEpisode} - ${episode.name} </h2>
        <img src="${episode.image.original}" alt="Still from ${episode.name}"></img>
        <p class="episode-description">${episode.summary}</p>`
}

function findCurrentEpisode(episodeList) {
    return episodeList.find(episode => {
        return (episode.season === +currentSeason === true && episode.number === +currentEpisode === true)
    })
}

function createLi(character) {
    const li = document.createElement('li')
    li.innerHTML = `
    <div class="character-listing">
        <figure>
            <figcaption>${character.name}</figcaption>
            <img src="${character.image}" alt="${character.name} Picture"></img>
            <p class="species">Species: ${character.species}</p>
            <p class="location">Origin: ${character.origin.name}<p>
        </figure>
    </div>`
    return li
}

function episodeIdMap(season, episodeNumber) {
    if (+currentSeason === 1) {
        return +currentEpisode
    }
    else if (+currentSeason === 2) {
        return (+currentEpisode + 11)
    }
    else if (+currentSeason === 3) {
        return (+currentEpisode + 21)
    }
    else if (+currentSeason === 4) {
        return (+currentEpisode + 31)
    }
    else {
        return (+currentEpisode + 41)
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

const episodeForm = document.querySelector('#episode-dropdown')
episodeForm.innerHTML = `
    <label for="episode-selector">Episode Selector</label>
    <select id="episode-selector" name="episode-selector">
    <option value="select" disabled selected> Select an episode</option>
        <optgroup label="Season 1"> 
            <option value="1-1">Episode 1</option>
            <option value="1-2">Episode 2</option>
            <option value="1-3">Episode 3</option>
            <option value="1-4">Episode 4</option>
            <option value="1-5">Episode 5</option>
            <option value="1-6">Episode 6</option>
            <option value="1-7">Episode 7</option>
            <option value="1-8">Episode 8</option>
            <option value="1-9">Episode 9</option>
            <option value="1-10">Episode 10</option>
            <option value="1-11">Episode 11</option>
        </optgroup>
        <optgroup label="Season 2"> 
            <option value="2-1">Episode 1</option>
            <option value="2-2">Episode 2</option>
            <option value="2-3">Episode 3</option>
            <option value="2-4">Episode 4</option>
            <option value="2-5">Episode 5</option>
            <option value="2-6">Episode 6</option>
            <option value="2-7">Episode 7</option>
            <option value="2-8">Episode 8</option>
            <option value="2-9">Episode 9</option>
            <option value="2-10">Episode 10</option>
        </optgroup>
        <optgroup label="Season 3"> 
            <option value="3-1">Episode 1</option>
            <option value="3-2">Episode 2</option>
            <option value="3-3">Episode 3</option>
            <option value="3-4">Episode 4</option>
            <option value="3-5">Episode 5</option>
            <option value="3-6">Episode 6</option>
            <option value="3-7">Episode 7</option>
            <option value="3-8">Episode 8</option>
            <option value="3-9">Episode 9</option>
            <option value="3-10">Episode 10</option>
        </optgroup>
        <optgroup label="Season 4"> 
            <option value="4-1">Episode 1</option>
            <option value="4-2">Episode 2</option>
            <option value="4-3">Episode 3</option>
            <option value="4-4">Episode 4</option>
            <option value="4-5">Episode 5</option>
            <option value="4-6">Episode 6</option>
            <option value="4-7">Episode 7</option>
            <option value="4-8">Episode 8</option>
            <option value="4-9">Episode 9</option>
            <option value="4-10">Episode 10</option>
        </optgroup>
        <optgroup label="Season 5"> 
            <option value="5-1">Episode 1</option>
            <option value="5-2">Episode 2</option>
            <option value="5-3">Episode 3</option>
            <option value="5-4">Episode 4</option>
            <option value="5-5">Episode 5</option>
            <option value="5-6">Episode 6</option>
            <option value="5-7">Episode 7</option>
            <option value="5-8">Episode 8</option>
            <option value="5-9">Episode 9</option>
            <option value="5-10">Episode 10</option>
        </optgroup>
    </select>
`

episodeForm.addEventListener('change', (event) => {
    event.preventDefault()
    const selection = event.target.value
    const season = selection.split('-')[0]
    const episode = selection.split('-')[1]
    window.location.href = `episode.html?season=${season}&episode=${episode}`
})
