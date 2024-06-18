const inputLocation = document.getElementById("input-city");
const submitButton = document.getElementById("btn-submit");
const cityValue = document.querySelector(".main-title");
const secondaryValue = document.querySelector(".secondary-title");
const aqiData = document.getElementById("aqi-data");
const resultData = document.getElementById("result");
const img = document.getElementById("airQuality-img");
const getLoader = document.querySelector(".loader-data ");

submitButton.addEventListener("click", (e) => {
  getLoader.style.display = "block";
  const inputValue = inputLocation.value;
  let options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "5c6b4b123bmsh2d4ad7d4a62b9aap14a5aejsn4074919061fb",
      "x-rapidapi-host": "air-quality-by-api-ninjas.p.rapidapi.com",
    },
  };

  if (inputValue == "") return;
  else if (inputValue != "") {
    console.log(inputValue);
    e.preventDefault();
    const url = `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${inputValue}&state=Maharastra&country=India`;
    console.log(url);
  }

  async function getData() {
    const url = `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${inputValue}&state=Maharastra&country=India`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      getLoader.style.display = "none";

      const concentration_CO = result.CO.concentration;
      const aqi_CO = result.CO.aqi;
      const concentration_NO2 = result.NO2.concentration;
      const aqi_NO2 = result.NO2.aqi;
      const concentration_O3 = result.O3.concentration;
      const aqi_O3 = result.O3.aqi;
      const concentration_PM2 = result["PM2.5"].concentration;
      const aqi_PM2 = result["PM2.5"].aqi;
      const concentration_PM10 = result.PM10.concentration;
      const aqi_PM10 = result.PM10.aqi;
      const concentration_SO2 = result.SO2.concentration;
      const aqi_SO2 = result.SO2.aqi;
      const overall_aqi = result.overall_aqi;
      cityValue.innerHTML = `${inputValue} Air Quality Index`;
      secondaryValue.innerHTML = ` Real-time PM2.5, PM10 air pollution level of ${inputValue}`;
      aqiData.innerHTML = `${overall_aqi} (AQI-US)`;

      if (document.querySelector(".rt-card")) {
        document.querySelector(".rt-card").remove();
      }
      const sectionCards = document.querySelector(".section-cards");
      const details = document.createElement("div");
      const smallCard = document.createElement("div");
      const chemicals = document.createElement("div");
      const percentage = document.createElement("div");
      const aqi = document.createElement("div");
      sectionCards.classList.add("section-cards");
      details.classList.add("cards");
      details.classList.add("rt-card");
      smallCard.classList.add("small-card");
      percentage.classList.add("percentage");
      chemicals.classList.add("chemicals");
      aqi.classList.add("aqi");

      smallCard.appendChild(percentage);
      smallCard.appendChild(chemicals);
      smallCard.appendChild(aqi);
      details.appendChild(smallCard);
      sectionCards.appendChild(details);

      details.innerHTML = "";
      Object.entries(result).forEach(([key, value]) => {
        // Skip 'overall_aqi' as it's not a pollutant
        if (key === "overall_aqi") return;

        // Create elements
        const smallCard = document.createElement("div");
        const percentage = document.createElement("div");
        const chemicals = document.createElement("div");
        const aqi = document.createElement("div");

        // Add classes
        details.classList.add("cards", "rt-card");
        smallCard.classList.add("small-card");
        percentage.classList.add("percentage");
        chemicals.classList.add("chemicals", "medium");
        aqi.classList.add("aqi");

        // Set text content or HTML (you can adjust this based on your needs)
        percentage.textContent = `Concentration : ${value.concentration.toFixed(
          2
        )} `; // Example: Set concentration as text
        chemicals.textContent = key; // Example: Set pollutant key name as text
        aqi.textContent = `AQI :  ${value.aqi}`;

        // Append elements
        details.appendChild(smallCard);
        smallCard.appendChild(chemicals);
        smallCard.appendChild(percentage);
        smallCard.appendChild(aqi);

        if (overall_aqi < 50) {
          resultData.innerHTML = "Good Air Quality";
          img.src = "/assets/goodAirQuality.png";
          details.style.border = "3px solid #e1edde ";
        } else if (overall_aqi > 50 && overall_aqi < 110) {
          resultData.innerHTML = "Moderate Air Quality";
          img.src = "/assets/airQuality.png";
          details.style.border = "3px solid #f6e1db";
        } else {
          resultData.innerHTML = "Unhealthy Air Quality";
          img.src = "/assets/unhealthy_aqi.png";
          details.style.border = "3px solid #f2dee9";
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  getData();
});
