<?php if ($main_content == 'story_view') {
    $this->load->view('templates/header', $data);
  }else{
    $this->load->view('templates/header');
  }?>

<script>
  var BASE_URL = "<?php echo base_url();?>";
  var PAGE_NAME = "<?php echo $page_name?>";
  var PEOPLE_PAGE_VALUE = '<?php echo isset($people_page_value) ? $people_page_value : 0 ; ?>';
  var DETAIL_VIEW = '<?php echo isset($detail_view) ? $detail_view : 0; ?>';
  var PHOTOS = '<?php echo base_url('assets/images/mustacheman.png')?>';
</script>    
<?php if ($main_content == 'story_view') {
        $this->load->view($main_content, $data);
      } else {
        $this->load->view($main_content);
      } ?>
<?php     
    $this->load->view('templates/common_footer');
    $this->load->view('templates/footer_home');      
?>
