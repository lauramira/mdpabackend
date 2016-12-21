Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('menuIndex');
});

Router.route('/create');

Router.route('/sales');
