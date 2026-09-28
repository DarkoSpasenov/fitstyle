# Fit-Style — démonstration client

Version de démonstration du nouveau site Fit-Style. Site statique : aucun build, aucune dépendance.

> `noindex, nofollow` + `robots.txt` bloquant : cette version ne doit pas être indexée.
> Pour la mise en ligne réelle, utiliser `fit-style-site.zip`.
> Détail du projet : `README-projet.md`.

## Mettre à jour une démo déjà en ligne

Si une version précédente est déjà sur GitHub Pages, **supprimer les anciens fichiers avant de
déposer les nouveaux** (ou remplacer tout le contenu du dépôt). Un mélange d'anciens et de nouveaux
fichiers — surtout dans `assets/css/` — produit des mises en page cassées.
Après le déploiement, recharger la page en vidant le cache (sur iPhone : onglet privé, ou
Réglages → Safari → Effacer historique et données).

## Première mise en ligne sur GitHub Pages

1. GitHub → **New repository** → nom `fitstyle-demo` → **Public** → *Create*.
2. Sur le dépôt vide : **uploading an existing file**.
3. Décompresser cette archive et glisser **le contenu** (`index.html`, `saint-aubin/`,
   `estavayer/`, `assets/`, `.nojekyll`…) — pas le dossier parent.
4. **Commit changes**.
5. **Settings → Pages** → *Source* : `Deploy from a branch`, branche `main`, dossier `/ (root)` → **Save**.
6. Une à deux minutes plus tard : `https://<votre-compte>.github.io/fitstyle-demo/`

Tous les chemins sont relatifs : le site fonctionne à la racine comme dans un sous-dossier.

## Autres façons de montrer le site

- **Sous-domaine chez votre hébergeur** (ex. `fitstyle.ds-digital.ch`) : le plus crédible en rendez-vous.
- **Netlify Drop** (`app.netlify.com/drop`) : glisser le dossier, sans compte.
- **En local** : `python3 -m http.server` dans le dossier, puis `http://localhost:8000`.

## Parcours à montrer au client

1. Page d'entrée — choix du centre, avec le bouton Cross Level-Up sur la carte de Saint-Aubin.
2. Saint-Aubin — vraies photos en place (salle, wellness, solarium, espace enfant, coachs).
3. Espaces du centre — défilement horizontal sur téléphone.
4. « Se connecter » (Gest-Fit du centre) et « S'inscrire » visibles en permanence.
5. Inscription en ligne — les 6 étapes jusqu'à la confirmation.
6. Estavayer — photos encore provisoires, et les étiquettes jaunes « À confirmer ».
