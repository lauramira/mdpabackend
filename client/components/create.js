Template.create.onCreated(function propertyCreateOnCreated(){
});


Template.create.helpers({

});

Template.create.events({
  "click #backButton": function(){
      Router.go('/');
    },
    "click #insertButton": function(){
      var data = $("textarea").val();
      Meteor.call("properties.create", data, function(error, result){
          if (error){
            $(".alert-danger").removeClass("hidden");
            $(".alert-danger p").text("Error inserting document. " + error.message);
            $(".alert-success").addClass("hidden");
            $(".alert-success p").text("");
            throw new Meteor.Error(error.error, error.message);
          }
          if (result) {
            $(".alert-danger").addClass("hidden");
            $(".alert-danger p").text("");
            $(".alert-success p").text("Document with id '" + result + "' inserted successfully");
            $(".alert-success").removeClass("hidden");
            $("textarea").val("");
          }

      });
    }
});
