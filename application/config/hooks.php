<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	//codeigniter.com/user_guide/general/hooks.html
|
*/

// Compress output
$hook['display_override'][] = array(
    'class' => '',
    'function' => 'compress',
    'filename' => 'compress.php',
    'filepath' => 'hooks'
);

// $hook['post_system'] = array(
//     'class' => 'MyCategory',
//     'function' => 'categoryRoute',
//     'filename' => 'categoryRoute.php',
//     'filepath' => 'hooks'
// );
// $hook['post_controller_constructor'] = array(
// 'class' => 'MySession',
// 'function' => 'check',
// 'filename' => 'mysession.php',
// 'filepath' => 'hooks'
// );
/* End of file hooks.php */
/* Location: ./application/config/hooks.php */

