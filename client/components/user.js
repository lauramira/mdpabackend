Template.user.onCreated(function userOnCreated(){

});

Template.user.helpers({
  currentUser: function (){
    if (Meteor.userId() && Meteor.userId() === FlowRouter._current.params.id){
        return Users.findOne(Meteor.userId());
    } else {
      return {};
    }
  },

  isCurrentUser: function () {
    return Meteor.userId() && Meteor.userId() === FlowRouter._current.params.id;
  }
});

Template.user.events({
  "click #goToFavs" : function (){
    FlowRouter.go('/user/' + Meteor.userId() + '/favorites');
  }
})
