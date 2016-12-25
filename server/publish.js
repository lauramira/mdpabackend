Meteor.publish("searchResult", function (queryParams){
  check(queryParams.type, String);
  check(queryParams.matchSearch, String);
	return Properties.find({type: queryParams.type}, {name: 1, address: 1, price: 1, mainImage: 1});
})
