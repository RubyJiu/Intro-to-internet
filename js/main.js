(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    items: 1,
    smartSpeed: 1500,
    dots: true,
    dotsData: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 5,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
  // Chatbot Logic
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const chatbotContainer = document.querySelector(".chatbot-container");
  const chatbotCloseBtn = document.querySelector(".chatbot-close-btn");
  const chatBox = document.querySelector(".chat-box");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");

  const GEMINI_API_KEY = "AIzaSyCtD7VVaWus-5QZtg0LbFDoZqK3InCddMA";
  let conversationHistory = [];

  if (chatbotToggler) {
    const toggleChatbot = () => {
      chatbotContainer.classList.toggle("show");
    };
    chatbotToggler.addEventListener("click", toggleChatbot);
    chatbotCloseBtn.addEventListener("click", toggleChatbot);

    const addMessage = (sender, message) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message", `chat-message-${sender}`);
      const p = document.createElement("p");
      if (sender === "typing") {
        p.innerHTML = "<span></span><span></span><span></span>";
      } else {
        p.textContent = message;
      }
      messageElement.appendChild(p);
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
      return messageElement;
    };

    const handleChat = async (e) => {
      e.preventDefault();
      const userInput = chatInput.value.trim();
      if (!userInput) return;

      addMessage("user", userInput);
      chatInput.value = "";
      const typingIndicator = addMessage("typing", "");

      conversationHistory.push({ role: "user", parts: [{ text: userInput }] });

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: conversationHistory,
              systemInstruction: {
                parts: [
                  {
                    text: "Always use the English language. If you are asked who you are, you must answer 'I am AI Ruby'.",
                  },
                ],
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error.message || "Failed to get response from API."
          );
        }

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
          const aiResponse = data.candidates[0].content.parts[0].text;
          conversationHistory.push({
            role: "model",
            parts: [{ text: aiResponse }],
          });
          typingIndicator.remove();
          addMessage("ai", aiResponse);
        } else {
          typingIndicator.remove();
          addMessage("ai", "I'm sorry, I can't respond to that right now.");
        }
      } catch (error) {
        console.error("Error:", error);
        typingIndicator.remove();
        addMessage(
          "ai",
          `Sorry, something went wrong. Please check your API key and the console. Error: ${error.message}`
        );
      }
    };
    chatForm.addEventListener("submit", handleChat);
  }

  // Weather Forecast Logic
  const weatherSearchBtn = document.getElementById("search-weather-btn");
  const locationInput = document.getElementById("location-input");
  const weatherResultContainer = document.getElementById(
    "weather-result-container"
  );

  // --- IMPORTANT ---
  // Replace "YOUR_OPENWEATHER_API_KEY" with your actual OpenWeather API key.
  const OPENWEATHER_API_KEY = "70138a1007ee5fe086070f5cfc222de8";

  const handleWeatherSearch = async () => {
    const location = locationInput.value.trim();
    if (!location) {
      alert("Please enter a city name.");
      return;
    }

    weatherResultContainer.style.display = "block";
    weatherResultContainer.innerHTML = "<p>Loading weather data...</p>";

    try {
      // Step 1: Use Geocoding API to find coordinates for the location
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        throw new Error("Location not found. Please try another city.");
      }

      const { lat, lon, name, country } = geoData[0];

      // Step 2: Use the coordinates to get the current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      if (weatherResponse.status !== 200) {
        throw new Error(weatherData.message || "Failed to fetch weather data.");
      }

      // Step 3: Display the weather information
      displayWeather(weatherData, name, country);
    } catch (error) {
      console.error("Weather search error:", error);
      weatherResultContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    }
  };

  const displayWeather = (data, cityName, countryName) => {
    const { main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherResultContainer.innerHTML = `
            <div class="weather-card">
                <h4 class="mb-3">Weather in ${cityName}, ${countryName}</h4>
                <div class="d-flex align-items-center">
                    <img src="${iconUrl}" alt="${
      weather[0].description
    }" class="weather-icon">
                    <div class="ms-3">
                        <p class="display-4 mb-0">${main.temp.toFixed(1)}°C</p>
                        <p class="text-capitalize mb-0">${
                          weather[0].description
                        }</p>
                    </div>
                </div>
                <div class="mt-3">
                    <p><strong>Feels like:</strong> ${main.feels_like.toFixed(
                      1
                    )}°C</p>
                    <p><strong>Humidity:</strong> ${main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                </div>
            </div>
        `;
  };

  if (weatherSearchBtn) {
    weatherSearchBtn.addEventListener("click", handleWeatherSearch);
    locationInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        handleWeatherSearch();
      }
    });
  }
});
