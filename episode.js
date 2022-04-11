const url = "https://api.tvmaze.com/shows/216/episodes"
const altUrlBase = "https://rickandmortyapi.com/api/episode"
const characterList = document.querySelector("#characters")
const navigatedURl = new URL(window.location)
const queryString = new URLSearchParams(navigatedURl.search)
const currentSeason = queryString.get("season")
const currentEpisode = queryString.get("episode")

fetch(url)
    .then(response => response.json())
    .then(parsedResponse => {
        const episode = parsedResponse.find(episode => {
            return (episode.season === +currentSeason === true && episode.number === +currentEpisode === true)
        })
        createDiv(episode)
    })


fetch(`https://rickandmortyapi.com/api/episode/${currentEpisode}`)
    .then(response => response.json())
    .then(parsedResponse => {
        const characterUrls = parsedResponse.characters
        const characterFetches = characterUrls
            .map(characterUrl => fetch(characterUrl).then(response => response.json()))
        return Promise.all(characterFetches)
    }).then(characterArray =>
        characterArray.map(character => {
            return createLi(character)
        }).forEach(characterLi => {
            characterList.append(characterLi)
        })
    )

function createDiv(episode) {
    const div = document.querySelector(".episode-info")
    div.innerHTML = `
        <h2>Episode ${currentEpisode} - ${episode.name} </h2>
        <img src="${episode.image.original}"/></img>
        <p class="episode-description">${episode.summary}</p>`
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