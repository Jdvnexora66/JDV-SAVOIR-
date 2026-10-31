# JDV Savoir+

Plateforme éducative web et mobile-first pour apprendre, réviser et accéder aux ressources pédagogiques au Bénin.

## Stack
- React + TypeScript + Vite
- Supabase JS client configuré par variables d’environnement
- Interface responsive avec manifeste PWA

## Démarrage local
1. Installer Node.js 20+
2. `npm install`
3. Copier `.env.example` vers `.env.local` et renseigner l’URL Supabase et la clé anon publique
4. `npm run dev`
5. Vérifier la compilation avec `npm run build`

## Modules UI initiaux
Tableau de bord, Examens & Concours, Cours & Formations, Annales & Corrigés, Bibliothèque, Téléchargements, Achats, Profil et Paramètres.

## Principes
Les statistiques, contenus, documents, disponibilités et tarifs doivent provenir des sources réelles et autorisées. Les contenus en brouillon ne doivent pas être présentés comme officiels. Les paiements et l’assistant IA ne sont pas activés dans ce premier lot.

## Roadmap
1. Authentification et rôles Supabase
2. Raccordement des cours, leçons, exercices et évaluations
3. Catalogue examens/annales et fichiers autorisés
4. Parcours enseignant et administration pédagogique
5. Assistant IA ancré sur les ressources consultables
6. Abonnements et paiements via fournisseur vérifié
7. Tests de sécurité, PWA/mobile et déploiement