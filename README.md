# Coup de Main

Trouvez où aider, près de chez vous. Répertoire des associations solidaires de Marseille et Aix-en-Provence : carte interactive, événements bénévoles, dons, profil et niveaux.

## Contenu

```
index.html        ← la page du site
css/styles.css    ← le design
js/data.js        ← les associations et événements (c'est ICI qu'on ajoute/modifie du contenu)
js/app.js         ← la logique (carte, recherche, inscriptions, profil)
README.md         ← ce fichier
```

Aucune installation, aucun serveur : tout tourne dans le navigateur. La carte utilise Leaflet + OpenStreetMap (gratuit, chargé automatiquement en ligne).

## Mettre le site en ligne sur GitHub Pages (5 minutes)

1. **Créer un compte** sur github.com si ce n'est pas déjà fait.
2. **Créer un dépôt** : bouton vert « New » (ou l'icône +, en haut à droite → « New repository »).
   - Repository name : `coup-de-main` (ou ce que vous voulez)
   - Cocher « Public »
   - Cliquer « Create repository »
3. **Importer les fichiers** : sur la page du dépôt, cliquer « uploading an existing file » (ou Add file → Upload files).
   - Glisser-déposer **tout le contenu du dossier** : `index.html`, `README.md`, et les dossiers `css` et `js`.
   - Astuce : glissez les dossiers entiers, GitHub conserve l'arborescence. `index.html` doit être à la racine du dépôt.
   - En bas, cliquer « Commit changes ».
4. **Activer GitHub Pages** : onglet **Settings** du dépôt → menu **Pages** (colonne de gauche).
   - Source : « Deploy from a branch »
   - Branch : `main`, dossier `/ (root)` → **Save**
5. Patienter 1 à 2 minutes. L'adresse du site apparaît en haut de la page Pages :
   `https://VOTRE-PSEUDO.github.io/coup-de-main/`

Pour mettre à jour le site ensuite : retourner dans le dépôt → ouvrir le fichier à modifier → icône crayon → Commit. Le site se met à jour tout seul en ~1 minute.

## Modifier le contenu

Tout le contenu vit dans `js/data.js` :

- **Ajouter une association** : copier un bloc `{ id: ..., nom: ..., ... }` dans le tableau `ASSOCIATIONS`, changer les valeurs. Les coordonnées `lat`/`lng` se trouvent sur Google Maps (clic droit sur un lieu → premier élément du menu).
- **Ajouter un événement** : dans le tableau `evenements` d'une association. La date s'écrit `dansNJours(5)` (dans 5 jours) pour que la démo reste vivante, ou en dur `"2026-09-12"`.
- **Causes, niveaux, médailles** : tableaux `CAUSES`, `NIVEAUX`, `MEDAILLES` en bas du fichier.

## Limites de cette version (importantes à connaître)

C'est un site **statique** : il n'y a pas encore de base de données. Concrètement :

- Les profils, favoris, inscriptions aux événements et propositions d'associations sont enregistrés **dans le navigateur du visiteur** (localStorage). Chaque visiteur voit ses propres données ; les associations ne reçoivent rien pour l'instant.
- Les compteurs « X personnes inscrites » partent des valeurs de démonstration dans `data.js`.
- Les événements, équipes et chiffres sont **fictifs** (les associations, elles, sont réelles). Un bandeau en pied de page le précise aux visiteurs.

Pour passer en « vraie » application (inscriptions reçues par les associations, comptes partagés, espace association), il faudra un backend — Firebase ou Supabase sont les options les plus simples pour garder GitHub Pages en façade.
