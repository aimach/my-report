// Consigne : Avec une chaîne de caractères donnée, vérifier si les caractères peuvent être réordonnés pour former une séquence palindromique. Il n’est pas nécessaire de vérifier les majuscules, les caractères spéciaux, les accents, les espaces, la ponctuation ou les séparateurs de mots.
// Input : chaîne de caractères.
// Output : valeur booléenne - 0 pour FALSE ou 1 pour TRUE.

function palindromeCheck(input) {
  const string = input.split(""); // on transforme la string en array pour manipulation
  for (let i = 0; i < string.length; i++) {
    // on boucle sur le tableau
    const char = string[i];
    const sameCharIndex = string.indexOf(char, i + 1); // on trouve l'index du caractère similaire
    if (sameCharIndex !== -1) {
      // si un caractère similaire existe (indexOf() renvoie -1 si pas de correspondance)
      string.splice(sameCharIndex, 1); // on supprime le caractère similaire du tableau
      string.splice(i, 1); // on supprime le caractère en cours du tableau
      i--; // on empêche l'incrémentation vu qu'on a supprimé le caractère courant
    }
  }

  const isEvenLength = input.length % 2 === 0; // savoir si la longueur du mot est paire ou impaire
  if (isEvenLength && string.length === 0) return 1; // si la longueur du mot est paire et qu'il ne reste aucun caractère, c'est un palindrome
  if (!isEvenLength && string.length === 1) return 1; // si la longueur du mot est impaire et qu'il reste un seul caractère, c'est un palindrome
  return 0; // si on n'est pas entré dans les conditions précédentes, ce n'est pas un palindrome
}

console.log("Palindrome Check");
console.log(palindromeCheck("nssnoo"));
console.log(palindromeCheck("abctpm"));
