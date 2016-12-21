Meteor.publishComposite('sales', {
  find: function() {
    return Properties.find({type: 'alquiler'}, {name: 1, address: 1, price: 1, mainImage: 1});
  }
});
