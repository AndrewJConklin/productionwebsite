const url = 'https://api.tvmaze.com/lookup/shows?imdb=tt2861424'
const episodesUrl = 'https://api.tvmaze.com/shows/216/episodes'

createNameForm()
addNameFormEvent()

fetchAndParse(episodesUrl)
    .then(allEpisodeList => {
        const seasonsListed = allEpisodeList.map(episode => episode.season)
        const uniqueSeasons = [...new Set(seasonsListed)]
        uniqueSeasons.forEach(season => {
            const seasonList = document.querySelector('#season-list')
            seasonList.append(createLi(season))
        })
        createDropDown(allEpisodeList)
        addDropdownEvent()
    }).catch(redirect)

fetchAndParse(url)
    .then(showInformation => {
        addSummary(showInformation)
        removeLoader()
    }).catch(redirect)

function createLi(season) {
    const li = document.createElement('li')
    li.innerHTML = `
        <figure>
            <figcaption><a href="season.html?season=${season}">Season ${season}</a></figcaption>
            <a href="season.html?season=${season}">
                <img src="./assets/season${season}.png" alt="Season ${season} poster"></img>
            </a>
        </figure>`
    return li
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}

function removeLoader() {
    const loader = document.querySelector('.loader')
    loader.classList.add('remove')
}

function addSummary(response) {
    const summary = response.summary
    const div = document.querySelector('#summary')
    div.innerHTML = `${summary}`
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

function createNameForm() {
    const nameForm = document.querySelector('#name-form')
    nameForm.innerHTML = `
    <label for="name">Enter your first name:</label>
    <input type="text" name="name" id="name" required/>
    <input type="submit" value="Find origin!" />
`
}

function addNameFormEvent() {
    const nameForm = document.querySelector('#name-form')
    nameForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const userName = formData.get('name')
        localStorage.setItem('userName', userName)
        const randomizedNumber = Math.floor(Math.random() * 126) + 1
        window.location.href = `origin.html?location=${randomizedNumber}`
    })
}
