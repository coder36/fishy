# Pairing Exercise

Write a react web application, which lets a fish exporter search for a fish species. We're looking for a input field, 
and submit button, which when pressed will return back a list of matching species.

Typing in a scientific name eg. `Gadus`  would return all species, matching the word gadus:

```
FAO Code   |   Common Name   | Scientific name
----------------------------------------------
COD        |  Atlantic cod   | Gadus morhua
```   

If you get time, update the app, so the list is returned back in real time as the user types.

---


We've provided you with a search api, which you can start up by running:

```
node server.js
```

This will open a server listening on port 5001:

```
> curl http://localhost:5001/api/species/search?query=gadus

[{"name":"Atlantic cod","fao_code":"COD","scientific_name":"Gadus morhua"}]
```



### Tasks

1) Understand the API

2) Create a boilerplate react app (https://github.com/facebook/create-react-app)

3) Write the app

4) Make it look nice

5) Make it search in real time as you type

6) How would you test this ?

7) How could you get this to work if javascript was disabled ?



### Help

##### Creating a React app

Make sure your version of node is >8.9.4
```
npm i create-react-app -g
create-react-app fishfinder
cd fishfinder
npm start
```

Go to http://localhost:3000


##### Example of calling an API using fetch:

```
async function fetchGET(url) {
    const options = {
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        },
    };
    const resp = await fetch(url, options);
    return await resp.json();
}

fetchGET('http://localhost:5001/api/species/search?query=gadus')

```


### Links

[List of common species codes for fish landed in the United Kingdom](https://www.gov.uk/government/publications/buyers-and-sellers-of-first-sale-fish-and-submission-of-sales-notes/list-of-common-species-codes-for-fish-landed-in-the-united-kingdom)

[Create react app](https://github.com/facebook/create-react-app)






 
