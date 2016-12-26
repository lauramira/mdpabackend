Template.properties.onCreated(function propertiesOnCreated(){
});

Template.properties.helpers({
	results: function (){				
		return Properties.find({});
	}
});
