Template.properties.onCreated(function propertiesOnCreated(){
});

Template.properties.helpers({
	results: function (){
		return Properties.find({});
	},

	userLogged: function(){
		return Meteor.userId();
	},

	isFav: function () {
		return Users.findOne({favorites: this._id});
	},

	emptyList: function(){
		return Properties.find({}).fetch().length === 0;
	}
});

Template.properties.events({
	'click #show': function () {
		Meteor.call("properties.incViews", this._id, (err, res) => {
				FlowRouter.go('/property/'+ this._id);
		});

	},

	"click #addRemoveFav" : function (event, template){
		event.preventDefault();
		Meteor.call("properties.addRemoveFav", this._id, Meteor.userId(), (err, res) => {
		});
	}
});
