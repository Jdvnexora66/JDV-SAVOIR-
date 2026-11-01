# JDV SAVOIR+ — Plan de structuration et réconciliation

Date: 2026-11-01
Base auditée: `main` @ `00503ab355e7205ba15fb0ad4b2e5cafea519e98`
Supabase: `veqmwnobwteqyiottrmw`

## Constats confirmés

- Le dépôt contient des branches de travail divergentes de `main`; il n'existe aucun pull request ouvert au moment de l'audit.
- Certaines branches sont déjà intégrées/anciennes (compare indique `behind` sans commits propres); d'autres conservent des changements uniques.
- La branche `feat/cep-draft-inventory-admin-bootstrap` possède 2 commits propres à examiner; la branche `integration/lot4-exercices-main-2026-10-31` possède aussi 2 commits propres.
- La branche `build/admin-operational-pages-2026-10-31` possède des changements propres dans `src/AdvancedPages.tsx`.
- `feat/manus-inspired-learning-workspace` possède un document d'architecture; il faut réutiliser son contenu plutôt que le réécrire.
- `fix/secure-download-history-2026-10-31` et `audit/sync-ui-polish-2026-10-31` sont divergentes. Leur contenu doit être comparé à `main` fichier par fichier avant toute fusion.
- Supabase contient les migrations de sécurisation et de catalogue observées dans `main`. Les migrations CEP et bootstrap admin sont présentes dans le dépôt et leur application est visible dans l'historique Supabase.
- État des données consulté: 15 sessions d'examen, 12 documents d'examen (aucun publié), 161 cours publiés. Les fiches d'inventaire ne prouvent pas que les PDF réels sont présents, autorisés et vérifiés.

## Architecture cible

Conserver React + TypeScript + Vite et Supabase, mais séparer les responsabilités. Ne pas réécrire l'application d'un seul coup.

```text
src/
  app/
    App.tsx
    router/
    layouts/
    providers/
    guards/
  shared/
    components/
    hooks/
    lib/
      supabase/
      validation/
    types/
    styles/
  features/
    auth/
    learner/
      dashboard/
      courses/
      exercises/
      progress/
      results/
    teacher/
      classes/
      assignments/
      assessments/
      grading/
    library/
      catalogue/
      documents/
      sources/
      downloads/
    exams/
      cep/
      exam-packs/
    bookstore/
      products/
      checkout/
      purchases/
    administration/
      users/
      content-review/
      catalogue/
      audit/
```

## Règles de découpage

1. Une feature possède ses composants, hooks, services, types et tests.
2. Les composants UI ne font pas de requêtes Supabase directes; les accès passent par des services/hooks de feature.
3. Les types DB générés restent une source technique; les types métier sont explicites et validés.
4. Les routes sont centralisées et chaque route possède un guard d'authentification/role.
5. Les permissions réelles restent imposées par RLS et fonctions SQL; cacher un lien dans l'interface n'est pas une sécurité.
6. Les états de chargement, erreur, vide et succès sont normalisés.
7. Un bouton doit être relié à une action réelle, avec feedback et gestion d'erreur.
8. Les documents affichés comme disponibles doivent avoir une source, un statut de vérification, un droit d'accès et un chemin de stockage réel.
9. Aucun contenu de démonstration ne doit être présenté comme un document officiel ou un PDF téléchargeable.
10. La migration se fait feature par feature avec tests/build entre chaque lot.

## Plan d'exécution

### Lot 0 — Réconciliation sans perte
- Comparer les branches divergentes à `main`.
- Classer chaque commit: déjà repris, utile à cherry-pick, obsolète, conflit à résoudre.
- Vérifier que les migrations appliquées en Supabase ont leur fichier SQL dans `main`.
- Ne jamais rejouer une migration déjà appliquée; créer une migration corrective si nécessaire.
- Produire une liste de commits et fichiers réellement manquants avant fusion.

### Lot 1 — Socle
- Centraliser routes, layouts, guards, permissions et composants partagés.
- Normaliser les états loading/error/empty.
- Vérifier variables d'environnement et configuration Supabase.

### Lot 2 — Documents et examens
- Source unique de données pour catalogue, sujets, corrigés, PDF, achat et historique.
- Séparer les sessions d'examen des documents et des fichiers physiques.
- Contrôler source/rights/verification/publication avant exposition.
- CEP 2012–2025: inventaire année × matière, avec états explicites « à rechercher », « source trouvée », « fichier reçu », « vérifié », « publié ».

### Lot 3 — Espaces métier
- Élève/étudiant: cours, exercices, progression, résultats.
- Enseignant: classes, devoirs, évaluations, correction.
- Lecteur: catalogue et bibliothèque.
- Administration: validation des ressources, gestion des rôles et audit.

### Lot 4 — Qualité et livraison
- Build TypeScript/Vite, tests, contrôle des routes et permissions.
- Vérification responsive sur mobile.
- Déploiement Netlify seulement après build vert.
- Audit post-déploiement et smoke tests.

## Critères d'acceptation

- Aucun commit utile oublié et aucune fusion aveugle.
- Chaque migration appliquée correspond à un fichier versionné, ou est documentée comme exception.
- Chaque page métier utilise la source de données attendue.
- Les rôles sont validés côté serveur/RLS.
- Aucun faux PDF ou faux statut « disponible ».
- Build et tests passent avant mise en production.
