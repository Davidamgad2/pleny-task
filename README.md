# Project Name
pleny Data Engineer freelance task

## Installation
please note that you will need to install mongodb and make a db called pleny

node version: v20.11.1
npm version: 10.2.4
mongodb version: 7.0.7
mongosh: 2.2.2

after this you will need to use this command to import the corrupted data first 

```
mongoimport --db pleny --collection brands --file ./public/brands.json --jsonArray;
```

install dependenices after this 

```
npm i 
```


after this we will need to run the server 

```
npm run start 
```

