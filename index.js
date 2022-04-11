const seasonList = document.querySelector("#season-list")
const seasons = [1, 2, 3, 4, 5]
url = "https://api.tvmaze.com/lookup/shows?imdb=tt2861424"

seasons.forEach(season => {
    seasonList.append(createLi(season))
});

fetchAndParse(url).then(response => {
    const summary = response.summary
    const div = document.querySelector("#summary")
    div.innerHTML = `${summary}`
})

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