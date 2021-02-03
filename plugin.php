<?php
/**
 * Plugin Name: Post Lock Example
 */

namespace Block_Test;

use Asset_Loader;

function enqueue_assets() {
    Asset_Loader\enqueue_asset(
        __DIR__ . '/build/asset-manifest-production.json',
        'editor.js',
        [
            'dependencies' => [ 'wp-data', 'wp-plugins' ],
        ]
    );
}

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_assets' );
