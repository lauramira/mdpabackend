Template.header.onCreated(function headerOnCreated(){

});

Template.header.helpers({
  'isLogged' : function (){
    return Meteor.userId();
  }
});

Template.header.events({
  'click #goToProfile' : function (){
    FlowRouter.go('/user/' + Meteor.userId());
  },

  'click #goToLogin' : function (){
    FlowRouter.go('/login');
  },

  'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
})
