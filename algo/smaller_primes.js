// Consigne : déterminer tous les nombres premiers plus petits qu'une valeur d'entrée donnée (< N).
// Input : N entier > 0.
// Output : le tableau avec les nombres premiers.

function smallerPrimes(input) {
  if (input < 0) {
    // si l'input est inférieur à 0
    return "L'input doit être supérieur à 0";
  }

  const primeNumberArray = [];

  for (let i = 2; i < input; i++) {
    // on fait tous les chiffres jusqu'à notre nombre à partir de 2 (un nombre premier ne peut pas être inférieur à 2)
    if (isPrimeNumber(i)) {
      // si la fonction isPrimeNumber est truthy
      primeNumberArray.push(i); // on stocke le nombre dans le tableau
    }
  }

  return primeNumberArray;
}

function isPrimeNumber(number) {
  if (number < 2) return false; // un nombre premier ne peut pas être inférieur à 2
  for (let i = 2; i < number; i++) {
    // on commence à 2 et on passe en revue tous les nombres jusqu'au notre number - 1
    if (number % i === 0) {
      // si le reste de la division de notre nombre avec le nombre en cours est égal à 0
      return false; // alors le nombre n'est pas premier
    }
  }
  return true; // si on n'est pas rentré dans les conditions précédentes, le nombre est premier
}

console.log("Smaller Primes");
console.log(smallerPrimes(10));
