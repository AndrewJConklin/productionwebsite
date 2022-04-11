const episodeList = document.querySelector(".episodes")
const url = "https://api.tvmaze.com/shows/216/episodes"

const navigatedURl = new URL(window.location)
const queryString = new URLSearchParams(navigatedURl.search)
const currentSeason = queryString.get("season")

fetch(url)
    .then(response => response.json())
    .then(parsedResponse => parsedResponse.filter(episode => {
        return episode.season === +currentSeason === true
    }).map(filteredEpisode => {
        return createLi(filteredEpisode)
    }).forEach(episodeLi => {
        episodeList.append(episodeLi)
    })
    )


const header = document.querySelector("#season-header")
header.textContent = `Season ${currentSeason}`

function createLi(episode) {
    const li = document.createElement("li")
    li.innerHTML = `
    <div class="episode-listing">
        <figure>
            <figcaption>
                <a href="episode.html?season=${currentSeason}&episode=${episode.number}">Episode ${episode.number} - ${episode.name}</a>
            </figcaption>
            <a href="episode.html?season=${currentSeason}&episode=${episode.number}">
                <img src="${episode.image.original}"/></img>
            </a>
            <p class="episode-description">${episode.summary}
            </p>
        </figure>
    </div>`
    return li
}