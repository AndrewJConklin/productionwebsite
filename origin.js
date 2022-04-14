const navigatedUrl = new URL(window.location)
const queryString = new URLSearchParams(navigatedUrl.search)
const currentLocation = queryString.get('location')

fetchAndParse(`https://rickandmortyapi.com/api/location/${currentLocation}`)
    .then(locationInfo => {
        removeLoader()
        createLocationDiv(locationInfo)
        const characterFetches = locationInfo.residents
            .map(characterUrl => fetchAndParse(characterUrl))
        return Promise.all(characterFetches)
    }).then(characterArray => {
        if (characterArray.length === 0) {
            const characterList = document.querySelector('.characters')
            characterList.innerHTML = `
                <p id="alone">Sorry, you are all alone here.</p>
                `
        }
        else {
            characterArray.map(character => {
                console.log(character)
                return createLi(character)
            }).forEach(characterLi => {
                const characterList = document.querySelector('.characters')
                characterList.append(characterLi)
            })
        }
    }).catch(redirect)

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
    <div class="character-listing">
        <figure>
            <figcaption>${character.name}</figcaption>
            <img src="${character.image}" alt="${character.name} Picture"></img>
            <p class="species">Species: ${character.species}</p>
            <p class="location">Origin: ${character.origin.name}<p>
        </figure>
    </div>`
    return li
}

function redirect() {
    window.location.href = '404.html'
}

const episodeForm = document.querySelector('#episode-dropdown')
episodeForm.innerHTML = `
    <label for="episode-selector">Episode Selector</label>
    <select id="episode-selector" name="episode-selector">
    <option value="select" disabled selected> Select an episode</option>
        <optgroup label="Season 1"> 
            <option value="1-1">Episode 1</option>
            <option value="1-2">Episode 2</option>
            <option value="1-3">Episode 3</option>
            <option value="1-4">Episode 4</option>
            <option value="1-5">Episode 5</option>
            <option value="1-6">Episode 6</option>
            <option value="1-7">Episode 7</option>
            <option value="1-8">Episode 8</option>
            <option value="1-9">Episode 9</option>
            <option value="1-10">Episode 10</option>
            <option value="1-11">Episode 11</option>
        </optgroup>
        <optgroup label="Season 2"> 
            <option value="2-1">Episode 1</option>
            <option value="2-2">Episode 2</option>
            <option value="2-3">Episode 3</option>
            <option value="2-4">Episode 4</option>
            <option value="2-5">Episode 5</option>
            <option value="2-6">Episode 6</option>
            <option value="2-7">Episode 7</option>
            <option value="2-8">Episode 8</option>
            <option value="2-9">Episode 9</option>
            <option value="2-10">Episode 10</option>
        </optgroup>
        <optgroup label="Season 3"> 
            <option value="3-1">Episode 1</option>
            <option value="3-2">Episode 2</option>
            <option value="3-3">Episode 3</option>
            <option value="3-4">Episode 4</option>
            <option value="3-5">Episode 5</option>
            <option value="3-6">Episode 6</option>
            <option value="3-7">Episode 7</option>
            <option value="3-8">Episode 8</option>
            <option value="3-9">Episode 9</option>
            <option value="3-10">Episode 10</option>
        </optgroup>
        <optgroup label="Season 4"> 
            <option value="4-1">Episode 1</option>
            <option value="4-2">Episode 2</option>
            <option value="4-3">Episode 3</option>
            <option value="4-4">Episode 4</option>
            <option value="4-5">Episode 5</option>
            <option value="4-6">Episode 6</option>
            <option value="4-7">Episode 7</option>
            <option value="4-8">Episode 8</option>
            <option value="4-9">Episode 9</option>
            <option value="4-10">Episode 10</option>
        </optgroup>
        <optgroup label="Season 5"> 
            <option value="5-1">Episode 1</option>
            <option value="5-2">Episode 2</option>
            <option value="5-3">Episode 3</option>
            <option value="5-4">Episode 4</option>
            <option value="5-5">Episode 5</option>
            <option value="5-6">Episode 6</option>
            <option value="5-7">Episode 7</option>
            <option value="5-8">Episode 8</option>
            <option value="5-9">Episode 9</option>
            <option value="5-10">Episode 10</option>
        </optgroup>
    </select>
`

episodeForm.addEventListener('change', (event) => {
    event.preventDefault()
    const selection = event.target.value
    const season = selection.split('-')[0]
    const episode = selection.split('-')[1]
    window.location.href = `episode.html?season=${season}&episode=${episode}`
})
