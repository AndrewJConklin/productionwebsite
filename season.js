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
        createDropDown(allEpisodeList)
        addDropdownEvent()
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