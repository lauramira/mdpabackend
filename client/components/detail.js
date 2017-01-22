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
      $("#commentRequired").text("Required");
    }

    if (correctSendComment){
      //var imagesToUpdate = $("input[type='file']")[0].files[0].name;

      var commentToSend = {
        comment: comment,
        images: []
      }
      Meteor.call('properties.addComment', this._id, commentToSend, (err, res) => {
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
