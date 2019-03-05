<?php
/**
 * Gulpy functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Gulpy
 */

define( 'GULPY_VERSION', wp_get_theme()->get( 'Version' ) );

if ( ! function_exists( 'gulpy_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function gulpy_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Gulpy, use a find and replace
		 * to change 'gulpy' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'gulpy', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'gulpy' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'gulpy_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );

		/**
		 * New Editor support (Gutenberg)
		 * 
		 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/
		 */
		// Add support for Block Styles (use default style on front).
		add_theme_support( 'wp-block-styles' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Add support for full and wide align images (need some css to design this capacity with classes : .alignwide and .alignfull).
		// See file src/sass/blocks/_blocks.scss
		add_theme_support( 'align-wide' );

		// Add support for editor styles (need to create a file in src/assets/sass/style-editor.scss Gulp will generate assets/css/style-editor.css).
		// https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#editor-styles
		add_theme_support( 'editor-styles' );
		// Add support for dark Theme
		add_theme_support( 'dark-editor-style' );
		// Enqueue editor styles.
		add_editor_style( 'assets/css/style-editor.css' );

		// Disable custom font sizes
		add_theme_support( 'disable-custom-font-sizes' );

		// Add custom editor font sizes (need some css classes built like this .has-XXX-font-size so we have for exemple: .has-small-font-size{font-size:12px;} etc ...).
		// See file src/sass/blocks/_blocks.scss
		add_theme_support( 'editor-font-sizes', array(
			array(
				'name'      => __( 'Small', 'gulpy' ),
				'shortName' => __( 'S', 'gulpy' ),
				'size'      => 12,
				'slug'      => 'small'
			),
			array(
				'name'      => __( 'Regular', 'gulpy' ),
				'shortName' => __( 'M', 'gulpy' ),
				'size'      => 16,
				'slug'      => 'regular'
			),
			array(
				'name'      => __( 'Large', 'gulpy' ),
				'shortName' => __( 'L', 'gulpy' ),
				'size'      => 20,
				'slug'      => 'large'
			),
		) );

		// Disable custom colors in block color palettes to use only the following one in editor-color-palette
		add_theme_support( 'disable-custom-colors' );

		// Editor color palette (need some css classes built like this .has-XXX-color so we have for exemple: .has-blue-color etc ...).
		add_theme_support(
			'editor-color-palette',
			array(
				array(
					'name'  => __( 'Blue', 'gulpy' ),
					'slug'  => 'blue',
					'color' => '#33658A',
				),
				array(
					'name'  => __( 'Green', 'gulpy' ),
					'slug'  => 'green',
					'color' => '#05A8AA',
				),
				array(
					'name'  => __( 'Light Green', 'gulpy' ),
					'slug'  => 'light-green',
					'color' => '#B8D5B8',
				),
				array(
					'name'  => __( 'Yellow', 'gulpy' ),
					'slug'  => 'yellow',
					'color' => '#F6AE2D',
				),
				array(
					'name'  => __( 'Orange', 'gulpy' ),
					'slug'  => 'orange',
					'color' => '#F26419',
				),
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'gulpy_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function gulpy_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'gulpy_content_width', 640 );
}
add_action( 'after_setup_theme', 'gulpy_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function gulpy_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'gulpy' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'gulpy' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'gulpy_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function gulpy_scripts() {
	/**
	 * Styles : wp_enqueue_style( $handle, $src, $deps, $ver, $media )
	 * ==============================================================
	 */
	wp_enqueue_style( 'gulpy-style', get_stylesheet_uri() );

	wp_enqueue_style( 'gulpy-main-style', get_template_directory_uri() . '/assets/css/main.css', array(), GULPY_VERSION, 'all' );

	/**
	 * Scripts : wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer ).
	 * =====================================================================
	 */
	wp_enqueue_script( 'gulpy-appcustom.js', get_template_directory_uri() . '/assets/js/appcustom.min.js', array(), GULPY_VERSION, true );

	// Load the html5 shiv.
	wp_enqueue_script( 'gulpy-html5', get_template_directory_uri() . '/assets/js/html5shiv.min.js', array(), '3.7.3' );
	wp_script_add_data( 'gulpy-html5', 'conditional', 'lt IE 9' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'gulpy_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

