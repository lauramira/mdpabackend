Meteor.subscribe("sales");

Template.sales.onCreated(function propertySalesOnCreated(){
});

Template.sales.helpers({
	sales: function (){
		return Properties.find({});
	}
});
