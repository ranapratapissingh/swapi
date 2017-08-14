<style>
.tag-footer .fancy {
    line-height: .5;
    text-align: center;
    color: #ffffff;
}
.tag-footer .fancy span {
    display: inline-block;
    position: relative;
}
    .tag-footer .fancy span:before {
    right: 100%;
    margin-right: 15px;
}
    .tag-footer .fancy span:after, .tag-footer .fancy span:before {
    content: "";
    position: absolute;
    height: 5px;
    border-bottom: 1px solid #1d93ef;
    top: 0;
    width: 70px;
}
    
    .tag-footer .fancy span:after {
    left: 100%;
    margin-left: 15px;
}
</style>
<!-- START FOOTER-->
 <div class=" row tag-footer" id="showFooter" style="display: none;">
  <div class="col s12 FooterPart2 footerCategory">
   <ul class="FooterWithCopyRight">
    <li><a href="<?php echo base_url(). 'about';?>"><span> &#9679; </span>About Us</a></li>
    <li><a href="<?php echo base_url(). 'privacy';?>"><span> &#9679; </span>Privacy Policy</a></li>
   </ul>
  </div>
  <div class="col s12 VatsanaCopyRightText subtitle fancy"><span>Demo @ <?php echo date('Y');?></span></div>
 </div>
 <!--END FOOTER-->

<!-- Compiled and minified JavaScript -->

   
        <script src="<?php echo base_url(); ?>pwaswapi/swapi.js"></script>
        
        <script type="text/javascript">
          $('.button-collapse').sideNav({
                menuWidth: 300, // Default is 280
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
        </script>
</body>
</html>