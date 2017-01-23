Meteor.subscribe("currentUser", Meteor.userId());
Template.detail.onCreated(function detailOnCreated(){

});

Template.detail.helpers({
  property: function(){
    return Properties.findOne({});
  },

  isRental: function(){
    return this.propertyType === 'rental';
  },
  userLogged: function () {
    return Meteor.userId();
  },
	isFav: function () {
		return Users.findOne({favorites: this._id});
  }
});

Template.detail.events({
  "click #sendComment" : function (event, template){
		event.preventDefault();
		var comment = $("#comment").val();
    var correctSendComment = true;

    if (!comment || comment === ""){
      correctSendComment = false;
    }

    if (correctSendComment){
      var fileName = $("#commentImageInput")[0].files[0].name;
      var dataUri = $("#commentImageInput").val();
debugger;
      Meteor.call('properties.addComment', this._id, comment, dataUri, fileName ,(err, res) => {
          $("#comment").val('');
      });
    }

	},

  "click #addRemoveFav" : function (event, template){
    event.preventDefault();
    Meteor.call("properties.addRemoveFav", this._id, Meteor.userId(), (err, res) => {
    });
  }
});
