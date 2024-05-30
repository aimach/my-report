# My-Report, une application MERN

## Description

Développement d’un module fullstack de comptes rendus commerciaux. L’objectif final est de proposer une interface de gestion complète de ces comptes rendus (création, lecture, édition, suppression).

## Features

L’entreprise gère plusieurs commerciaux, qui rendent régulièrement visite à leurs clients respectifs et remplissent après chaque visite un formulaire de compte rendu via la plateforme.
Features prévues :

- Une page de création de compte rendu avec les informations suivantes :
  - Le nom, adresse et contact du client visité
  - La date de la visite
  - Une zone de texte libre pour écrire le corps du compte rendu
  - Nombre d’articles commandés par le client
  - Chiffre d’affaires généré lors de cette vente
  - La date prévisionnelle de la prochaine visite
  - Prévision du nombre d’articles qui seront vendus par le client jusqu’à la prochaine visite
  - Prévision du chiffre d’affaires qui sera généré par ces ventes
- Une page listant les comptes rendus et permettant de les modifier ou les supprimer

## Installation

- Cloner dépôt Github

  ```javascript
   git clone git@github.com:aimach/my-report.git
   cd my-report
  ```

- Installer les dépendances

  ```javascript
   cd /server
   npm i
  ```

  ```javascript
   cd /client
   npm i
  ```

- Configurer les variables d'environnement

  Configurer les fichiers server/config.env.sample et client/.env à partir des samples

- Lancer la commande de seed

  ```javascript
   cd /server
   npm run seed
  ```

- Démarrer l'application

  ```javascript
   cd /client
   npm run dev
  ```

  ```javascript
  cd /server
  npm run server
  ```

- Se connecter à l'application

Si la commande de seed a été lancée, utiliser les identifiants de l'administrateur pour consulter l'application : (mail) admin@my-report.fr / (psw) admin
