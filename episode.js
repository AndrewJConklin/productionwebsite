const url = "https://api.tvmaze.com/shows/216/episodes"
const navigatedURl = new URL(window.location)
const queryString = new URLSearchParams(navigatedURl.search)
const currentSeason = queryString.get("season")
const currentEpisode = queryString.get("episode")

fetchAndParse(url)
    .then(allEpisodeList => {
        const thisEpisode = findCurrentEpisode(allEpisodeList)
        createEpisodeDiv(thisEpisode)
    }).catch(error => {
        location.href = `404.html`
    })

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
            const characterList = document.querySelector(".characters")
            characterList.append(characterLi)
        })
    ).catch(redirect)

function createEpisodeDiv(episode) {
    const div = document.querySelector("#episode-info")
    div.innerHTML = `
        <h2>Episode ${currentEpisode} - ${episode.name} </h2>
        <img src="${episode.image.original}"/></img>
        <p class="episode-description">${episode.summary}</p>`
}

function findCurrentEpisode(episodeList) {
    return episodeList.find(episode => {
        return (episode.season === +currentSeason === true && episode.number === +currentEpisode === true)
    })
}

function createLi(character) {
    const li = document.createElement("li")
    li.innerHTML = `
    <div class="character-listing">
        <figure>
            <figcaption>${character.name}</figcaption>
            <img src="${character.image}"/></img>
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
    const loader = document.querySelector(".loader")
    loader.classList.add("remove")
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}

function redirect() {
    window.location.href = `404.html`
}