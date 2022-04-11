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
        console.log(filteredEpisode)
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
        <h3>${episode.name}</h3>
        <figure>
            <figcaption> Original Airdate ${episode.airdate}</figcaption>
            <img src="${episode.image.medium}"/>
                <a></a>
            </img>
        </figure>
    </div>`
    return li
}