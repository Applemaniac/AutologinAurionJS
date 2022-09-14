# Autologin Wifi AurionJS

Ce projet a été développé par un élève de l'ISEN pour se connecter au wifi de l'ISEN. Le but de ce projet est de se connecter automatiquement au wifi JUNIA_STUDENTS. Il se base sur un script NodeJS et sous Linux

Pour l'installer il suffit de taper la commande suivante dans le répertoire

```console
npm install
```

Et modifier le configDemo.js en le renommant config.js et en le complétant.

Maintenant il faut créer un lien vers ce script depuis le répertoire utilisateur :

```bash
ln -s auto.js ~/auto.js
```

Puis rechercher 'Applications au démarage' et ajouter un ! 
![Applications au démarage](https://user-images.githubusercontent.com/14615427/190110508-5264149f-5873-4066-b66f-7a010cb155c6.png)

Puis ajouter une nouvelle régle :

![Modifier la règle](https://user-images.githubusercontent.com/14615427/190110515-f28fc4d6-6209-434f-9a92-cb897e7d7130.png)

Et voilà !
