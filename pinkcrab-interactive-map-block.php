<?php
/**
 * Plugin Name:       PinkCrab Interactive Map Block
 * Description:       A block for displaying a map with interactive markers.
 * Requires at least: 5.9
 * Requires PHP:      7.1
 * Version:           0.1.0
 * Author:            PinkCrab / Glynn Quelch
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pinkcrab-map-block
 */

define( 'PINKCRAB_INTERACTIVE_MAP_BLOCK', '0.1.0' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function pinkcrab_interactive_map_block_init() {
	register_block_type(
		trailingslashit( __DIR__ ) . 'src/blocks/map',
		array(
			'render_callback' => function( $attribs, $content ) {
				pinkcrab_interactive_map_block_conditional_enqueues( 'ffff' );
				return $content;
			},
		)
	);
}
add_action( 'init', 'pinkcrab_interactive_map_block_init' );

/**
 * Conditionally enqueue styles and scripts.
 */
function pinkcrab_interactive_map_block_conditional_enqueues( string $page_slug = '' ): void {
	if ( has_block( 'pinkcrab/interactive-map' ) ) {
		wp_enqueue_script(
			'pinkcrab-maps-leaflet',
			plugins_url( 'src/leaflet/leaflet.js', __FILE__ ),
			array( 'jquery' ),
			time(),
			true
		);

		if ( ! is_admin() ) {
			wp_enqueue_script(
				'pinkcrab-maps-init',
				plugins_url( 'src/js/map-front.js', __FILE__ ),
				array( 'jquery', 'pinkcrab-maps-leaflet' ),
				time(),
				true
			);
		}

		wp_enqueue_style(
			'pinkcrab-maps-leaflet',
			plugins_url( 'src/leaflet/leaflet.css', __FILE__ ),
			array(),
			time()
		);
	}

}
add_action( 'wp_enqueue_scripts', 'pinkcrab_interactive_map_block_conditional_enqueues' );
// add_action( 'admin_enqueue_scripts', 'pinkcrab_interactive_map_block_conditional_enqueues' );

add_action(
	'enqueue_block_assets',
	function() {
		if ( has_block( 'pinkcrab/interactive-map' ) ) {
			wp_enqueue_script(
				'pinkcrab-maps-init',
				plugins_url( 'src/js/map-back.js', __FILE__ ),
				array( 'jquery', 'pinkcrab-maps-leaflet' ),
				time(),
				true
			);
		}
	}
);
