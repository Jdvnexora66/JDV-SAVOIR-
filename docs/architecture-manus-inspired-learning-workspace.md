# Architecture de l’espace documentaire et de recherche IA — JDV SAVOIR+

## Objectif
S’inspirer des concepts publics de Manus (projets avec instructions persistantes, fichiers/sources attachés, tâches autonomes, recherche multi-source et livrables) sans copier son interface ni dépendre obligatoirement de son service. JDV SAVOIR+ reste une plateforme éducative indépendante, avec des sources vérifiables, une bibliothèque de PDF et des réponses pédagogiques ancrées dans les contenus autorisés.

## Ce que nous retenons de Manus
- Espace de travail par projet, avec instructions réutilisées dans les tâches suivantes.
- Référentiel de fichiers et de pages web attaché au projet.
- Tâches de recherche et de traitement de documents pouvant produire des livrables.
- Compétences/workflows réutilisables et connecteurs optionnels.
- Permissions séparant contexte partagé et tâches privées.
- API v2 : projets, tâches, fichiers, webhooks et agents configurables.

Sources publiques consultées :
- https://www.manus.im/features/projects
- https://open.manus.ai/docs/v2/introduction
- https://open.manus.ai/docs/v2/data-integrations-overview
- https://help.manus.im/en/articles/11711128-what-are-the-differences-between-chat-mode-and-agent-mode
- https://help.manus.im/en/articles/14753565-how-to-share-and-use-skills-in-manus

## Adaptation à JDV SAVOIR+

### 1. Espace de travail par parcours
Créer des espaces structurés par pays, niveau, classe, matière, examen ou projet pédagogique. Chaque espace contient des instructions pédagogiques, sources qualifiées, fichiers PDF autorisés et versions, tâches/recherches, livrables et membres autorisés.

### 2. Sources et documents
Chaque ressource conserve : titre, type, niveau/classe, matière, année/session, organisme/auteur, URL source, date de consultation, chemin Storage privé, empreinte SHA-256, taille/MIME/version, droits/licence, statut de vérification et vérificateur, pages extraites/OCR, et liens vers cours/examens/matières.

Cycle de publication : discovered → imported → parsing → review → verified → published, avec états d’échec/rejet explicites. Aucun document n’est rendu public uniquement parce qu’il a été trouvé ou importé.

### 3. Recherche documentaire ancrée
1. Rechercher dans les sources autorisées et documents accessibles.
2. Importer côté serveur avec limites de taille/MIME et analyse de sécurité.
3. Extraire le texte et les pages PDF, OCR pour les scans.
4. Découper en passages en conservant ressource, page, URL, titre et version.
5. Indexer dans Supabase (recherche plein texte; embeddings si fournisseur configuré).
6. Récupérer selon utilisateur, droits, niveau, matière et espace.
7. Générer une réponse uniquement à partir des passages retenus.
8. Afficher les citations cliquables vers document, page et source; signaler les lacunes.
9. Enregistrer tâche, sources, réponse et livrables.

### 4. Livrables
Résumé structuré, fiche de révision, exercices/corrigés à valider, comparatif de sources, rapport de recherche cité et PDF téléchargeable. Chaque livrable garde sa tâche, ses sources, date, version du modèle et statut de vérification.

### 5. Architecture technique
- Frontend React : Recherche & Documents, panneau Sources, lecteur PDF paginé, tâches et livrables.
- Supabase Auth + RLS : isolation utilisateur/organisation/espace; contrôle serveur.
- Supabase Storage privé : originaux et livrables, URLs signées courtes.
- Tables à ajouter/compléter : knowledge_workspaces, workspace_members, workspace_sources, document_versions, document_pages, document_chunks, research_tasks, research_task_sources, research_outputs.
- Edge Functions : ingest-document, parse-document, search-knowledge, run-research-task, generate-document-output.
- Fournisseur IA abstrait; clés côté serveur, quotas, logs, retries et limites de coûts.
- Indexation textuelle d’abord; embeddings après validation des coûts et migration.
- Tâches asynchrones avec statuts, reprise idempotente et erreurs visibles.

### 6. Sécurité et qualité
- Ne jamais exposer service-role ou clés IA dans le navigateur.
- RLS sur toutes les tables exposées et contrôle d’accès dans les fonctions serveur.
- Vérifier l’accès avant lecture des fichiers/passages.
- Limiter type/taille, analyser les uploads, traiter les PDF comme contenu non fiable.
- Respecter droits/licences : lien externe ou métadonnées seules si copie non autorisée.
- Distinguer source trouvée, contenu extrait, vérifié et publié.
- Réponses avec citations de pages exactes; signaler l’absence de source fiable.
- Tests RLS multi-utilisateurs, citations, PDF corrompus, OCR, quotas, suppression et signed URLs.

## Ordre de réalisation
1. Auditer le schéma et réutiliser academic_resources, resource_sources, exam_sessions, exam_documents, courses et le bucket documentaire.
2. Concevoir les migrations workspaces, versions, pages/chunks, tâches et livrables sans dupliquer le catalogue.
3. Implémenter ingestion PDF et provenance; brouillon par défaut.
4. Ajouter lecteur PDF et citations de source/page dans la bibliothèque.
5. Ajouter recherche documentaire ancrée.
6. Ajouter tâches de recherche et livrables téléchargeables.
7. Ajouter OCR et recherche sémantique après validation des coûts/fournisseur.
8. Tester RLS, Storage, mobile et production avant publication.

## Décisions
- Ne pas rendre Manus API obligatoire : JDV conserve ses données et son fonctionnement indépendants.
- Ne pas importer des PDF tiers sans validation des droits.
- Enrichir le catalogue existant, conserver les URLs sources et éviter les doublons.
- État connu à revalider à l’implémentation : 120 ressources académiques, 161 cours, 15 sessions CEP.

## Portée de cette première étape
Ce document formalise l’étude et la conception. Il ne prétend pas que les nouvelles fonctions sont déjà codées ou déployées.