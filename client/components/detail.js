Template.detail.onCreated(function detailOnCreated(){
});

Template.detail.helpers({
  property: function(){
    return Properties.find({}).fetch();
  },
  isFirst: function(){
    return Properties.findOne({}).images[0] == this;
  }
});
