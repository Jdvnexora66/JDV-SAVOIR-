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

## Source de vérité et synchronisation (JDV Savoir+)
- Dépôt GitHub dédié: `Jdvnexora66/JDV-SAVOIR-`; projet Supabase: `veqmwnobwteqyiottrmw` (`jdv-savoir-plus`, eu-west-1). Ne jamais utiliser le projet Supabase NEXORA pour cette application.
- Le schéma Supabase est la référence d’exécution. Régénérer `src/database.types.ts` depuis le schéma après chaque migration et commiter le fichier avec la migration correspondante.
- Toute modification de schéma doit être versionnée dans `supabase/migrations/`; comparer les versions GitHub et Supabase avant déploiement.
- Les catalogues n’affichent que les ressources publiées et vérifiées. Les données d’exemple et libellés statiques ne doivent pas être présentés comme contenus disponibles.
- Compteurs, catalogues, profils, achats et progressions doivent provenir de leurs tables/RPC Supabase autorisées. Les libellés UI restent du texte d’interface, pas des données métier.
- Contrôles avant publication: `npm run typecheck`, `npm run build`, navigation/hash, RLS/security advisors, responsive mobile et comparaison des migrations.
