const url = "https://api.tvmaze.com/shows/216/episodes"
const navigatedUrl = new URL(window.location)
const queryString = new URLSearchParams(navigatedUrl.search)
const currentSeason = queryString.get("season")

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
    const episodeLi = document.createElement("li")
    episodeLi.innerHTML = `
    <div class="episode-listing">
        <figure>
            <figcaption>
                <a href="episode.html?season=${currentSeason}&episode=${episode.number}">Episode ${episode.number} - ${episode.name}</a>
            </figcaption>
            <a href="episode.html?season=${currentSeason}&episode=${episode.number}">
                <img src="${episode.image.original}"/></img>
            </a>
            ${episode.summary}
        </figure>
    </div>`
    return episodeLi
}

function appendLi(episodeLi) {
    const $episodeList = document.querySelector("#episode-list")
    $episodeList.append(episodeLi)
}

function createSeasonHeader() {
    const header = document.querySelector("#season-header")
    header.textContent = `Season ${currentSeason}`
}

function updateButtons() {
    const next = document.querySelector("#next")
    const previous = document.querySelector("#previous")
    next.addEventListener("click", event => {
        event.preventDefault()
        location.href = `season.html?season=${(+currentSeason + 1)}`
    })

    previous.addEventListener("click", event => {
        event.preventDefault()
        location.href = `season.html?season=${(+currentSeason - 1)}`
    })
}

function hideButton() {
    const next = document.querySelector("#next")
    const previous = document.querySelector("#previous")
    if (+currentSeason === 5) {
        next.classList.add("hidden")
    }
    else if (+currentSeason === 1) {
        previous.classList.add("hidden")
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