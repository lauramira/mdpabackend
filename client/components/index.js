Template.index.onCreated(function indexsOnCreated(){

});

Template.index.helpers({
    isUserLogged: function () {
      return Meteor.userId() != null;
    }
  });

  Template.index.events({
    'click #search': function () {
      var type = $("input[name='propertyType']:checked").val();
      var matchSearch = $("#matchSearch").val();
      var correctSearch = true;
      if (!type){
          $("#typeRequired").text("Required");
          correctSearch = false;
      } else {
        $("#typeRequired").text("");
      }

      if (!matchSearch || matchSearch === ""){
        $("#matchSearchRequired").text("Required");
        correctSearch = false;
      } else {
        $("#matchSearchRequired").text("");
      }

      if (correctSearch){
        FlowRouter.go('/properties?type=' + type + '&matchSearch=' + matchSearch);
      }
    }
  });
