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

FlowRouter.route('/properties', {
  action: function(params, queryParams) {
    BlazeLayout.render("main", {content: "properties"});
  },
  subscriptions: function(params, queryParams) {
    console.log(queryParams)
    Meteor.subscribe('properties.result', queryParams);
  }
});

FlowRouter.route('/property/:id', {
  action: function() {
    BlazeLayout.render("main", {content: "detail"});
  },
  subscriptions: function(params) {
    Meteor.subscribe('properties.byId', params.id);
  }
});

FlowRouter.route('/user/:id', {
  action: function () {
    BlazeLayout.render("main", {content: "user"});
  },
  subscriptions: function(params) {
    Meteor.subscribe('currentUser', this.userId);
  }
});

FlowRouter.route('/user/:id/favorites', {
  action: function () {
    BlazeLayout.render("main", {content: "favorites"});
  },
  subscriptions: function(params) {
    Meteor.subscribe('properties.favoritesByUser', params.id);
  }
});

FlowRouter.route('/login', {
  action: function() {
    BlazeLayout.render("main", {content: "customLogin"});
  }
});
