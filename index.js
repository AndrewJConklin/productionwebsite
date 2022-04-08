const seasonList = document.querySelector("#season-list")
const seasons = [1, 2, 3, 4, 5]

seasons.forEach(season => {
    seasonList.append(createLi(season))
});

function createLi(season) {
    const li = document.createElement("li")
    li.innerHTML = `<div>
        <figure>
            <figcaption><a href="season.html?season=${season}">Season ${season}</a></figcaption>
            <a href="season.html?season=${season}">
            <img src="./assets/season${season}.png"></img>
            </a>
        </figure>
    </div>`
    return li
}