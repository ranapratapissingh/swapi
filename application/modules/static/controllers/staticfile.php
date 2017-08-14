<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Staticfile extends MY_Controller {

	public function __construct(){
        parent::__construct();
    }

    public function index_get() {

    }

    public function about_get() {

        $data['main_content'] = 'aboutus';
        $data['page_name'] = 'about';
        $this->load->view('master', $data);
    }

    public function privacy_get() {

        $data['main_content'] = 'aboutus';
        $data['page_name'] = 'privacy';
        $this->load->view('master', $data);
    }
}

?>