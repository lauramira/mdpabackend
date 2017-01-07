Template.favorites.onCreated(function propertiesOnCreated(){
	var sortObject = {};
	sortObject['price'] = 1;
	this.results = new ReactiveVar(Properties.find({}, {sort: sortObject}));
});

Template.favorites.helpers({
	results: function (orderByValue, orderDirection) {
		return Template.instance().results.get();
	},

	userLogged: function() {
		return Meteor.userId();
	},

	emptyList: function(){
		return Properties.find({}).fetch().length === 0;
	},

	orderOptionsList: function() {
		orderOptions = [];
		orderOptions.push({name: "- Price", value: "1_price"});
		orderOptions.push({name: "+ Price", value: "-1_price"});
		orderOptions.push({name: "+ Area", value: "-1_area"});
		orderOptions.push({name: "- Area", value: "1_area"});
		return orderOptions;
	},

  isCurrentUser: function () {
    return Meteor.userId() && Meteor.userId() === FlowRouter._current.params.id;
  }
});

Template.favorites.events({
	'click #show': function () {
		Meteor.call("properties.incViews", this._id, (err, res) => {
				FlowRouter.go('/property/'+ this._id);
		});

	},

	"click #addRemoveFav" : function (event, template){
		event.preventDefault();
		Meteor.call("properties.addRemoveFav", this._id, Meteor.userId(), (err, res) => {
		});
	},

	"change #orderSelect" : function (event, template) {
		event.preventDefault();
		var orderVal = $("#orderSelect").val().split("_");
		var sortObject = {};
		sortObject[orderVal[1]] = Number(orderVal[0]);

		Template.instance().results.set(Properties.find({}, {sort: sortObject}));
	}
});
