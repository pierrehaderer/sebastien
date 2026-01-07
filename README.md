# Site Dépannage Informatique

Site web statique HTML/CSS/JavaScript pour un service de dépannage informatique.

## Structure du projet

```
.
├── index.html      # Page principale
├── styles.css      # Feuille de style
├── script.js       # Scripts JavaScript
└── README.md       # Ce fichier
```

## Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation avec menu mobile
- ✅ Sections de services détaillées
- ✅ Animations au scroll
- ✅ Design moderne et professionnel

## Personnalisation

### Modifier les informations de contact

Ouvrez `index.html` et modifiez la section contact (lignes ~250-270) :
- Email
- Téléphone
- Adresse
- Horaires

### Modifier les couleurs

Ouvrez `styles.css` et modifiez les variables CSS en haut du fichier :
```css
:root {
    --primary-color: #2563eb;    /* Couleur principale */
    --secondary-color: #1e40af;  /* Couleur secondaire */
    --text-color: #1f2937;        /* Couleur du texte */
    /* ... */
}
```

### Ajouter une image en haut de la page

1. Placez votre image dans un dossier `images/`
2. Dans `index.html`, ajoutez avant le titre hero :
```html
<img src="accueil.jpg" alt="Description" class="hero-image">
```
3. Dans `styles.css`, ajoutez :
```css
.hero-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    display: block;
}
```

## Déploiement

### Option 1 : Hébergement simple (Netlify, Vercel, GitHub Pages)

1. Créez un compte sur Netlify, Vercel ou GitHub
2. Uploadez tous les fichiers du projet
3. Le site sera accessible immédiatement

### Option 2 : Hébergement traditionnel (cPanel, FTP)

1. Connectez-vous à votre hébergeur via FTP
2. Uploadez tous les fichiers dans le dossier `public_html` ou `www`
3. Le site sera accessible via votre domaine

### Option 3 : Serveur local

Ouvrez simplement `index.html` dans votre navigateur ou utilisez un serveur local :
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## Compatibilité navigateurs

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Le site est entièrement statique, aucun serveur backend n'est nécessaire
- Toutes les animations sont en CSS pur et JavaScript vanilla
- Le design est responsive et s'adapte à tous les écrans
- Vous pouvez facilement ajouter d'autres pages en créant de nouveaux fichiers HTML

## Support

Pour toute question ou modification, n'hésitez pas à modifier les fichiers selon vos besoins.

