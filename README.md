# Fit-Style — démonstration client

Version de démonstration du nouveau site Fit-Style, destinée à être présentée au client.
Site statique : aucun build, aucune dépendance, il suffit de servir les fichiers.

> Cette version est en `noindex, nofollow` et son `robots.txt` bloque tous les robots.
> Elle ne doit pas être indexée ni confondue avec le site de production.
> Pour la mise en ligne réelle, utiliser l'archive `fit-style-site.zip` (robots ouvert + sitemap.xml).

## Mise en ligne sur GitHub Pages (5 minutes)

1. Sur GitHub : **New repository** → nom `fitstyle-demo` → **Public** → *Create*.
2. Sur la page du dépôt vide : **uploading an existing file**.
3. Décompresser cette archive, puis glisser **le contenu du dossier** (le fichier `index.html`,
   les dossiers `saint-aubin`, `estavayer`, `assets`, etc.) — pas le dossier parent lui-même.
4. **Commit changes**.
5. **Settings → Pages** → *Source* : `Deploy from a branch` → Branche `main`, dossier `/ (root)` → **Save**.
6. Après une à deux minutes, le site est en ligne sur :
   `https://<votre-compte>.github.io/fitstyle-demo/`

Le fichier `.nojekyll` (déjà inclus) évite que GitHub ne filtre certains fichiers.
Tous les chemins sont relatifs : le site fonctionne aussi bien à la racine que dans un sous-dossier.

## Pour retirer la démo

Settings → Pages → *Source* : `None`, ou simplement supprimer le dépôt.

## Autres façons de montrer le site au client

- **Sous-domaine chez votre hébergeur** — ex. `fitstyle.ds-digital.ch` : déposer les fichiers en FTP,
  c'est l'option la plus crédible en rendez-vous, et l'URL reste à votre nom.
- **Netlify Drop** (`app.netlify.com/drop`) : glisser le dossier, URL en ligne immédiatement, sans compte.
- **En local** : ouvrir `index.html` dans un navigateur suffit pour la navigation.
  Un petit serveur évite quelques limitations : `python3 -m http.server` dans le dossier,
  puis `http://localhost:8000`.

## Arborescence

```
index.html                  Page d'entrée — choix du centre
saint-aubin/                6 pages, données de Saint-Aubin uniquement
estavayer/                  6 pages, données d'Estavayer-le-Lac uniquement
mentions-legales.html · confidentialite.html · cgv.html · 404.html
assets/css · assets/js · assets/img (placeholders photo par centre)
```

Les informations encore incertaines sont signalées sur le site par une étiquette jaune
« À confirmer » : c'est volontaire, cela sert de liste de questions pour le rendez-vous client.
Le détail figure dans le README de l'archive de production.
