Template.index.onCreated(function indexsOnCreated(){

});

Template.index.helpers({
    isUserLogged: function () {
      return Meteor.userId() != null;
    }
  });

  Template.index.events({
    'click #search': function () {
      var type="alquiler";
      var matchSearch = "Prueba";
      debugger;
      FlowRouter.go('/result?type=' + type + '&matchSearch=' + matchSearch);

    }
  });
