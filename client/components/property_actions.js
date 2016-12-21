Template.propertyActions.onCreated(function propertyActionsOnCreated(){

});

Template.propertyActions.helpers({
    isUserLogged: function () {
      return Meteor.userId() != null;
    }
  });

  Template.propertyActions.events({
    'click #create': function () {
      Router.go('/create');
    },
    'click #salesButton' : function () {
      Router.go('/sales');
    }
  });
