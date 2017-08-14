<style type="text/css">
	@-webkit-keyframes placeHolderShimmer {
	  0% {
	    background-position: -468px 0
	  }
	  100% {
	    background-position: 468px 0
	  }
	}
	
	@keyframes placeHolderShimmer {
	  0% {
	    background-position: -468px 0
	  }
	  100% {
	    background-position: 468px 0
	  }
	}

	.animated-background {
	  -webkit-animation-duration: 1s;
	  animation-duration: 1s;
	  -webkit-animation-fill-mode: forwards;
	  animation-fill-mode: forwards;
	  -webkit-animation-iteration-count: infinite;
	  animation-iteration-count: infinite;
	  -webkit-animation-name: placeHolderShimmer;
	  animation-name: placeHolderShimmer;
	  -webkit-animation-timing-function: linear;
	  animation-timing-function: linear;
	  background: #f6f7f8;
	  background: #eeeeee;
	  background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
	  background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
	  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
	  -webkit-background-size: 800px 104px;
	  background-size: 800px 104px;
	  height: 96px;
	  position: relative;
	}
	
	.loaderTitle{
		    margin-top: 10px;
    height: 16px;
    width: 84%;
    margin: 11px 7px 7px 5px;
	}
	.loaderWriter{
		display: inline-block;
      margin-top: 10px;
    height: 16px;
    width: 30%;
    margin: 0px 7px 7px 5px;
        position: relative;
    top: -9px;
	}
	.loaderUser{
		width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 100px;
    display: inline-block;
    margin-left: 5px;
	}

