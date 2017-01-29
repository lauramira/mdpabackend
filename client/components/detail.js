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
      var file = $("#commentImageInput")[0].files[0];

      if (file){
        var fileName = file.name;
        let reader = new FileReader;

        reader.readAsDataURL(file);

        reader.onloadend = () => {
          //console.log(reader.result);
          Meteor.call('properties.addComment', this._id, comment, reader.result, fileName ,(err, res) => {
            if (err){
              console.log(err);
            }
              $("#comment").val('');
          });
        }
      } else {
        Meteor.call('properties.addComment', this._id, comment, null, null ,(err, res) => {
          if (err){
            console.log(err);
          }
            $("#comment").val('');
        });
      }



    }

	},

  "click #addRemoveFav" : function (event, template){
    event.preventDefault();
    Meteor.call("properties.addRemoveFav", this._id, Meteor.userId(), (err, res) => {
    });
  }
});
