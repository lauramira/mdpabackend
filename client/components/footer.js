Template.footer.onCreated(function footerOnCreated(){

});

Template.footer.helpers({
  isNotMainPage: function(){
    debugger;
    return Router.current().route.path(this) !== "/";
  }
});

Template.footer.events({
  "click #backButton": function(){
      Router.go('/');
    },
  });
