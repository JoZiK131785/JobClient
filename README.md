# devjobs par JoZiK

## Installation

1. Cloner le dépôt 
2. Exécuter la commande `npm install`
3. Lancer l'application en exécutant la commande `npm start`

## CSS (src)

Le site est responsive mobile (mw 320 px), tablet (mw 768px) et desktop (mw 1200px).

- `reset.css` : Reset CSS de base
- `app.css` : Variables CSS et fonts
- `index.css` : Setup des balises de base, container et boutons reutilisés

## Routes

- `/` : Route vers la page Home
- `/create` : Route vers la page Create
- `/update/:jobID` : Route vers la page Update (meme page que la Create)
- `/single/:jobID` : Route vers la Single

## HOME

- `Header` : Composé d'un titre, d'un bouton Create qui redirige vers la page de création (uniquement disponible sur la page d'accueil)
[MANQUANT] : et d'un bouton DarkMode
- `SearchBar` : Composé d'un input pour rechercher les mots clés comme l'intitulé du poste ou l'entreprise, d'un input pour la localisation et d'une checkbox FullTimeOnly. Des listes deroulantes font des propositions de selection ou affiche aucune correspondance si plus rien de match. [MANQUANT] : La fonction Search permet de filtrer le liste actuelle avec les parametres souhaites
- `JobBoard` : Liste des jobs, triés du plus recent au moins recent. La page n'affiche que les 12 premiers jobs. Un bouton loadMore permet d'en afficher 12 supp mais affiche "Plus de jobs disponibles" si besoin. Chaque jobCard est cliquable et renvoi vers sa single associée.

## SINGLE

- `Header` : Meme composant que sur l'accueil
- `SingleHeader` : Composé du logo, du nom et de l'URL du site de l'entreprise. Un bouton permet de rediriger l'utilisateur vers le website.
- `SingleContent` : Composé des datas du job en question. Un bouton apply renvoi vers le lien pour postuler a l'annonce. Un bouton modifier permet d'etre rediriger vers la page Create mais avec une url differente composée de l'id du job. Un bouton supprimer permet de supprimer l'annonce.

## CREATE

- `Header` : Meme composant que sur l'accueil
- `Form` : Les inputs permettent de modifier certains champs de l'annonce. Un text apparait si l'un des champs est manquant. 
[MANQUANT] : Les inputs requirements et role sont manquants... =/

Note : l'utilisateur est redirigé sur cette page de deux manieres:
    - `/create` : Les inputs sont vide et lorsque l'utilisateur submit, cela crée un new job
    - `/update/:jobID` : Les inputs sont preremplis avec les datas du job en question et lorsque l'utilisateur submit, cela update le job.
