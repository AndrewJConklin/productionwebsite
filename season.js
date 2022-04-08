const url = "https://rickandmortyapi.com/api"
const seasons = [1, 2, 3, 4, 5]
const episodeList = document.querySelector(".episodes")


const navigatedURl = new URL(window.location)
const queryString = new URLSearchParams(navigatedURl.search)
const currentSeason = queryString.get("season")


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


fetch(url).then(reponse => {
    return reponse.json()
}).then(parsedResponse => {
    const episodesUrl = parsedResponse.episodes
    fetch(episodesUrl).then(fetchedUrl => {
        return fetchedUrl.json()
    }).then(parsedResponse => {
        const episodes = parsedResponse.results
        const filteredEpisodes = episodes.filter(episode => {
            return true
        })
        console.log(filteredEpisodes)
        episodes.map(episode => {
            return createLi(episode)
        }).forEach(episodeLi => {
            episodeList.append(episodeLi)
        })
    })
})

const header = document.querySelector("#season-header")
header.textContent = `Season ${currentSeason}`

function episodeSeasonFilter(number) {
    if (number === 1) {
        return episode.id < 12
    }
    if (number === 2) {
        return (episode.id >= 12 && episode.id < 23)
    }
}

// if (currentSeason === 1) {
//     return episode.id < (episodeSeasonFilter(+currentSeason)) === true
// }
//             else if (currentSeason === 2) {
//                 return ((episode.id < (episodeSeasonFilter(currentSeason))) === true && (episode.id > (episodeSeasonFilter((+currentSeason - 1))) === true))
//             }