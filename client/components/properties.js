Template.properties.onCreated(function propertiesOnCreated(){
});

Template.properties.helpers({
	results: function (){
		return Properties.find({});
	},

	userLogged: function(){
		return Meteor.userId();
	}
});

Template.properties.events({
	'click #show': function () {
		debugger;
		FlowRouter.go('/property/'+ this._id);
	}
});
