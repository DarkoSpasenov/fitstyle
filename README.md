# Fit-Style — nouveau site (v1)

Site statique HTML/CSS/JS, sans framework ni dépendance externe (hors Google Fonts et cartes Google Maps).
Tout le dossier se dépose tel quel à la racine d'un hébergement web.

## Arborescence

```
index.html              Accueil
saint-aubin.html        Centre de Saint-Aubin
estavayer.html          Centre d'Estavayer-le-Lac
cours.html              Cours collectifs + plannings + espace membre (Gest-Fit)
coaching.html           Coaching, personal training, nutrition
abonnements.html        Tarifs (onglets par durée) + FAQ
inscription.html        Parcours d'inscription en 7 étapes
contact.html            Contacts des 2 centres + séance découverte + cartes
mentions-legales.html · confidentialite.html · cgv.html · 404.html
robots.txt · sitemap.xml
assets/css/base.css        variables de design, reset, typographie, utilitaires
assets/css/components.css  header, boutons, cartes, formulaires, footer, barre mobile
assets/css/pages.css       hero, centres, tarifs, plannings, galerie, inscription
assets/js/main.js          header sticky, menu mobile, reveal au scroll, onglets
assets/js/forms.js         validation des formulaires
assets/js/inscription.js   parcours d'inscription
assets/img/                logo + placeholders photo
```

## 1. Photos à remplacer

Tous les fichiers ci-dessous sont des **placeholders**. Garder exactement les mêmes noms de fichiers
évite toute modification du code. Format conseillé : WebP ou JPG optimisé (< 250 ko), recadrage au ratio indiqué.

| Fichier | Ratio / taille | Contenu attendu |
|---|---|---|
| `fitstyle-hero.jpg` | 1920×1080 | Image forte d'entraînement, plan large, plutôt sombre |
| `hero-saint-aubin.jpg` | 1920×900 | Vue d'ensemble du centre de Saint-Aubin |
| `hero-estavayer.jpg` | 1920×900 | Vue d'ensemble du centre d'Estavayer-le-Lac |
| `centre-saint-aubin.jpg` | 1200×800 | Salle de Saint-Aubin |
| `centre-estavayer.jpg` | 1200×800 | Salle d'Estavayer-le-Lac |
| `cours-collectifs.jpg` | 1200×800 | Cours collectif en action |
| `coaching.jpg` | 1200×800 | Coach avec un membre |
| `musculation.jpg` · `cardio.jpg` · `wellness.jpg` · `cross-training.jpg` · `espace-enfant.jpg` · `solarium.jpg` | 1000×700 | Les espaces correspondants |
| `coach-nicolas-pillonel.jpg` · `coach-yoann-bricard.jpg` | 800×1000 (portrait) | Portraits des coachs |
| `galerie-saint-aubin-1..6.jpg` | 900×700 | Galerie Saint-Aubin |
| `galerie-estavayer-1..6.jpg` | 900×700 | Galerie Estavayer |
| `og-image.jpg` | 1200×630 | Image de partage réseaux sociaux |

Logos partenaires : la section « Nos partenaires » (accueil) affiche pour l'instant les noms en texte.
Les logos officiels doivent être fournis, ainsi que la liste définitive des partenaires.

## 2. Informations à confirmer avant mise en ligne

Elles sont marquées visuellement sur le site par une étiquette jaune « À confirmer ».

1. **Horaires de la salle d'Estavayer-le-Lac** — le site actuel annonce « 24h/24 – 7j/7 » en pied de page
   et « 5h00–23h00 / 5h00–20h00 » sur la page contact. Une seule version doit être retenue.
2. **Conditions d'accès au wellness** (Saint-Aubin) — le tarif « 25.– la séance » est tronqué sur le site
   actuel : à qui s'applique-t-il exactement ?
