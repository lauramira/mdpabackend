Meteor.subscribe("searchResult");

Template.result.onCreated(function resultOnCreated(){
});

Template.result.helpers({
	results: function (){
		debugger;
		return Properties.find({});
	}
});
