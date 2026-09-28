# Fit-Style — nouveau site (v2)

Site statique HTML/CSS/JS, sans framework. Le visiteur choisit d'abord son centre, puis navigue
dans un parcours entièrement dédié à ce centre : **aucune donnée des deux salles n'est mélangée**.

## Arborescence

```
index.html                  PAGE D'ENTRÉE — choix du centre (+ accès direct Level-Up Cross)
saint-aubin/
  index.html                Accueil du centre
  cours.html                Planning + disciplines + réservation Gest-Fit du centre
  coaching.html             Instruction gratuite, personal training, coachs, nutrition
  abonnements.html          Tarifs (onglets par durée) + FAQ
  inscription.html          Inscription en ligne, 6 étapes (centre déjà connu)
  contact.html              Coordonnées, horaires, carte, séance découverte
estavayer/                  mêmes 6 pages, avec les données d'Estavayer-le-Lac
mentions-legales.html · confidentialite.html · cgv.html · 404.html   (communes)
robots.txt · sitemap.xml
assets/css/  base.css · components.css · pages.css
assets/js/   main.js · forms.js · inscription.js
assets/img/  commun/ · saint-aubin/ · estavayer/ · logo
```

La page d'entrée est conçue pour tenir dans une seule fenêtre, sur téléphone comme sur bureau :
aucune scrollbar, les deux centres sont visibles d'un coup d'œil. Les tailles sont exprimées en
unités de hauteur d'écran (`vh`), avec des variantes pour les écrans courts et le mode paysage.

Sur téléphone, la section « Les espaces du centre » défile horizontalement (une carte à la fois,
avec accrochage), au lieu d'empiler six cartes les unes sous les autres.

**Se connecter / S'inscrire** : sur bureau, les deux boutons sont dans l'en-tête de chaque centre
(« Se connecter » renvoie vers le Gest-Fit du bon centre). Sur téléphone, ils occupent la barre
fixe du bas avec « Appeler », et sont repris en haut du menu. La page d'entrée propose en pied de
page un accès espace membre pour chacun des deux centres.

Chaque page de centre affiche en haut une barre rappelant le centre actif, avec un lien
« Changer de centre » qui ramène à la page d'entrée. Le menu, le pied de page, le téléphone,
les horaires, le planning et les liens de réservation sont propres au centre affiché.

**Level-Up Cross** : bouton dans l'en-tête de Saint-Aubin, encart dédié sur son accueil, lien dans
le menu mobile, dans le pied de page et sur la page d'entrée. Toujours vers `https://cross-level-up.ch/`,
et uniquement côté Saint-Aubin puisque la salle n'existe qu'à cet endroit.

## 1. Photos

### Déjà en place (photos fournies par le client)

