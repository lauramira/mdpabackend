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
      FlowRouter.go('/properties?type=' + type + '&matchSearch=' + matchSearch);

    }
  });
