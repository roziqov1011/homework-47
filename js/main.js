const elLoader = document.querySelector(".js-loader")
const elFilmsList = document.querySelector(".list-films")
const elPrev = document.querySelector(".js-prev");
const elNext = document.querySelector(".js-next");

const elForm = document.querySelector(".js-form")
const elSearchInput = elForm.querySelector(".js-input")

let page = 1;

elLoader.style.display = "none";

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elFilmsList.innerHTML = "";

  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim();

  getData(page, inputValue);
});

function getData(page, value) {
  fetch(`https://www.omdbapi.com/?apikey=9fcd4d84&s=${value}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (page <= 1) {
        elPrev.disabled = true;
      }
      if (page > 1) {
        elPrev.disabled = false;
      }
      if (page == Math.ceil(data.totalResults / 10)) {
        elNext.disabled = true;
      }
      if (page < Math.ceil(data.totalResults / 10)) {
        elNext.disabled = false;
      }
      if (Math.ceil(data.totalResults / 10) < 2) {
        elPrev.disabled = true;
        elNext.disabled = true;
      }

      elLoader.style.display = "none";
      turnFilms(data.Search);
    });

  function turnFilms(array) {
    array.forEach((element) => {
      renderFilms(element);
    });
  }
}


function renderFilms(object) {
  const newLi = document.createElement("li")
  const newH = document.createElement("h3");
  const newSpan = document.createElement("span");
  const newImg = document.createElement("img");

  newImg.src = object.Poster
  newH.textContent = object.Title
  newSpan.textContent = object.Year

  newLi.classList = "card"


  newLi.appendChild(newImg)
  newLi.appendChild(newH)
  newLi.appendChild(newSpan)
  elFilmsList.appendChild(newLi)
}


function nextPage() {
  page = page + 1;

  elPrev.disabled = false;
  elFilmsList.innerHTML = "";
  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim();
  getData(page, inputValue);
}
elNext.addEventListener("click", nextPage);


function prevPage() {
  page = page - 1;

  elFilmsList.innerHTML = "";
  elLoader.style.display = "block";
  const inputValue = elSearchInput.value.trim();
  getData(page, inputValue);
}
elPrev.addEventListener("click", prevPage);



// getData(page);