Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('menuIndex');
});

Router.route('/create');
