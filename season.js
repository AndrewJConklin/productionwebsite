const episodesUrls = ["https://rickandmortyapi.com/api/episode", "https://rickandmortyapi.com/api/episode?page=2", "https://rickandmortyapi.com/api/episode?page=3"]
const seasons = [1, 2, 3, 4, 5]
const episodeList = document.querySelector(".episodes")


const navigatedURl = new URL(window.location)
const queryString = new URLSearchParams(navigatedURl.search)
const currentSeason = queryString.get("season")

fetchAllEpisodesUrls(episodesUrls)
    .then(fetches => {
        fetches.forEach(fetch => {
            filteredEpisodes = episodeSeasonFilter(fetch.results)
            filteredEpisodes.map(episode => {
                return createLi(episode)
            }).forEach(episodeLi => {
                episodeList.append(episodeLi)
            })
        })
    })

const header = document.querySelector("#season-header")
header.textContent = `Season ${currentSeason}`

function fetchAllEpisodesUrls(episodesUrls) {
    const episodesFetches = episodesUrls.map(url => fetch(url)
        .then(response => response.json()))
    return Promise.all(episodesFetches)
}

function createLi(episode) {
    const li = document.createElement("li")
    li.innerHTML = `<div>
        <figure>
            <figcaption>${episode.name}</figcaption>
            <img>
                <a></a>
            </img>
        </figure>
    </div>`
    return li
}

function episodeSeasonFilter(episodeArray) {
    return episodeArray.filter(episode => {
        if (currentSeason === "1") {
            return episode.id < 12 === true
        }
        else if (currentSeason === "2") {
            return ((episode.id >= 12 === true) && (episode.id < 22 === true))
        }
        else if (currentSeason === "3") {
            return ((episode.id >= 22 === true) && (episode.id < 32 === true))
        }
        else if (currentSeason === "4") {
            return ((episode.id >= 32 === true) && (episode.id < 42 === true))
        }
        else {
            return (episode.id >= 42 === true)
        }
    })
}

// function fetchAndParse(url) {
//     return fetch(url).then(response => response.json())
// }