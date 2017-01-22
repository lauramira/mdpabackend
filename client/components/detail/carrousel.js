Template.photoCarrousel.onCreated(function photoCarrouselOnCreated(){

});

Template.photoCarrousel.helpers({
  getImages: function (){
    return Template.parentData(0).images;
  },

  isFirst: function(){
    return Template.parentData(1).images[0] == this;
  }
});
