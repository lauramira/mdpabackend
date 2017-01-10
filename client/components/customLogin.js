Template.customLogin.onCreated(function customLoginOnCreated(){
});

Template.customLogin.events({
  'submit form': function(event){
        event.preventDefault();
        $("#loginErrorDiv").addClass("hidden").text('');
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function (err, res){
          if (err){
            var errorMessage = "Error " + err.error + ". " + err.reason +".";
            $("#loginErrorDiv").removeClass("hidden").text(errorMessage);
          } else {
            FlowRouter.go('/');
          }
      });
    }
})
