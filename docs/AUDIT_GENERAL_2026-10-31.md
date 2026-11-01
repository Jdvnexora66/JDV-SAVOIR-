# Audit général — JDV Savoir+

**Date :** 31 octobre 2026  
**Périmètre :** dépôt GitHub `Jdvnexora66/JDV-SAVOIR-`, application React/Vite, projet Supabase `veqmwnobwteqyiottrmw`, configuration Netlify et état des données.  
**Nature :** audit technique et fonctionnel à distance. Les tests visuels réels sur appareils, parcours utilisateur complets avec comptes de test et vérification du déploiement public restent à exécuter.

## Synthèse exécutive

Le socle applicatif compile et dispose d'un schéma Supabase structuré, de RLS sur les tables du schéma public et de contenus pédagogiques déjà chargés. En revanche, **JDV Savoir+ n'est pas encore prêt pour une ouverture commerciale ou une exploitation pédagogique complète** : les données CEP/annales sont absentes des tables d'examens, les rôles de staff ne sont pas initialisés, les achats/paiements sont sans transactions, les fonctions Edge sont absentes et plusieurs modules sont explicitement des interfaces en attente.

**État global :** socle technique en développement avancé, mais mise en production fonctionnelle partielle.

## Éléments vérifiés

### Code et livraison
- React + TypeScript + Vite; scripts de build et typecheck présents.
- CI GitHub sur le commit de fusion `54336fdb0d85bba20755e99fc859f59621877d13` : **succès** (installation, TypeScript, build).
- Correction récente : Classes et Évaluations utilisent désormais l'espace enseignant existant au lieu de la carte « en raccordement ».
- Projet Netlify `jdv-savoir-plus` trouvé; le connecteur indique un déploiement courant, mais n'a pas exposé de détails suffisants pour certifier le contenu exact publié.
- Le README reconnaît encore plusieurs modules comme maquettes; il doit être mis à jour au fur et à mesure de l'activation réelle.

### Données Supabase observées
Toutes les tables recensées dans le schéma `public` ont RLS activé.

| Domaine | État observé |
|---|---|
| Référentiel scolaire | 13 niveaux, 13 matières, 7 domaines, 93 programmes, 28 institutions |
| Catalogue de cours | 161 cours, 775 leçons |
| Exercices / évaluations | 30 exercices, 30 évaluations et 30 clés de correction |
| Ressources académiques | 120 ressources; les 120 sont marquées vérifiées et publiées |
| Examens | 4 types d'examens, mais 0 session et 0 document d'examen |
| Concours | 0 session et 0 document |
| Rôles staff | 0 ligne dans `admin_roles` |
| Apprentissage utilisateur | 0 inscription, 0 progression et 0 tentative de quiz |
| Commerce | 0 produit, 0 commande, 0 achat de document |
| Abonnements / paiements | 0 plan, 0 abonnement et 0 paiement |
| Edge Functions | Aucune fonction déployée sur le projet |

Le statut « vérifié/publié » est une métadonnée de workflow; il ne remplace pas une revue humaine de l'exactitude, des droits de diffusion, de la source et de la qualité du PDF.

## Risques et écarts prioritaires

### P0 — avant ouverture au public
1. **Initialiser les rôles staff** avec des comptes identifiés et contrôlés; la table est actuellement vide, donc les consoles protégées ne peuvent pas être utilisées par un administrateur/enseignant autorisé.
2. **Compléter le catalogue d'examens** : aucune session ni aucun PDF d'annales n'est enregistré. L'inventaire CEP 2012–2025 ne peut donc pas afficher de disponibilité réelle.
3. **Clarifier et sécuriser les parcours d'accès** : tester Auth, confirmation e-mail, récupération de mot de passe, redirections et accès direct aux routes protégées avec comptes apprenant/enseignant/admin.
4. **Activer la protection contre les mots de passe compromis** dans Supabase Auth.
5. **Vérifier le déploiement de production** et effectuer un smoke test sur le domaine public après chaque fusion.

