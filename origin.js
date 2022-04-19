const navigatedUrl = new URL(window.location)
const queryString = new URLSearchParams(navigatedUrl.search)
const currentLocation = queryString.get('location')
const episodesUrl = 'https://api.tvmaze.com/shows/216/episodes'

fetchAndParse(`https://rickandmortyapi.com/api/location/${currentLocation}`)
    .then(locationInfo => {
        removeLoader()
        createLocationDiv(locationInfo)
        const characterFetches = locationInfo.residents
            .map(characterUrl => fetchAndParse(characterUrl))
        return Promise.all(characterFetches)
    }).then(characterArray => makeCharacterList(characterArray)
    ).catch(redirect)

fetchAndParse(episodesUrl)
    .then(allEpisodeList => {
        createDropDown(allEpisodeList)
        addDropdownEvent()
    })

function makeCharacterList(characterArray) {
    if (characterArray.length === 0) {
        const characterList = document.querySelector('.characters')
        characterList.innerHTML = `
                <p id="alone">Sorry, you are all alone here.</p>
                `
    }
    else {
        characterArray.map(character => {
            return createLi(character)
        }).forEach(characterLi => {
            const characterList = document.querySelector('.characters')
            characterList.append(characterLi)
        })
    }
}

function createLocationDiv(location) {
    const div = document.querySelector('#origin-info')
    const storedName = localStorage.getItem('userName')
    div.innerHTML = `
        <p class="hello-message">Hello ${storedName}! Through complex calculations, we have determined that your origin is ${location.name}! ${location.name} is a ${location.type} located in the ${location.dimension}.</p>
        `
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}

function removeLoader() {
    const loader = document.querySelector('.loader')
    loader.classList.add('remove')
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
