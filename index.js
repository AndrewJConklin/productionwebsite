url = "https://api.tvmaze.com/lookup/shows?imdb=tt2861424"
const seasons = [1, 2, 3, 4, 5]

seasons.forEach(season => {
    const seasonList = document.querySelector("#season-list")
    seasonList.append(createLi(season))
});

fetchAndParse(url)
    .then(response => {
        addSummary(response)
        removeLoader()
    }).catch(redirect)

function createLi(season) {
    const li = document.createElement("li")
    li.innerHTML = `
    <div>
        <figure>
            <figcaption><a href="season.html?season=${season}">Season ${season}</a></figcaption>
            <a href="season.html?season=${season}">
                <img src="./assets/season${season}.png"></img>
            </a>
        </figure>
    </div>`
    return li
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}

function removeLoader() {
    const loader = document.querySelector(".loader")
    loader.classList.add("remove")
}

function addSummary(response) {
    const summary = response.summary
    const div = document.querySelector("#summary")
    div.innerHTML = `${summary}`
}

function redirect() {
    window.location.href = `404.html`
}