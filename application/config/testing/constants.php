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



define('STORY_ID', 8374);
define('KIXER_STORY_ID', 8374);

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
define('MENS_HUMOR_MEDIA_LIMIT', 1);
define('TOP_STORIES_LIMIT', 5);
define('LATEST_STORIES_LIMIT', 5);
define('TOP_CATEGORIES_LIMIT', 5);
define('STORY_CATEGORY_CACHE_LIMIT', 7200);
define('TOP_STORY_CACHE_LIMIT', 3);
define('LOGGED_CACHE_LIMIT', 300);


define('FORENSIQ_SCORE', 80);


define('AMAZON_S3_ACCESS_KEY', 'AKIAJYMVPNMIQS5B24VQ');
define('AMAZON_S3_PASSWORD', 'NOfjQ5jokhn9uB7m7JB+3iVrDN5y0/baHorsw7HV');

define('AMAZON_SES_ACCESS_KEY', 'AKIAJEXRK4EJI4CV3CVA');
define('AMAZON_SES_PASSWORD', 'hgt16g5WVWl0scH7NYLGvBC+GXMMPqLum5vBXSOj');

define('S3BUCKET', 'my-tss');
// define('S3_USER_BUCKET', 'test_evrystry');


/*Ventuno partnet key*/
define('PARTNER_KEY', '553b9f99b5735');

define('TESTDOMAIN',"localhost/");
define('DOMAIN',"localhost");

define('CLOUDFLAREHEADER',true);

define('SMTP_USER','vatsanatech');
define('SMTP_PASS','VATSANA_WITTYFEED_911');

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
define('STORY_TABLE',TABLE_PREFIX.'story');
define('STORY_LOCATION','story_location');
define('IMAGE_TABLE',TABLE_PREFIX.'image');
define('USER_TABLE',TABLE_PREFIX.'user');
define('RELATION_TABLE',TABLE_PREFIX.'relation');
define('EMAIL_TABLE',TABLE_PREFIX.'email');
define('COUNTER_TABLE',TABLE_PREFIX.'counter');
define('NEW_CATEGORY_TABLE',TABLE_PREFIX.'cat_new');
define('POLL_QUESTION_TABLE','polls_question');
define('POLL_OPTION_TABLE','polls_option');
define('QUIZ_QUESTION_TABLE','polls_question');
define('QUIZ_OPTION_TABLE','polls_option');
define('QUIZ_RESULT_TABLE','quiz_results');
define('FEEDIT_TABLE','feedit');
define('MESSAGE_TABLE','messages');
define('ACTIVITY_TABLE','activities');
define('NEWS_LETTER_TABLE',TABLE_PREFIX.'newsletter');
define('APP_VERSION','app_versions');
define('MEMCACHE_PREFIX', 'wittyfeed_pwa_');
define('ELASTICSEARCH_INDEX', 'wittyfeed');



/*
|--------------------------------------------------------------------------
| File cache limit constants 
|--------------------------------------------------------------------------
|
| these are the file cache limit constants for amount of time cache file is deleted 
|
*/
define('CATEGORY_CACHE_LIMIT',3);
define('STORY_CACHE_LIMIT',18);
define('SITEMAP_CACHE_LIMIT',18);
define('USER_CACHE_LIMIT',3);
define('POP_UP_STORY_CACHE_LIMIT',3);
define('STATS_CACHE_LIMIT',7200);

define('SQS_URL','http://cloud.asapoo.com/sqs_services/push_data/');


define('FBGAMES_APP_URL', '//localhost/wittyfeed_pwa/games/');
define('FBGAMES_APP_ID', '601536576541958');

define('RUMBLE_THUMBNAIL_URL','https://rumble.com/api/v0/Media.Search.json?_p=u7cgv.061ldknax&url=');
define('RUMBLE_BASE_URL','https://rumble.com/api/v0/Media.Search.json?_p=u7cgv.061ldknax');

define('POPULAR_STORIES_URL',"//52.23.127.54/api.php");

define('USER_PROFILE_IMAGE_PATH','assets/users/profile_image/');
define('USER_COVER_IMAGE_PATH',"assets/users/cover_image/");

define('S3_IMAGE_PATH', "//cdn.wittyfeed.com/");
define('LANGUAGE_COOKIE_NAME', "l_wf");
define('S3_COVER_IMAGE_PATH', "//og.wittyfeed.com/");

define('STATIC_ASSETS_PATH', "//cdn.wittyfeed.com/assets_pwa_new/");

define('IMAGE_Q_STRING', "?tr=q-40");


define('ASSETS_PATH', "//localhost/wittyfeed/");

define('ROUTE_URL', "//localhost/wittyfeed");

define('PROTOCOL', "http:");

define('S3_VIDEO_PATH', "//www.youtube.com/embed/");
define("S3_VIDEO_SNAPSHOT_PATH", "//img.youtube.com/vi/");

define("FB_APP_ID", '645451268885429');
define("FB_APP_SECRET", '16035695a7f3ebbf17494063f26aebae');
      
define("GPLUS_CLIENT_ID", '790342924466-bn6e0jia74c0h95eqj6m7o4kve0unic5.apps.googleusercontent.com');
define("GPLUS_CLIENT_SECRET", 'H3gjz7LRKKW7QG6sp8Hdxv7N');
define("GPLUS_API_KEY", 'AIzaSyDlzxnTn2kHzwGXzHtzIvH57FmfL-yMniA');

define("TWITTER_API_KEY", 'DrNt70q4ddwYFoEZOXcMLKPim');
define("TWITTER_API_SECRET", 'EIbDHHdoka6tm4sGXPmNXijOP6MqMMJeDGdlrhF9qjHvXbvRJj');

define("FACEBOOK_LIKE","https://www.facebook.com/WittyFeeds/");
define("TWITTER_LIKE","https://twitter.com/WittyFeeds");
define("GOOGLEPLUS_LIKE","https://plus.google.com/+WittyFeeds");

//This is constants defined for the entity_name used in the counter_model
define('NEWSLETTER_STORY_COUNT',"newsletter_story_count");
define('ACL_PUBLIC_READ_WRITE', 'public-read-write');

define('SHOW_AD',false);
define('DFP_AD', false);

define('BOT_DETECTION_CODE', false);

define('MOBILE_DEVICES_LIMIT', 100);

define('REDIS_URL', 'https://stats.wittyfeed.com/');
define('PING_URL', 'https://ping.wittyfeed.com/');
define('COMMENT_URL', 'https://comments.wittyfeed.com/');

define('TESTING_URL', '//testing.wittyfeed.com/');
define('VIEW_COUNT_PREFIX', 'wf_pwa');

define('VIDEOGRAM_URL','//cached.videogram.com/auto/embed?api_key=3dcc7987-3739-4081-bf5d-e25c6cb6d279&url=');

/* End of file constants.php */
/* Location: ./application/config/constants.php */