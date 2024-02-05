function searchCities() {
    const input = document.getElementById("cityInput").value.trim().toLowerCase();

    if (input.length === 0) {
        clearSuggestions();
        return;
    }

    fetch(`search.php?q=${encodeURIComponent(input)}`)
        .then((response) => response.json())
        .then((data) => showSuggestions(data))
        .catch((error) => console.error("Error:", error));
}

function showSuggestions(cities) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = "";

    cities.forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => selectCity(city));
        suggestionsList.appendChild(li);
    });
}

function clearSuggestions() {
    document.getElementById("suggestions").innerHTML = "";
}

function selectCity(city) {
    document.getElementById("cityInput").value = city;
    clearSuggestions();
}
