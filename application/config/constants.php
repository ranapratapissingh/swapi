<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| File and Directory Modes
|--------------------------------------------------------------------------
|
| These prefs are used when checking and setting modes when working
| with the file system.  The defaults are fine on servers with proper
| security, but you may wish (or even need) to change the values in
| certain environments (Apache running a separate process for each
| user, PHP under CGI with Apache suEXEC, etc.).  Octal values should
| always be used to set the mode correctly.
|
*/
define('FILE_READ_MODE', 0644);
define('FILE_WRITE_MODE', 0666);
define('DIR_READ_MODE', 0755);
define('DIR_WRITE_MODE', 0777);

/*
|--------------------------------------------------------------------------
| File Stream Modes
|--------------------------------------------------------------------------
|
| These modes are used when working with fopen()/popen()
|
*/

define('FOPEN_READ',							'rb');
define('FOPEN_READ_WRITE',						'r+b');
define('FOPEN_WRITE_CREATE_DESTRUCTIVE',		'wb'); // truncates existing file data, use with care
define('FOPEN_READ_WRITE_CREATE_DESTRUCTIVE',	'w+b'); // truncates existing file data, use with care
define('FOPEN_WRITE_CREATE',					'ab');
define('FOPEN_READ_WRITE_CREATE',				'a+b');
define('FOPEN_WRITE_CREATE_STRICT',				'xb');
define('FOPEN_READ_WRITE_CREATE_STRICT',		'x+b');



/*
|--------------------------------------------------------------------------
| Stories limit constants
|--------------------------------------------------------------------------
|
| thease are the stories limit per page constants 
|
*/
define('STORIES_LIMIT', 18);
define('STORIES_LOAD_MORE',12);
define('STORY_MEDIA_LIMIT', 4);
define('TOP_STORIES_LIMIT', 5);
define('LATEST_STORIES_LIMIT', 5);
define('TOP_CATEGORIES_LIMIT', 5);

define('AMAZON_S3_ACCESS_KEY', 'AKIAJYMVPNMIQS5B24VQ');
define('AMAZON_S3_PASSWORD', 'NOfjQ5jokhn9uB7m7JB+3iVrDN5y0/baHorsw7HV');



/*
|--------------------------------------------------------------------------
| Table name constants
|--------------------------------------------------------------------------
|
| these are the table name 
|
*/
define('TABLE_PREFIX', 'tbl_');
define('CATEGORY_TABLE',TABLE_PREFIX.'cat');
define('GALLERY_TABLE',TABLE_PREFIX.'gallery');
define('IMAGE_TABLE',TABLE_PREFIX.'image');
define('ADMIN_TABLE',TABLE_PREFIX.'admin');
define('RELATION_TABLE',TABLE_PREFIX.'relation');
define('EMAIL_TABLE',TABLE_PREFIX.'email');
define('COUNTER_TABLE',TABLE_PREFIX.'counter');


/*
|--------------------------------------------------------------------------
| File cache limit constants 
|--------------------------------------------------------------------------
|
| these are the file cache limit constants for amount of time cache file is deleted 
|
*/
define('CATEGORY_CACHE_LIMIT',3);
define('STORY_CACHE_LIMIT',3);
define('USER_CACHE_LIMIT',3);


define('USER_PROFILE_IMAGE_PATH','assets/users/profile_image/');
define('USER_COVER_IMAGE_PATH',"assets/users/cover_image/");
define('S3_IMAGE_PATH', "//cdn.wittyfeed.com/");
define('S3_VIDEO_PATH', "//www.youtube.com/embed/");
define("S3_VIDEO_SNAPSHOT_PATH", "//img.youtube.com/vi/");


//evrystry 
/*define("FB_APP_ID", '278527225617544');
define("FB_APP_SECRET", 'c876eec7b461828382f04e8734e56c18');*/

//wittyfeeds
define("FB_APP_ID", '645451268885429');
define("FB_APP_SECRET", '13b16f04f9bce768de862a49a0a9a0d4');

define("FACEBOOK_LIKE","https://www.facebook.com/WittyFeeds/");
define("TWITTER_LIKE","https://twitter.com/WittyFeeds");
define("GOOGLEPLUS_LIKE","https://plus.google.com/+WittyFeeds");

//This is constants defined for the entity_name used in the counter_model
define('NEWSLETTER_GALLERY_COUNT',"newsFACEBOOK_LIKEletter_gallery_count");
define('ACL_PUBLIC_READ_WRITE', 'public-read-write');



/* End of file constants.php */
/* Location: ./application/config/constants.php */