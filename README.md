# Ecoshop

Ce projet a été realiser avec Angular version 17.3.0.

# Cadre du projet

Il s'agit d'un projet de test de connaissance avec `Sayna`, qui consiste a développé une application e-commerce appelé ecoShop. Développer par `Mouhamadou MBALLO`

# Téchnologies utilisées

Pour la réalisation de ce projet, nous avons utilisés les technologies suivantes:

## Angular

Angular est un framework JavaScript, orienté frontend. Dans notre cas, nous avons utilisé la version 17. Avec notamment l'utilisation du routage, du lazy loarding, des services, des pipes ...

## Json server

C'est une base de données local , qui nous a permis de simuler le backend

## Axios

Comme on n'a pas un backend spécifique, nous avons utilisés Axios, pour faire des requetes

# Fonctionnalités

Parmis les fonctionnalités, nous pouvons citer :

## Partie admin

Avant d'y accéder il faudrait se connecter d'abord

### Produit

C'est là où on gère les produits avec les opérations de CRUD

### Commande

C'est pour la gestion des commandes et des factures

### Contact

Ca nous permet de voir les messages reçu

## Partie accueil

### Liste des produits

On voit la liste des produits et faire la commande

### Panier

C'est ici, que nous avions implémenter le panier de l'utilisateur

## Authentification

Afin de gerer nos produits et nos commandes, nous devrions nous connecter
`email : ahmedmballo7@gmail.com`, `mot de passe: 12345678`

## Contact

C'est la page de contact, au cas où l'utilisateur souhaite nous contacter

# Installation et lancement de l'application

## clonage du projet

Faites un `git clone https://github.com/kenza-02/ecoshop.git`

## Installation des dépendances

Faites un `npm install` pour installer les dépendances

## Lancer l'application

Faites un `ng serve` pour lancer l'application, puis naviguer sur `http://localhost:4200/`

## Lancer le server

Faites un `json-server --watch db.json` pour lancer le serveur
