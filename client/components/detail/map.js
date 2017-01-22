Template.map.onCreated(function mapOnCreated(){
  GoogleMaps.ready('locationProperty', function(map) {
   // Add a marker to the map once it's ready
   var marker = new google.maps.Marker({
     position: map.options.center,
     map: map.instance
   });
 });
});

Template.map.helpers({
  locationPropertyOptions: function() {
    var location = Template.parentData(0).location;
    if (GoogleMaps.loaded() && location) {
      return {
        center: new google.maps.LatLng(location.coordinates[0], location.coordinates[1]),
        zoom: 14
      };
    }
  },
});

Meteor.startup(function() {
    GoogleMaps.load({ v: '3', key: 'AIzaSyBL7BvwkVTas7pM6uIKuzYAudCVTmVGcqY', libraries: 'geometry,places' });
  });