/*          Story Home Page
=========================================*/
.storyPageTab {
  margin-bottom: 10px;
  position: fixed;
  padding: 0px !important;
  top: -100px;
  transition: all linear 0.5s;
  background-color: #046fc2;
  z-index: 9999;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #015595; }
  .storyPageTab .tabs {
    background-color: #046fc2; }
    .storyPageTab .tabs .tab a {
      font-size: 20px;
      color: #fff;
      text-transform: capitalize;
      font-family: 'Poppins', sans-serif;
      color: #004172 !important; }
    .storyPageTab .tabs .tab a.active {
      color: #fff !important; }
    .storyPageTab .tabs .indicator {
      background-color: #fff;
      bottom: 0px !important; }

.homePage-CardContainer {
  margin: 0px 0px 18px 0px; }
  .homePage-CardContainer .storyPage-card {
    padding: 0px !important;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin-bottom: 15px; }
    .homePage-CardContainer .storyPage-card .storyPage-cardImage {
      width: 100%;
      display: block;
      background-color: #f9f9f9;
      background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.5) 10px, rgba(255, 255, 255, 0.5) 20px); }
      .homePage-CardContainer .storyPage-card .storyPage-cardImage a {
        background-size: cover;
        background-position: 50% 10%;
        display: block;
        background-repeat: no-repeat;
        border-bottom: 4px solid #198feb;
        height: 185px; }
    .homePage-CardContainer .storyPage-card .storyPage-CatName {
      text-align: center; }
      .homePage-CardContainer .storyPage-card .storyPage-CatName a {
        position: relative;
        top: -14px;
        background-color: #198feb;
        color: #fff;
        -webkit-border-radius: 30px;
        -moz-border-radius: 30px;
        -o-border-radius: 30px;
        border-radius: 30px;
        padding: 10px 20px 10px 20px;
        font-size: 16px;
        font-family: 'Poppins', sans-serif; }
    .homePage-CardContainer .storyPage-card .storyPage-title {
      padding: 0px 15px 15px 15px !important;
      background-color: #fff; }
      .homePage-CardContainer .storyPage-card .storyPage-title h4 {
        font-size: 24px;
        line-height: 1.2;
        width: auto;
        word-wrap: break-word; }
        .homePage-CardContainer .storyPage-card .storyPage-title h4 a {
          color: #000;
              font-family: 'Cabin', sans-serif; font-weight: 600;}
      .homePage-CardContainer .storyPage-card .storyPage-title .storyPage-storyWriter {
        padding: 0px !important;
        margin-top: 10px; }
        .homePage-CardContainer .storyPage-card .storyPage-title .storyPage-storyWriter .writerImg {
          width: 40px;
          height: 40px;
          background-size: cover;
          background-position: 50% 10%;
          background-repeat: no-repeat;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          -o-border-radius: 50%;
          float: left; }
        .homePage-CardContainer .storyPage-card .storyPage-title .storyPage-storyWriter p {
          float: left;
          padding-left: 10px;
          padding-top: 8px;
          font-size: 16px;
          color: #a8a79f; margin: 0px;}
      .homePage-CardContainer .storyPage-card .storyPage-title .storyWriter-meta {
        padding-top: 10px;
        padding-left: 0px; }
        .homePage-CardContainer .storyPage-card .storyPage-title .storyWriter-meta ul {
          display: -webkit-inline-box;
          margin: 0px; }
          .homePage-CardContainer .storyPage-card .storyPage-title .storyWriter-meta ul li {
            padding-right: 10px;
            color: #9a9a9a; }
            .homePage-CardContainer .storyPage-card .storyPage-title .storyWriter-meta ul li svg {
              position: relative;
              top: 3px; }
              .homePage-CardContainer .storyPage-card .storyPage-title .storyWriter-meta ul li svg .cls-1 {
                fill: #9a9a9a;
                fill-rule: evenodd; }
            .homePage-CardContainer .storyPage-card .storyPage-title .storyWriter-meta ul li span {
              color: #9a9a9a; }
    .homePage-CardContainer .storyPage-card .storyCategoryCard-caption {
      padding: 5px 15px 10px 15px !important; }
      .homePage-CardContainer .storyPage-card .storyCategoryCard-caption .storyCategoryCard-storyWriter {
        margin-top: 5px; }

.homePage-list {
  margin-top: 49px; }

.loader {
  text-align: center;
  position: relative;
  top: 5px;
  clear: both; }

.headerFixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999; }

/*HomePageCssEnd*/

/*          Story Category Page
=========================================*/
.categoryHeader {
  background-image: url("../../assets/images/categoryimage/mobile/categorybanner.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 10%;
  height: 170px;
  background-color: #384650; }
  .categoryHeader .categoryHeaderImg {
    text-align: center;
    margin-top: 25px; }
    .categoryHeader .categoryHeaderImg div svg {
      fill: #fff; }
  .categoryHeader .categoryHeaderCaption {
    padding-top: 30px;
    padding-left: 0px;
    text-align: left; }
    .categoryHeader .categoryHeaderCaption h5 {
      font-family: 'Poppins', sans-serif;
      color: #fff;
      font-size: 30px; }
 /*Story Category Page*/
</style>
<!-- Start of categoryHeader-->
<div class="row" style="margin-top:0px;">
    <div class="col s12 categoryHeader" style="background-image: url(<?php echo base_url() . 'assets/images/category_banners/'. slugify($page_name) . '.png';?>)">
        <div class="col s12 categoryHeaderCaption">
            <h5><?php echo $page_name; ?></h5>
        </div>
    </div>
</div>
<!-- Start of categoryHeader-->

<!-- Start of Story category-->
<div class="row  homePage-CardContainer" id="category_story_cards">

</div>
<!-- End of Story category-->


<div class="col s12 storyPage-card storyCategoryCard" id="storyCategoryCard">
			    <div class="storyPage-cardImage storyCategoryCard-img animated-background" style="height: 186px;">
			       
			    </div>
			    <div class="col s12 storyPage-title storyCategoryCard-caption">
			        <h4 class="loaderTitle animated-background"></h4>
			        <h4 class="loaderTitle animated-background"></h4>
			         <span class="animated-background loaderUser"> </span><h6 class="loaderWriter animated-background"></h6>
			        
			    </div>
	</div>
