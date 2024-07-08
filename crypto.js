let allCoins = [];
async function fetchCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();
    if(!response.ok){
      return []
    }
    console.log({response});
    // allCoins = data;
    return data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return [];
  }
}
// Function to display cryptocurrency data in the table
function displayCryptoData(coins) {
  console.log({coins});
  const cryptoTable = document.getElementById("cryptoTable");
  cryptoTable.innerHTML = "";
  coins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${coin.image}" class="crypto-logo" alt="${coin.name}"></td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toFixed(2)}</td>
      <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
      <td>$${coin.total_volume ? coin.total_volume.toLocaleString() : "-"}</td>
      <td>$${coin.market_cap ? coin.market_cap.toLocaleString() : "-"}</td>
    `;
    cryptoTable.appendChild(row);
  });
}
// Function to filter cryptocurrencies based on user input
function filterCryptoData(coins, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
  );
  return filteredCoins;
}
// Function to handle search input
function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    displayCryptoData(allCoins);
  } else {
    const filteredCoins = filterCryptoData(allCoins, searchTerm);
    displayCryptoData(filteredCoins);
  }
}
// Function to initialize the app
async function initializeApp() {
  try {
    allCoins = await fetchCryptoData();
    console.log({allCoins});
    console.log('are we here');
    displayCryptoData(allCoins);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}
initializeApp();
// Add event listener to search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearchInput);
// document.addEventListener('DOMContentLoaded', function () {
//   const content = document.querySelector('.content');
//   const itemsPerPage = 11;
//   let currentPage = 0;
//   const items = Array.from(content.getElementsByTagName('tr')).slice(1);
// function showPage(page) {
//   const startIndex = page * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   items.forEach((item, index) => {
//     item.classList.toggle('hidden', index < startIndex || index >= endIndex);
//   });
//   updateActiveButtonStates();
// }
// function createPageButtons() {
//   const totalPages = Math.ceil(items.length / itemsPerPage);
//   const paginationContainer = document.createElement('div');
//   const paginationDiv = document.body.appendChild(paginationContainer);
//   paginationContainer.classList.add('pagination');
//   // Add page buttons
//   for (let i = 0; i < totalPages; i++) {
//     const pageButton = document.createElement('button');
//     pageButton.textContent = i + 1;
//     pageButton.addEventListener('click', () => {
//       currentPage = i;
//       showPage(currentPage);
//       updateActiveButtonStates();
//     });
//       content.appendChild(paginationContainer);
//       paginationDiv.appendChild(pageButton);
//     }
// }
// function updateActiveButtonStates() {
//   const pageButtons = document.querySelectorAll('.pagination button');
//   pageButtons.forEach((button, index) => {
//     if (index === currentPage) {
//       button.classList.add('active');
//     } else {
//       button.classList.remove('active');
//     }
//   });
// }
//   createPageButtons();
//   showPage(currentPage);
// });









