# JDV Savoir+

Plateforme éducative web et mobile-first pour les apprenants, enseignants et équipes pédagogiques au Bénin.

## Stack
- React + TypeScript + Vite
- Supabase JS client via variables d’environnement
- Interface responsive et manifeste PWA
- UI en français, identité visuelle bleu nuit / bleu royal / or

## Démarrage local
1. Installer Node.js 20+
2. `npm install`
3. Copier `.env.example` vers `.env.local` et renseigner l’URL Supabase et la clé anon publique
4. `npm run dev`
5. Vérifier la compilation avec `npm run build`

## Interfaces présentes
- Tableau de bord apprenant et navigation générale
- Examens & Concours, Cours & Formations, Annales & Corrigés, Bibliothèque
- Téléchargements, Achats, Profil, Paramètres
- Exercices & Évaluations, Résultats, lecteur PDF
- Inscription, connexion, récupération/réinitialisation du mot de passe (maquettes UI)
- Espace enseignant et console d’administration (maquettes UI)
- Assistant pédagogique IA (maquette UI)
- Abonnements/paiements (maquette UI, aucun paiement actif)
- Accueil public et support

## Important
Les interfaces sont un socle de développement, pas une homologation fonctionnelle. Authentification, rôles, données, fichiers, publication, IA et paiements doivent être raccordés et testés avant activation. Les statistiques, contenus, documents, disponibilités et tarifs doivent provenir de sources réelles et autorisées. Les contenus en brouillon ne doivent pas être présentés comme officiels.

## Suite technique
1. Configurer Supabase Auth, profils, rôles et politiques RLS
2. Connecter les modules pédagogiques et catalogues
3. Vérifier les fichiers et autorisations de diffusion
4. Développer les workflows enseignant et administration
5. Ancrer l’assistant IA sur les ressources accessibles
6. Intégrer un fournisseur de paiement vérifié et les reçus
7. Exécuter tests de build, sécurité, mobile et déploiement