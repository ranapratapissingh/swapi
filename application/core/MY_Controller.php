<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'libraries/REST_Controller.php');
/**
 * 
 * comman controller for the all the controllers inherited from the CI_Controller
 * @author bharat
 *
 */

class MY_Controller extends REST_Controller
{
	
	function __construct()
	{
		parent::__construct();
		//redirect(base_url().'maintenance');		
	}
}

?>