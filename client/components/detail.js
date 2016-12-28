Meteor.subscribe("currentUser", Meteor.userId());
Template.detail.onCreated(function detailOnCreated(){
  GoogleMaps.ready('locationProperty', function(map) {
   // Add a marker to the map once it's ready
   var marker = new google.maps.Marker({
     position: map.options.center,
     map: map.instance
   });
 });
});

Template.detail.helpers({
  property: function(){
    return Properties.findOne({});
  },
  isFirst: function(){
    return Properties.findOne({}).images[0] == this;
  },
  isRental: function(){
    return this.type === 'rental';
  },
  userLogged: function () {
    return Meteor.userId();
  },
	isFav: function () {
		return Users.findOne({favorites: this._id});
  },
  locationPropertyOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(this.location.lat, this.location.lng),
        zoom: 14
      };
    }
  },
  comments : function (){
    return Comments.find().fetch();
  },
  prettifyDate : function(timestamp) {
    var date = new Date(timestamp);
    return date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();
  },
  checkUser : function(user) {
    return user == null ? "UNKNOWN" : user;
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
      var imagesToUpdate = $("input[type='file']")[0].files[0].name;

      var commentToSend = {
        comment: comment,
        images: imagesToUpdate
      }
debugger;
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

Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyBL7BvwkVTas7pM6uIKuzYAudCVTmVGcqY', libraries: 'geometry,places' });
  });
