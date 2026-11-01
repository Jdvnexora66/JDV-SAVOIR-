# JDV SAVOIR+ — Sources CEP et CM2

> Registre de repérage. Les liens externes sont des pistes documentaires, pas des fichiers importés ni des autorisations de republication. Ne publier un document qu'après vérification du fichier, de son origine, de ses droits et de sa qualité.

## Sources institutionnelles prioritaires

| Source | Usage | Statut |
|---|---|---|
| MEMP — https://memp.gouv.bj/ | Programmes, communiqués, documents officiels du primaire | Source institutionnelle; identifier les PDF de programmes CM2 exacts |
| INFRE — https://infre-benin.org/recherche-education.html | Programmes/méthodes, ressources d'évaluation standardisées | Ressources d'épreuves standardisées CM2 repérées; vérifier le millésime et les droits avant import |
| Gouvernement du Bénin — https://www.gouv.bj/ | Communiqués officiels et calendrier CEP | Référence institutionnelle pour dates/organisation |

## Pistes d'épreuves CEP

| Source | Couverture repérée | Statut |
|---|---|---|
| PDA-BENIN — https://sites.google.com/view/pda-benin | CEP 2015–2018 signalés | Piste associative; confirmer accès aux fichiers, provenance et autorisation |
| Promouvoir Compétences — https://promouvoircompetences.com/epreuves.html | Plusieurs sujets CEP, notamment 2018 et session des malades | Catalogue de liens; vérifier chaque PDF et droits |
| Banque des Épreuves — https://www.banquedesepreuves.com/component/edocman/benin | Catalogue d'épreuves Benin, plusieurs niveaux | Source secondaire; vérifier les fichiers et conditions de réutilisation |
| Zone Révision — https://zonerevision.com/matieres/toutes-les-epreuves-dexamens-nationaux-du-certificat-detude-primaire | CEP 2021, 2022, 2023, 2025 et compilations | Certains contenus payants; ne pas copier sans autorisation/licence |

## Règles d'import

1. Conserver le titre exact, année, session, matière, niveau, source URL et date de consultation.
2. Télécharger seulement les documents accessibles légalement et dont la réutilisation est autorisée ou couverte par une licence.
3. Contrôler PDF ouvrable, pages complètes, lisibilité, doublons et correspondance année/matière.
4. Stocker le fichier dans Supabase Storage; enregistrer le chemin exact et les métadonnées dans la base.
5. Laisser `rights_status=unverified`, `verification_status=pending`, `publication_status=draft` jusqu'à vérification humaine.
6. Les liens externes peuvent être proposés comme références sans prétendre qu'un PDF a été importé.

## État de livraison

- Inventaire CEP 2012–2025 déjà créé dans la base (15 sessions, dont deux entrées en 2018).
- 12 entrées de documents d'examen préexistantes; aucun fichier PDF n'est confirmé comme stocké à ce stade.
- Les 120 ressources académiques non adossées à un fichier restent en brouillon/non vérifiées.
- Aucun document externe n'est déclaré publié par ce registre.
