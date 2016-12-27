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
    return Properties.find({}).fetch();
  },
  isFirst: function(){
    return Properties.findOne({}).images[0] == this;
  },
  isRental: function(){
    return this.type === 'rental';
  },
  locationPropertyOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(this.location.lat, this.location.lng),
        zoom: 14
      };
    }
  }
});

Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyBL7BvwkVTas7pM6uIKuzYAudCVTmVGcqY', libraries: 'geometry,places' });
  });
