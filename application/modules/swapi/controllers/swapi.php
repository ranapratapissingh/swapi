<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Swapi extends MY_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->helper('utilities');
    }

	public function index_get($people=0) {

		
		$results['main_content'] = 'swapi_main_view';

		$results['detail_view'] = 0;
		if ($people!=0) {
			$results['people_page_value'] = $people;
			$results['detail_view'] = 1;
		}

		$results['page_name'] = 'PEOPLE';
		$this->load->view('master', $results);
	}

	public function planets_get($planets=0){

		$results['main_content'] = 'swapi_main_view';

		$results['detail_view'] = 0;
		if ($planets!=0) {
			$results['people_page_value'] = $planets;
			$results['detail_view'] = 1;
		}

		$results['page_name'] = 'PLANETS';
		$this->load->view('master', $results);
	}

	public function films_get($films=0){

		$results['main_content'] = 'swapi_main_view';

		$results['detail_view'] = 0;
		if ($films!=0) {
			$results['people_page_value'] = $films;
			$results['detail_view'] = 1;
		}
		
		$results['page_name'] = 'FILMS';
		$this->load->view('master', $results);
	}

	public function species_get($species=0){

		$results['main_content'] = 'swapi_main_view';

		$results['detail_view'] = 0;
		if ($species!=0) {
			$results['people_page_value'] = $species;
			$results['detail_view'] = 1;
		}
		
		$results['page_name'] = 'SPECIES';
		$this->load->view('master', $results);
	}

	public function vehicles_get($vehicles=0){
		
		$results['main_content'] = 'swapi_main_view';

		$results['detail_view'] = 0;
		if ($vehicles!=0) {
			$results['people_page_value'] = $vehicles;
			$results['detail_view'] = 1;
		}
		
		$results['page_name'] = 'VEHICLES';
		$this->load->view('master', $results);
	}

	public function starships_get($starships=0){

		$results['main_content'] = 'swapi_main_view';

		$results['detail_view'] = 0;
		if ($starships!=0) {
			$results['people_page_value'] = $starships;
			$results['detail_view'] = 1;
		}
		
		$results['page_name'] = 'STARSHIPS';
		$this->load->view('master', $results);
	}
}



?>