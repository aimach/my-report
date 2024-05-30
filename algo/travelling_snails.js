// Consigne : Affichez l’ordre dans lequel les escargots atteignent le sommet des pôles.
// Input : N, tableau avec hauteurs = heights[N], tableau avec des mètres ascendants = daySpeed [N] et des mètres descendants = nightSpeed [N].
// Output : tableau avec l’ordre dans lequel les escargots atteignent le sommet des pôles.

function travellingSnails(n, heights, daySpeed, nightSpeed) {
  const results = []; // initialisation du tableau de résultats
  for (let i = 0; i < n; i++) {
    // on boucle sur tous les escargots
    let distance = daySpeed[i]; // tous les escargots font au moins 1 jour
    let days = 1; // le décompte des jours commence à 1 jour
    while (heights[i] > distance) {
      // tant que la hauteur est supérieure à la distance parcourue
      distance -= nightSpeed[i]; // on enlève la distance de la nuit
      distance += daySpeed[i]; // on ajoute la distance du jour
      days += 1; // on ajoute 1 jour au décompte
    }
    results.push({ index: i + 1, days }); // une fois la boucle finie, on stocke les résultats
  }
  return results.sort((a, b) => a.days - b.days).map((snail) => snail.index); // on trie le tableau par le nombre de jours croissant puis on ne renvoie que l'index
}

console.log("Travelling Snails");
const n = 7;
const heights = [10, 5, 8, 3, 25, 7, 9];
const daySpeed = [2, 3, 2, 4, 5, 3, 2];
const nightSpeed = [1, 2, 1, 3, 1, 2, 0];
console.log(travellingSnails(n, heights, daySpeed, nightSpeed));
