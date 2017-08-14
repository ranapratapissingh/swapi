<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	//codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/


$route['default_controller'] = "swapi";
$route['people/(:num)'] = "swapi/index/$1";

$route['planets'] = "swapi/planets";
$route['planets/(:num)'] = "swapi/planets/$1";

$route['films'] = "swapi/films";
$route['films/(:num)'] = "swapi/films/$1";

$route['species'] = "swapi/species";
$route['species/(:num)'] = "swapi/species/$1";

$route['vehicles'] = "swapi/vehicles";
$route['vehicles/(:num)'] = "swapi/vehicles/$1";

$route['starships'] = "swapi/starships";
$route['starships/(:num)'] = "swapi/starships/$1";

$route['404_override'] = 'home/redirect';
$route['page-not-found'] = 'page_not_found';

$route['about'] = 'static/staticfile/about';
$route['privacy'] = 'static/staticfile/privacy';
