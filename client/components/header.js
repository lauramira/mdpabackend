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
  }
})
