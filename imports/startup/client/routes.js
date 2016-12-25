// Router.configure({
//     layoutTemplate: 'main'
// });

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("main", {content: "index"});
  }
});

FlowRouter.route('/create', {
  action: function() {
    BlazeLayout.render("main", {content: "create"});
  }
});

FlowRouter.route('/result', {
  action: function() {
    BlazeLayout.render("main", {content: "result"});
  },
  subscriptions: function(params, queryParams) {
    debugger;
    this.register('searchResult', Meteor.subscribe('searchResult', queryParams));
    }
});
