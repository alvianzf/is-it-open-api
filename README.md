# is-it-open-api

This API auto seeds data from https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/f1c3084250b1cb263198e433ae36ba8d7a0d9ea9/hours.csv

> ### Base URL = https://be-todo.herokuapp.com/

To clean the seeded collection, use
> `/seed/deleteseed`

To re-seed the collection, use
> `/seed/once`  
  

-----
## Restaurants
### Get all restaurants
`/restaurant`

> queries available:  
> limit= limits the return to a set number of data  
> offset= offsets the data
>  
>  `/restaurant?limit=${limit}&offset=${offset}`

---
### Get a restaurant by id

`/restaurant/:id`

> queries available:  
> limit= limits the return to a set number of data  
> offset= offsets the data
>  
>  `/restaurant/:id?limit=${limit}&offset=${offset}`

---
### Get restaurants by name

`/restaurant/name/:name`

> queries available:  
> limit= limits the return to a set number of data  
> offset= offsets the data
>  
>  `/restaurant/name/:name?limit=${limit}&offset=${offset}`

---
### Get restaurants by time

`/restaurant/time/:time`

> queries available:  
> day= Day on a 3 letter format (Mon, Tue, Wed, Thu, Fri, Sat, Sun) 
>  
>  `/restaurant/time/:time?day=${day}`

Time is in seconds, so need to convert hours and minutes to hours from a **24 Hour Format**

---
### Updates a restaurant

`/restaurant/:id`

> Body format:
> `{ name: ${name}, time: [{day: ${day}, start: ${start}, end: ${end}}]}`
>  
>  `/restaurant/:id`

---
### Deletes a restaurant 

`/restaurant/:id`

> queries available:  
>  `/restaurant/:id`

----
## Favorites
### Get all favourites
`/favourites

> queries available:  
> limit= limits the return to a set number of data  
> offset= offsets the data
>  
>  `/favourite?limit=${limit}&offset=${offset}`

---
### Get a favourite by id

`/favourite/:id`

> queries available:  
> limit= limits the return to a set number of data  
> offset= offsets the data
>  
>  `/favourite/:id?limit=${limit}&offset=${offset}`

---
---
### Updates a favourite

`/favourite/:id`

> Body format:
> `{ name: ${name}, list: [${restaurant_id}, ${restaurant_id}]`
>  
>  `/favourite/:id`

---
### Deletes a favourite 

`/favourite/:id`

> queries available:  
>  `/favourite/:id`
