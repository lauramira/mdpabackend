//PROPERTIES
Meteor.publish("properties.result", function (queryParams){

  // if (queryParams.type && queryParams.matchSearch){
  //   check(queryParams.type, String);
  //   check(queryParams.matchSearch, String);
  // 	return Properties.find({propertyType: queryParams.type,
  //         $or : [ {address: {$regex: queryParams.matchSearch, $options: 'i'}},
  //                 {zipcode: {$regex: queryParams.matchSearch, $options: 'i'}},
  //                 {city: {$regex: queryParams.matchSearch , $options: 'i'}}]},
  //                 {fields: {'name':1, 'address': 1, 'price' : 1, 'images' : 1,
  //                 'area': 1}});
  // }

   if (queryParams.lat && queryParams.lng && queryParams.type){
     var properties = Properties.aggregate([
       {
         $geoNear: {
            near: {
                type: "Point",
                coordinates: [41.3903565, 2.1941694 ] },
            distanceField: "distance",
            maxDistance: 3000,
            num: 10,
            spherical: true
         }
       },
       {
           $match: {propertyType: "sale"}
       }
    ]).map(function(property) { return property._id });

      return Properties.find({_id: {$in: properties}})
  }
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
  if (id){
    check(id, String)
    return Users.find({_id : id}, {fields : {favorites: 1}});
  }
});

Meteor.publishComposite("properties.favoritesByUser", function (id){
	return {
		find: function () {
		return Users.find({_id: id}, {fields: {}});
		},
		children: [
			{
				find: function (user) {
          if (user.favorites){
            return Properties.find(
              {'_id' : { $in : user.favorites }},
              {fields: {'name':1, 'address': 1, 'price' : 1, 'images' : 1,
              'area': 1}});
          }
				}
			}
		]
	}
});
