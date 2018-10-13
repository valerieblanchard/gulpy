# Créer un thème WP avec Gulp

Utiliser un Starter thème intégrant l'utilisation de Gulp pour gérer les fichiers sass, js, img et bénéficier d'un livereload.

## Gulpy

`gulpy` est un starter thème construit à partir du starter theme `_s` en version Sass.

Il a subit quelques modifications de fichiers afin d'y inclure l'utilisation de Gulp pour améliorer le flux de travail pendant la phase de développement du thème.  
Le layout `content-sidebar` a été ajouté à la feuille de style principale, et peut être modifié pour `sidebar-content`

`gulpy` contient un dossier ressources `/src/assets/` regroupant les fichiers sass, js et img afin d'automatiser via Gulp des tâches relatives au développement.  
Ce dossier ne sert que pendant la phase de développement et permet de générer à la racine du thème un dossier `/assets/` pour la prod.

Les tâches se situent au niveau :

*  de la visualisation du thème en front
    *  utilise un live reload avec BrowserSync.
*  des styles :
    *  convertit des scss en css,
    *  ajoute des vendors prefixes
    *  met à disposition les css en version non compressée `main.css` et en version minifiée `main.min.css`
    * génère un sourcemaps pour `main.css.map`
*  des scripts :
    *  sépare les scripts js en "catégories" : appcustom, condcustom, vendor
    *  concatène les js qui peuvent l'être = les js dans /appcustom
    *  met à disposition les js en version non compressée et en version minifiée
*  des images :
    *  optimise le poids des images en png, jpg, gif, svg
*  de la traduction :
    *  génère un fichier .pot : à utiliser une fois le thème développé.

### Structure du thème Gulpy

*  Les templates de base : header.php, index.php etc ...
*  Un dossier sources `/src/assets/` contenant :
    *  `img/`
        * image.jpg ou .png ou .gif ou .svg
    *  `js/`
        *  `appcustom/` : des js, qu'on souhaite concaténer pour la prod sous `appcustom.js` et qui seront chargés dans le footer.
        *  `vendor/` : des js venant de librairies externes.
        *  `condcustom/` : des js devant être intégrés dans wp sous conditions donc ne devant pas être concaténés avec d'autres.
    +  `sass/`
        *  des dossiers contenant des partials sass
        *  `_normalize.scss`_ : sous forme de partial
        *  `main.scss` : le fichier css principal

### Fichiers relatifs à Gulp

Les fichiers suivants permettent de configurer l'utilisation de Gulp dans le thème.

*  package.json
*  gulfile.js

## Installation du thème Gulpy

Importer le thème dans son installation WordPress :

`cd wp-content/themes`

`git clone https://github.com/valerieblanchard/gulpy.git`

En l'état le thème ne fonctionnera pas correctement, il faut utiliser Gulp pour générer à la racine du thème le dossier assets contenant les fichiers à utiliser en production.

## Utilisation de Gulp

### 1 - Pour commencer

Adapter dans le fichier `gulpfile.js` au niveau de TASK WATCH l'url du projet qui doit correspondre à la votre, pour béneficier de la fonctionnalité BrowserSync.

```
// Project URL.
    proxy: 'https://gulpy.local', // Change it for your url !!!
```

### 2 - Installer les modules

Les modules nécessaires à l'utilisation de Gulp sont installés via NPM : le gestionnaire de paquets de Node.js

La liste des dépendances du projet sont stockées dans le fichier `package.json`

Lancer l'installation des modules : `npm install`

### 3 - Générer les fichiers à utiliser  dans le thème

Générer le dossier `assets` à la racine du thème à partir des fichers sources `/src/assets` en lançant :

`gulp build`

**NB:** Aucune modification ne doit se faire au niveau du dossier `/assets`. Il ne faut intervenir que sur le dossier des assets sources : `/src/assets`, les assets pour la prod seront réactualisés en permanence via un `gulp watch`.

### 4 - Surveiller les modifications de fichiers du thème

La surveillance s'effectue sur les modifications dans :

*  /src/assets
*  les différents fichiers .php

avec la commande watch qui est aussi la tâche gulp par défaut :

`gulp watch` ou `gulp`

### 5- Création du fichier de traduction du thème

Une fois les différents templates du thème en place, générer un fichier .pot qui remplacera celui déjà en place :

`gulp translate`

Utiliser le gulpy.pot ensuite dans Poedit pour générer les .mo et .po

## Changer le nom du thème

Si vous souhaitez constuire un site avec ce starter thème, utilisez un "find and replace" pour changer le nom 'gulpy' par le votre dans tous les fichiers. Votre recherche du mot doit se faire en **respectant la casse**.

Le mot gulpy figure :

*  dans les entêtes des templates avec une majuscule "Gulpy"
*  en tant que text domain et dans les fonctions pour les préfixer en minucule "gulpy"
*  en tant que constante "GULPY"
*  le nom du fichier .pot "gulpy.pot"
*  le gulfile.js "gulpy" et "Gulpy"
