Template.index.onCreated(function indexsOnCreated(){

});

Template.index.helpers({
    isUserLogged: function () {
      return Meteor.userId() != null;
    }
  });

  Template.index.events({
    'click #search': function () {
      var type = $("input[name='propertyType']:checked").val();
      var matchSearch = $("#matchSearch").val();
      var correctSearch = true;
      if (!type){
          $(".search-radio-container label").addClass("search-radio-required");
          correctSearch = false;
      } else {
          $(".search-radio-container label").removeClass("search-radio-required");
      }

      if (!matchSearch || matchSearch === ""){
        $(".search-input").addClass("search-input-required");
        correctSearch = false;
      } else {
        $(".search-input").removeClass("search-input-required");
      }

      if (correctSearch){
        FlowRouter.go('/properties?type=' + type + '&matchSearch=' + matchSearch);
      }
    },

    'click #searchByLocation' : function () {
      var type = $("input[name='propertyTypeLocation']:checked").val();
      var correctSearch = true;
      if (!type){
          $("#searchDivLocation").find(".search-radio-container label").addClass("search-radio-required");
          correctSearch = false;
      } else {
          $("#searchDivLocation").find(".search-radio-container label").removeClass("search-radio-required");
      }

      if (correctSearch){
        FlowRouter.go('/properties?type=' + type + '&lat=' + 41.3869693 + '&lng=' + 2.1679476);
      }

    },

    'click input[type="radio"]' : function () {
      $(".search-radio-container label").removeClass("search-radio-required");
    },

    'keyup #matchSearch': function () {
      if ($("#matchSearch").val()){
        $("#matchSearch").removeClass("search-input-required");
      }
    }
  });
