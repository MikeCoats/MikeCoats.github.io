const Metalsmith = require('metalsmith');
// const drafts = require('metalsmith-drafts');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const discoverPartials = require('metalsmith-discover-partials')
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const metallic = require('metalsmith-metallic');

Metalsmith(__dirname)
  .metadata({
    sitename: 'My Static Site & Blog',
    siteurl: 'http://example.com/',
    description: 'It\'s about saying »Hello« to the world.',
    generatorname: 'Metalsmith',
    generatorurl: 'http://metalsmith.io/'
  })
  .source('./content')
  .destination('..')
  .clean(false)
  // .use(drafts())
  .use(collections({          // group all blog posts by internally
    posts: 'posts/*.md'       // adding key 'collections':'posts'
  }))                         // use `collections.posts` in layouts
  .use(metallic())
  .use(markdown())            // transpile all md into html
  .use(discoverPartials({
    directory: 'layouts/partials'
  }))
  .use(layouts({
    default: 'default.hbs'
  }))
  .use(permalinks({
    pattern: ':title'
  }))
  .build(function (err) {      // build process
    if (err) throw err;       // error handling is required
  });
