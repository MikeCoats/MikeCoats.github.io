const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const metallic = require('metalsmith-metallic');
const markdown = require('metalsmith-markdown');
const excerpts = require('metalsmith-excerpts');
const permalinks = require('metalsmith-permalinks');
const discoverPartials = require('metalsmith-discover-partials')
const registerHelpers = require('metalsmith-register-helpers');
const layouts = require('metalsmith-layouts');
const atom = require('metalsmith-feed-atom');

Metalsmith(__dirname)
  .metadata({
    site:{url: 'https://mikecoats.com/', name:'MikeCoats.com'},
    description: 'MikeCoats.com'
  })
  .source('./content')
  .destination('..')
  .clean(false)
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(metallic())
  .use(markdown())
  .use(excerpts())
  .use(permalinks({
    pattern: ':title',
    relative: 'folder'
  }))
  .use(discoverPartials({
    directory: 'layouts/partials'
  }))
  .use(registerHelpers({
    directory: 'layouts/helpers'
  }))
  .use(layouts({
    default: 'default.hbs'
  }))
  .use(atom({
    collection: 'posts',
    limit: false,
    destination: 'feed/atom/index.xml'
  }))
  .build(function (err) {
    if (err) throw err;
  });
