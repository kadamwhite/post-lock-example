const { externals, helpers, presets } = require( '@humanmade/webpack-helpers' );

module.exports = presets.production( {
    externals,
    entry: {
        editor: helpers.filePath( 'src/editor.js' ),
    },
    output: {
        path: helpers.filePath( 'build' ),
    },
} );
