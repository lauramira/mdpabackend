Template.properties.onCreated(function propertiesOnCreated(){
	var sortObject = {};
	sortObject['price'] = 1;
	this.results = new ReactiveVar(Properties.find({}, {sort: sortObject}));
});

Template.properties.helpers({
	results: function (orderByValue, orderDirection) {
		return Template.instance().results.get();
	},

	userLogged: function() {
		return Meteor.userId();
	},

	isFav: function () {
		return Users.findOne({favorites: this._id});
	},

	emptyList: function(){
		return Properties.find({}).fetch().length === 0;
	},

	paramPropertyMatchSearchValue: function (){
		return FlowRouter._current.queryParams.matchSearch;
	},

	paramPropertyTypeValue: function (){
		return FlowRouter._current.queryParams.type;
	},

	orderOptionsList: function() {
		orderOptions = [];
		orderOptions.push({name: "- Price", value: "1_price"});
		orderOptions.push({name: "+ Price", value: "-1_price"});
		orderOptions.push({name: "+ Area", value: "-1_area"});
		orderOptions.push({name: "- Area", value: "1_area"});
		return orderOptions;
	},

  isRental: function(){
    return FlowRouter._current.queryParams.type === 'rental';
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
	},

	"change #orderSelect" : function (event, template) {
		event.preventDefault();
		var orderVal = $("#orderSelect").val().split("_");
		var sortObject = {};
		sortObject[orderVal[1]] = Number(orderVal[0]);

		Template.instance().results.set(Properties.find({}, {sort: sortObject}));
	}
});