### P1 — avant exploitation pédagogique
6. Tester intégralement les parcours enseignant : création/modification de classes, évaluations, affectation et lecture des résultats; confirmer les politiques RLS correspondantes avec des comptes de rôles distincts.
7. Vérifier la cohérence des 161 cours, 775 leçons, 30 exercices/évaluations et 120 ressources : sources, niveau, matière, fichier, droits, visibilité et liens.
8. Vérifier les buckets Storage, les politiques de lecture/téléchargement, les URLs signées et l'absence de fichiers privés accessibles publiquement.
9. Remplacer les contenus statiques d'interface et les cartes génériques par des états issus de Supabase, ou les signaler explicitement comme exemples/à venir.
10. Ajouter tests automatisés des parcours critiques (Auth, catalogue, téléchargement, quiz, permissions) et tests responsive sur petits écrans.

### P2 — avant monétisation
11. Intégrer un fournisseur de paiement compatible avec le marché visé; vérifier signatures/webhooks, idempotence, rapprochement, reçus, remboursements et accès après paiement.
12. Définir les plans et règles d'abonnement dans la base; actuellement plans, subscriptions et payments sont vides.
13. Activer les fonctions backend nécessaires à l'IA seulement après définition du fournisseur, des secrets côté serveur, des limites d'usage, de la protection des données et de l'ancrage sur les ressources autorisées.
14. Mettre en place journalisation/audit des actions sensibles et procédures de support.

### Performance et gouvernance SQL
- Les advisors Supabase signalent **40 index inutilisés** et des politiques permissives dupliquées sur certaines tables. Ne pas supprimer en masse : confirmer la charge réelle et l'usage attendu, puis traiter par migration avec mesure avant/après.
- Un avertissement reste sur la fonction `create_document_purchase` SECURITY DEFINER exécutable par `authenticated`. Cette fonction est volontairement réservée au parcours d'achat; conserver ses vérifications internes, son `search_path` vide et ses grants restreints, puis documenter le risque résiduel.
- Les tables de données personnelles et de commerce doivent être testées contre l'accès inter-utilisateurs (BOLA/IDOR), y compris via API directe, et pas seulement via l'interface.

## Points de cohérence produit

- L'interface affiche certains espaces qui sont encore des placeholders ou des modules non activés (paiements, support ticketing, certaines vues administratives). Ne pas les présenter comme pleinement opérationnels.
- Le tableau de bord doit afficher des compteurs issus de requêtes réelles et distinguer « zéro contenu » de « erreur de chargement ».
- Les parcours mobiles/PWA doivent être testés sur Android : menu, navigation hash, formulaires, lecteur PDF, téléchargement et retour arrière.
- Les pages doivent avoir des états explicites : chargement, vide, erreur, accès refusé, succès. Éviter toute donnée de démonstration pouvant être confondue avec une ressource officielle.
- Le README actuel contient des indications de maquette qui ne sont pas totalement alignées avec les fonctions déjà connectées; actualiser cette documentation après validation des parcours.

## Plan de stabilisation recommandé

1. Rôles staff et test d'accès/RLS.
2. Ingestion contrôlée des annales CEP/BEPC/BAC/concours avec métadonnées, droits et vérification.
3. Validation fonctionnelle du catalogue cours/ressources et des téléchargements.
4. Tests enseignant, quiz, résultats et progression.
5. Smoke test production + responsive mobile.
6. Paiements et IA en dernier, derrière feature flags et contrôles serveur.

## Limites de cet audit

Cet audit est fondé sur le code source, les migrations, les métadonnées Supabase, les advisors et les résultats CI accessibles. Il ne constitue pas une certification de sécurité ni une validation visuelle exhaustive. Aucun paiement réel, aucune modification destructive de base et aucune activation de fournisseur externe n'ont été effectués.
