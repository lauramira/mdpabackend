var properties = [
  {
    "name": "piso 1",
    "description": "description 1",
    "address": "Street demo, 1",
    "zipcode": "08010",
    "city": "Barcelona",
    "price": 335000,
    "propertyType": "sale",
    "views": 9,
    "location": {
        "type": "Point",
        "coordinates": [
            41.3870154,
            2.1700471
        ]
    },
    "area": 20,
    "owner": {
        "name": "Pepita",
        "mail": "pepita@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/01.jpg",
        "/images/02.jpg"
    ]
},
{
    "name": "piso 2",
    "description": "description 2",
    "address": "Street demo, 2",
    "zipcode": "08010",
    "city": "Barcelona",
    "price": 500,
    "propertyType": "rental",
    "views": 4,
    "location": {
        "type": "Point",
        "coordinates": [
            41.5870154,
            2.1100471
        ]
    },
    "area": 20,
    "owner": {
        "name": "Antonio",
        "mail": "antonio@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/02.jpg",
        "/images/01.jpg"
    ]
},
{
    "name": "piso 3",
    "description": "description 1",
    "address": "Street demo, 3",
    "zipcode": "08020",
    "city": "Badalona",
    "price": 125000,
    "propertyType": "sale",
    "views": 1,
    "location": {
        "type": "Point",
        "coordinates": [
            41.1870154,
            2.1700471
        ]
    },
    "area": 20,
    "owner": {
        "name": "Pepita",
        "mail": "pepita@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/01.jpg",
        "/images/02.jpg"
    ]
},
{
    "name": "piso 4",
    "description": "description 2",
    "address": "Calle demo, 2",
    "zipcode": "08340",
    "city": "Girona",
    "price": 850,
    "propertyType": "rental",
    "views": 1,
    "location": {
        "type": "Point",
        "coordinates": [
            41.3010154,
            2.9700471
        ]
    },
    "area": 20,
    "owner": {
        "name": "Antonio",
        "mail": "antonio@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/02.jpg",
        "/images/01.jpg"
    ]
},
{
    "name": "piso 5",
    "description": "Description 1",
    "address": "Calle demo, 5",
    "zipcode": "08010",
    "city": "Barcelona",
    "price": 825000,
    "propertyType": "sale",
    "views": 5,
    "location": {
        "type": "Point",
        "coordinates": [
            41.0970154,
            2.0700471
        ]
    },
    "area": 100,
    "owner": {
        "name": "Pepita",
        "mail": "pepita@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/01.jpg",
        "/images/02.jpg"
    ]
},
{
    "name": "tarea 2",
    "description": "description 2",
    "address": "Street demo, 2",
    "zipcode": "08010",
    "city": "Barcelona",
    "price": 620,
    "propertyType": "rental",
    "views": 6,
    "location": {
        "type": "Point",
        "coordinates": [
            41.6870154,
            2.1710471
        ]
    },
    "area": 20,
    "owner": {
        "name": "Antonio",
        "mail": "antonio@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/02.jpg",
        "/images/01.jpg"
    ]
},
{
    "name": "piso 7",
    "description": "description 7",
    "address": "Street demo, 7",
    "zipcode": "08010",
    "city": "Barcelona",
    "price": 110000,
    "propertyType": "sale",
    "views": 2,
    "location": {
        "type": "Point",
        "coordinates": [
            41.0870154,
            2.9700471
        ]
    },
    "area": 20,
    "owner": {
        "name": "Pepita",
        "mail": "pepita@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/01.jpg",
        "/images/02.jpg"
    ]
},
{
    "name": "piso 8",
    "description": "description 2",
    "address": "Street demo, 8",
    "zipcode": "08010",
    "city": "Barcelona",
    "price": 520,
    "propertyType": "rental",
    "views": 0,
    "location": {
        "type": "Point",
        "coordinates": [
            41.5870154,
            2.8702471
        ]
    },
    "area": 345,
    "owner": {
        "name": "Antonio",
        "mail": "antonio@hotmail.com",
        "phone": "123456788"
    },
    "images": [
        "/images/02.jpg",
        "/images/01.jpg"
    ]
}
];

if (Properties.find().count() === 0){
	_.each(properties, (item) => {
		Properties.insert(item);
	})
}

Properties._ensureIndex({"location": "2dsphere"});
