var properties = [
	{
		name: "tarea 1",
		description: "description 1",
		address: "Street demo, 1",
		zipcode: "08010",
		city: "Barcelona",
		price: 125000,
		type: "venta",
		views: 0,
		location: {
			lat: 41.3870154,
			lng: 2.1700471
		},
		owner: {
			name: "Pepita",
			mail: "pepita@hotmail.com",
			phone: "123456788"
		},
		images: ["/images/01.jpg", "/images/02.jpg"]
	},
	{
		name: "tarea 2",
		description: "description 2",
		address: "Street demo, 2",
		zipcode: "08010",
		city: "Barcelona",
		price: 500,
		type: "alquiler",
		views: 0,
		location: {
			lat: 41.4870154,
			lng: 2.1500471
		},
		owner: {
			name: "Antonio",
			mail: "antonio@hotmail.com",
			phone: "123456788"
		},
		images: ["/images/02.jpg", "/images/01.jpg"]
	}
];

if (Properties.find().count() === 0){
	_.each(properties, (item) => {
		Properties.insert(item);
	})
}
