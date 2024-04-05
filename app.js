let index = 0,
  interval = 1000;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animate = (star) => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
};

for (const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3));
}

// main weather app start

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search .search_btn");
const image = document.querySelector(".weather_icon");
const weather = document.querySelector(".weather");

async function getWeather(city) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=54ed541570143ab37326b92e0dd2b23c&units=metric`
  );
  if (res.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").innerText =
      "You entered a wrong city name !";
  } else {
    document.querySelector(".error").style.display = "none";
  }
  let data = await res.json();
  console.log(data);
  document.querySelector(".celcius").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + " km/h ";

  if (data.weather[0].main == "Clouds") {
    image.src = "./assets/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    image.src = "./assets/clear.png";
  } else if (data.weather[0].main == "Rain") {
    image.src = "./assets/rain.webp";
  } else if (data.weather[0].main == "Drizzle") {
    image.src = "./assets/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    image.src = "./assets/mist.png";
  } else if (data.weather[0].main == "Snow") {
    image.src = "./assets/snow.webp";
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value);
});



searchInput.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    getWeather(searchInput.value).click();
  }
});