Centre de **Saint-Aubin** : `hero.jpg`, `centre.jpg`, `cardio.jpg`, `musculation.jpg`,
`wellness.jpg`, `solarium.jpg`, `espace-enfant.jpg`, `coach-nicolas-pillonel.jpg`,
`coach-yoann-bricard.jpg` et les six images de `galerie-1` à `galerie-6`.
Commun : `choix-saint-aubin.jpg` (page d'entrée) et `og-image.jpg` (partage réseaux sociaux).

Chaque photo a été recadrée au format de son emplacement, sans agrandissement, puis réencodée
(qualité 82, JPEG progressif). Les sources d'origine restent nécessaires si un recadrage doit changer :
les fichiers du site sont dérivés, pas des originaux.

Deux limites à connaître :
- les photos d'intérieur fournies font 1000 × 667 px, ce qui est juste pour un grand écran
  (elles restent nettes aux tailles utilisées, mais un écran 4K les verra légèrement lissées) ;
- les portraits des coachs font 375 × 500 px et ont des fonds différents (bleu-gris pour l'un,
  blanc pour l'autre). Idéalement, refaire les deux portraits sur un même fond, en plus haute
  définition. Le format d'affichage a été passé en 3/4 pour utiliser les photos sans les recadrer.

### Encore en placeholder

| Fichier | Taille | Contenu attendu |
|---|---|---|
| `commun/choix-estavayer.jpg` | 1400×1000 | Photo d'accroche d'Estavayer (page d'entrée) |
| `commun/cross-level-up.jpg` | 1200×800 | Réserve, non utilisée |
| `saint-aubin/cours-collectifs.jpg` | 1200×800 | Un cours collectif en action |
| `saint-aubin/coaching.jpg` | 1200×800 | Un coach avec un membre |
| `saint-aubin/cross-training.jpg` | 1000×700 | Salle Level-Up Cross |
| `estavayer/hero.jpg` | 1920×1000 | Vue d'ensemble du centre |
| `estavayer/centre.jpg` | 1200×800 | Salle d'Estavayer |
| `estavayer/musculation.jpg` · `cardio.jpg` · `salle-cours-1.jpg` · `salle-cours-2.jpg` | 1000×700 | Les espaces correspondants |
| `estavayer/cours-collectifs.jpg` · `coaching.jpg` | 1200×800 | Cours et coaching |
| `estavayer/galerie-1.jpg` à `galerie-6.jpg` | 900×700 | Galerie du centre |

Pour remplacer : écraser le fichier en gardant le même nom, en respectant le format indiqué
(le recadrage se fait automatiquement au centre, mais mieux vaut fournir le bon ratio).
Le centre d'Estavayer n'a reçu aucune photo pour l'instant : c'est le manque le plus visible.

## 2. Informations à confirmer (étiquette jaune sur le site)

1. Horaires de la salle d'**Estavayer** — le site actuel dit à la fois « 24h/24 – 7j/7 » et « 5h00–23h00 ».
2. Conditions d'accès au **wellness** de Saint-Aubin (le tarif 25.–/séance est tronqué sur le site actuel).
3. Conditions d'âge des abonnements **Kids** et **Étudiants · AVS/AI**.
4. Modalités de la **reprise d'abonnement** concurrent (jusqu'à 3 mois).
5. **Frais éventuels** à l'inscription.
6. **Coachs d'Estavayer**, présentation et tarifs du personal training des deux centres.
7. Prestations et tarifs **nutrition**.
8. **Mentions légales** : raison sociale, forme juridique, IDE, siège, responsable, hébergeur.
9. **CGV et contrat** d'abonnement (textes officiels à fournir et à valider juridiquement).
10. Durée de conservation des données et liste des sous-traitants.

## 3. À connecter côté technique

- **Formulaires** : ajouter `data-endpoint="/votre-script.php"` sur les `<form data-form>`.
  Un champ caché `centre` part déjà avec chaque envoi, ce qui permet de router vers
  `staubin@fit-style.ch` ou `estavayer@fit-style.ch`. Prévoir un anti-spam.
- **Inscription** : voir l'en-tête de `assets/js/inscription.js`.
  Contrat + signature électronique (Skribble, DeepSign…), paiement via PSP (Stripe, Datatrans,
  Payrexx, Wallee — carte et TWINT), création du membre dans Gest-Fit et e-mail de confirmation.
  Aucune transaction n'est simulée dans cette version.
- **Systèmes existants conservés** : Gest-Fit (3 accès, rattachés au bon centre), boutique et bons
  cadeaux, Level-Up Cross, Fitness-Guide, Facebook, Instagram.

## 4. Mise en ligne

- Remplacer `https://fit-style.ch/` si le domaine change (canonical, Open Graph, JSON-LD, sitemap, robots).
- Redirections 301 depuis les sous-domaines actuels :
  `staubin.fit-style.ch/*` → `fit-style.ch/saint-aubin/`, `estavayer.fit-style.ch/*` → `fit-style.ch/estavayer/`,
  `…/tarifs` → `…/abonnements.html`, `…/horaires-cours` → `…/cours.html`, `…/contact` → `…/contact.html`,
  `…/coaching` → `…/coaching.html`.
- Page d'erreur serveur → `404.html`.
- Search Console : soumettre `sitemap.xml`. Google Business Profile : pointer chaque fiche vers
  l'URL de son centre (`/saint-aubin/` et `/estavayer/`), pas vers la page d'entrée.
- La page d'entrée est volontairement légère en texte : le SEO local repose sur les deux pages de
  centre, qui portent chacune leur balisage `HealthClub`, leur titre et leur description.

## 5. Performance

Images en WebP/AVIF conseillé, `width`/`height` déjà présents (anti-CLS), `loading="lazy"` sous la
ligne de flottaison, `fetchpriority="high"` sur les hero. Polices Google Fonts : pour supprimer les
requêtes tierces, auto-héberger les `.woff2` d'Archivo et Inter dans `assets/fonts/`.
Environ 8 ko de JavaScript, chargé en `defer`, aucune librairie externe.

## 6. Ce qui n'a pas pu être vérifié

Le rendu n'a pas été testé dans un navigateur réel : contrôle statique uniquement (structure HTML,
liens et ancres de toutes les pages, JSON-LD valide, grilles fluides). Un contrôle visuel sur mobile,
tablette et desktop reste à faire, ainsi qu'une mesure Lighthouse avec les vraies photos.