3. **Conditions d'âge** des abonnements Kids et Étudiants · AVS/AI.
4. **Modalités de la reprise d'abonnement concurrent** (jusqu'à 3 mois).
5. **Frais éventuels** à l'inscription (carte de membre, ouverture de dossier).
6. **Coachs d'Estavayer-le-Lac** et présentation des coachs (spécialités, tarifs du personal training).
7. **Prestations nutrition** : tarifs, centres concernés.
8. **Mentions légales** : raison sociale, forme juridique, IDE, siège, responsable de publication, hébergeur.
9. **CGV et contrat d'abonnement** : textes officiels à fournir et à valider juridiquement.
10. **Durée de conservation des données** et liste définitive des sous-traitants (politique de confidentialité).

## 3. À connecter côté technique

- **Formulaires** : ajouter l'attribut `data-endpoint="/votre-script.php"` sur les balises `<form data-form>`
  (accueil et contact). Sans endpoint, le formulaire valide les champs mais n'envoie rien.
  Prévoir une protection anti-spam (honeypot ou reCAPTCHA) et un routage vers `staubin@` ou `estavayer@`
  selon le centre sélectionné.
- **Inscription en ligne** : voir les commentaires en tête de `assets/js/inscription.js`.
  - Étape 5 : générer le contrat PDF + brancher un prestataire de signature (Skribble, DeepSign…).
    La case à cocher n'est pas une signature électronique qualifiée.
  - Étape 6 : redirection vers un PSP (Stripe, Datatrans, Payrexx, Wallee) pour carte et TWINT.
    Aucune donnée bancaire ne doit transiter par ce site.
  - Étape 7 : création du membre dans Gest-Fit + e-mail de confirmation côté serveur.
- **Systèmes existants conservés** : réservation de cours et espace membre Gest-Fit (3 accès),
  boutique et bons cadeaux, site Level-Up Cross, Fitness-Guide, Facebook et Instagram.
  Aucun n'a été remplacé : le site fournit uniquement une interface d'accès plus claire.

## 4. Mise en ligne

- Remplacer `https://fit-style.ch/` si le domaine ou les chemins changent : la valeur est présente dans
  les balises `canonical`, Open Graph, les données structurées, `sitemap.xml` et `robots.txt`.
- Les sous-domaines actuels (`staubin.fit-style.ch`, `estavayer.fit-style.ch`) sont en `noindex`.
  Prévoir des redirections 301 vers les nouvelles pages :
  `staubin.fit-style.ch/*` → `fit-style.ch/saint-aubin.html`, `estavayer.fit-style.ch/*` → `fit-style.ch/estavayer.html`,
  `…/tarifs` → `/abonnements.html`, `…/horaires-cours` → `/cours.html`, `…/contact` → `/contact.html`,
  `…/coaching` → `/coaching.html`.
- Configurer la page d'erreur 404 du serveur sur `404.html`.
- Soumettre `sitemap.xml` dans la Search Console et mettre à jour les deux fiches Google Business Profile
  (une par centre) avec les nouvelles URL de page centre.

## 5. Performance

- Images en WebP/AVIF, dimensions `width`/`height` déjà présentes dans le HTML (évite le CLS).
- `loading="lazy"` sur tout ce qui est sous la ligne de flottaison, `fetchpriority="high"` sur l'image de hero.
- Polices : actuellement chargées depuis Google Fonts. Pour supprimer les requêtes tierces (et simplifier
  la conformité LPD), auto-héberger les `.woff2` d'Archivo et Inter dans `assets/fonts/` avec `font-display: swap`.
- Aucune librairie JS externe : environ 8 ko de JavaScript au total, chargé en `defer`.

## 6. Ce qui n'a pas pu être vérifié

Le rendu n'a pas été testé dans un navigateur réel : la mise en page a été contrôlée de manière statique
(structure HTML valide, liens et ancres vérifiés, JSON-LD valide, grilles fluides sans largeur fixe).
Un contrôle visuel sur mobile, tablette et desktop reste à faire, ainsi qu'une mesure Lighthouse
une fois les vraies photos en place.
