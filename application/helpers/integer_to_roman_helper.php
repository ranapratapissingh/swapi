<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

	function romanic_number($integer) 
	{ 
	   if($integer >= 1000)
	   {
		   $value = ($integer/1000);
		   return number_format($value,1)."K";
	   }
	   else
	   {
		   return $integer;
	   }
	}

?>