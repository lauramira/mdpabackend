Template.footer.onCreated(function footerOnCreated(){

});

// Template.footer.helpers({
//   isNotMainPage: function(){
//     return Router.current().route.path(this) !== "/";
//   }
// });

Template.footer.events({
  "click #backButton": function(){
      FlowRouter.go('/');
    },
  });
