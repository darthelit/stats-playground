#!/usr/bin/env node
if ( process.env.NODE_ENV !== 'production' ) {
  if (
    !require('piping')({ hook: true, ignore: /(src\/scripts)/ })
  ) {
      throw new Error('Error running piping!');
  }
}

require('../server')

