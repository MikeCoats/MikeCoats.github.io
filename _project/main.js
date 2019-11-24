const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const discoverPartials = require('metalsmith-discover-partials')
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const metallic = require('metalsmith-metallic');
const registerHelpers = require('metalsmith-register-helpers');
const excerpts = require('metalsmith-excerpts');

Metalsmith(__dirname)
  .metadata({
    sitename: 'MikeCoats.com',
    siteurl: 'https://mikecoats.com/',
    description: 'MikeCoats.com',
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
    pattern: ':title'
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
  .build(function (err) {
    if (err) throw err;
  });
