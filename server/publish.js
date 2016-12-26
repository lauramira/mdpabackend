Meteor.publish("properties.result", function (queryParams){
  check(queryParams.type, String);
  check(queryParams.matchSearch, String);
	return Properties.find({type: queryParams.type}, {fields: {'name':1, 'address': 1, 'price' : 1, 'images' : 1}});
})
