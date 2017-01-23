Template.comment.onCreated(function commentOnCreated(){

});

Template.comment.helpers({
  comments : function (){
    return Comments.find().fetch();
  },

  checkUser : function(user) {
    return user == null ? "UNKNOWN" : user;
  },

  prettifyDate : function(timestamp) {
    var date = new Date(timestamp);
    return date.getDate() + "/" + date.getMonth() + "/" +  date.getFullYear();
  }
})
