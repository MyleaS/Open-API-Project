const coffeeList = document.getElementById("coffeeList");
const hotBtn = document.getElementById("hotBtn");
const icedBtn = document.getElementById("icedBtn");

async function fetchCoffee(type) {
  coffeeList.innerHTML = "<p>Loading...</p>";
  try {
    const response = await fetch(`https://api.sampleapis.com/coffee/${type}`);
    const data = await response.json();
    displayCoffee(data);
  } catch (error) {
    coffeeList.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
}

function displayCoffee(coffees) {
  coffeeList.innerHTML = "";
  coffees.forEach((coffee) => {
    const card = document.createElement("div");
    card.className = "coffee-card";
    card.innerHTML = `
        <h3>${coffee.title}</h3>
        <img src="${coffee.image}" alt="${coffee.title}" width="150"/>
        <p>${coffee.description || "No description available."}</p>
      `;
    coffeeList.appendChild(card);
  });
}

// Button event listeners
hotBtn.addEventListener("click", () => {
  fetchCoffee("hot");
});

icedBtn.addEventListener("click", () => {
  fetchCoffee("iced");
});

// Optionally load hot coffee by default
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch("https://api.sampleapis.com/coffee/hot");
        if (!resp.ok) throw new Error("Network response was not ok");
        const json = await resp.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      }
    };

    getData(); // ✅ Call the function inside useEffect
  }, []); // Empty dependency array = run once when mounted

  return (
    <div>
      <h1>Hot Coffee Menu</h1>

      {error && <p>Error: {error}</p>}

      <div className="coffee-list">
        {data.map((coffee) => (
          <div key={coffee.id} className="coffee-card">
            <h3>{coffee.title}</h3>
            <img src={coffee.image} alt={coffee.title} width="150" />
            <p>{coffee.description || "No description available."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
