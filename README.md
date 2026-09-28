# Fit-Style — démonstration client

Version de démonstration du nouveau site Fit-Style. Site statique : aucun build, aucune dépendance.

> Cette version est en `noindex, nofollow`, son `robots.txt` bloque tous les robots et le
> `sitemap.xml` en a été retiré. Elle ne doit pas être indexée ni confondue avec la production.
> Pour la mise en ligne réelle, utiliser l'archive `fit-style-site.zip`.
> Détail du projet (photos, informations à confirmer, éléments à connecter) : `README-projet.md`.

## Mise en ligne sur GitHub Pages (5 minutes)

1. GitHub → **New repository** → nom `fitstyle-demo` → **Public** → *Create*.
2. Sur le dépôt vide : **uploading an existing file**.
3. Décompresser cette archive et glisser **le contenu** (`index.html`, `saint-aubin/`,
   `estavayer/`, `assets/`, `.nojekyll`…) — pas le dossier parent.
4. **Commit changes**.
5. **Settings → Pages** → *Source* : `Deploy from a branch`, branche `main`, dossier `/ (root)` → **Save**.
6. Une à deux minutes plus tard : `https://<votre-compte>.github.io/fitstyle-demo/`

Le `.nojekyll` est déjà inclus. Tous les chemins sont relatifs : le site fonctionne à la racine
comme dans un sous-dossier. Pour retirer la démo : Settings → Pages → Source `None`, ou supprimer le dépôt.

## Autres façons de montrer le site

- **Sous-domaine chez votre hébergeur** (ex. `fitstyle.ds-digital.ch`) : le plus crédible en rendez-vous.
- **Netlify Drop** (`app.netlify.com/drop`) : glisser le dossier, sans compte.
- **En local** : `python3 -m http.server` dans le dossier, puis `http://localhost:8000`.

## Parcours à montrer au client

1. Page d'entrée — choix du centre, tient dans une seule fenêtre, bouton direct vers Level-Up Cross.
2. Saint-Aubin — les vraies photos sont en place (salle, wellness, solarium, espace enfant, coachs).
3. Espaces du centre — défilement horizontal sur téléphone.
4. « Se connecter » (Gest-Fit du centre) et « S'inscrire » visibles en permanence.
5. Inscription en ligne — les 6 étapes jusqu'à l'écran de confirmation.
6. Estavayer — encore en photos provisoires : c'est la demande principale à formuler au client,
   avec les étiquettes jaunes « À confirmer ».
