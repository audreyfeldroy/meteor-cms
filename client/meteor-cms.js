Pages = new Meteor.Collection("pages");

// ID of currently selected page
Session.set('page_slug', null);

Meteor.subscribe('pages', function () {
  if (!Session.get('page_slug')) {
    var page = Pages.findOne({}, {sort: {name: 1}});
    if (page)
      Router.setPage(page.slug);
  }
});

Template.nav.pages = function () {
  return Pages.find({});
};

Template.page_content.page = function () {
  var page_slug = Session.get('page_slug');
  if (!page_slug)
    return {title: 'Error, no page found'};
  return Pages.findOne({slug: page_slug});
};

var PageRouter = Backbone.Router.extend({
  routes: {
    ":page_slug": "main"
  },
  main: function (page_slug) {
    Session.set("page_slug", page_slug);
  },
  setPage: function (page_slug) {
    this.navigate(page_slug, true);
  }
});

Router = new PageRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});
