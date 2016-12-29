//PROPERTIES
Meteor.publish("properties.result", function (queryParams){
  check(queryParams.type, String);
  check(queryParams.matchSearch, String);
	return Properties.find({type: queryParams.type,
        $or : [ {address: {$regex: queryParams.matchSearch, $options: 'i'}},
                {zipcode: {$regex: queryParams.matchSearch, $options: 'i'}},
                {city: {$regex: queryParams.matchSearch , $options: 'i'}}]},
        {fields: {'name':1, 'address': 1, 'price' : 1, 'images' : 1}});
});

Meteor.publishComposite("properties.byId", function (id){
	return {
		find: function () {
		return Properties.find({_id: id});
		},
		children: [
			{
				find: function (property) {
					return Comments.find({
						propertyId: property._id
					});
				}
			}
		]
	}
});

//USERS
Meteor.publish("currentUser", function (id){
	check(id, String)
	return Users.find({_id : id}, {fields : {favorites: 1}});
})
