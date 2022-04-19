const url = 'https://api.tvmaze.com/shows/216/episodes'
const navigatedUrl = new URL(window.location)
const queryString = new URLSearchParams(navigatedUrl.search)
const currentSeason = queryString.get('season')
const currentEpisode = queryString.get('episode')

fetchAndParse(url)
    .then(allEpisodeList => {
        const thisEpisode = findCurrentEpisode(allEpisodeList)
        createEpisodeDiv(thisEpisode)
        createDropDown(allEpisodeList)
        addDropdownEvent()
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

function createDropDown(episodeList) {
    const seasonsListed = episodeList.map(episode => episode.season)
    const uniqueSeasons = [...new Set(seasonsListed)]
    uniqueSeasons.forEach(season => {
        const select = document.querySelector("#episode-selector")
        const optGroup = createOptGroup(season)
        select.append(optGroup)
        const filteredEpisodes = episodeList.filter(episode => {
            return episode.season === season === true
        })
        filteredEpisodes.forEach(episode => {
            const option = createOption(episode)
            optGroup.append(option)
        })
    })
}

function createOptGroup(season) {
    const optGroup = document.createElement("optgroup")
    optGroup.label = `Season ${season}`
    return optGroup
}

function createOption(episode) {
    const option = document.createElement("option")
    option.value = `${episode.season} - ${episode.number}`
    option.textContent = `Episode ${episode.number}`
    return option
}

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
        <figure class="character-listing">
            <figcaption>${character.name}</figcaption>
            <img src="${character.image}" alt="${character.name} Picture"></img>
            <p class="species">Species: ${character.species}</p>
            <p class="location">Origin: ${character.origin.name}<p>
        </figure>`
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

function addDropdownEvent() {
    const episodeForm = document.querySelector('#episode-dropdown')
    episodeForm.addEventListener('change', (event) => {
        event.preventDefault()
        const selection = event.target.value
        const season = selection.split('-')[0]
        const episode = selection.split('-')[1]
        window.location.href = `episode.html?season=${season}&episode=${episode}`
    })
}
