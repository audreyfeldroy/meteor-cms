Pages = new Meteor.Collection("pages")

Meteor.publish('pages', function () {
  return Pages.find();
});
