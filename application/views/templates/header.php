<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />

    <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
    <!-- <meta name="theme-color" content="#046fc2" /> -->
    <meta name="msvalidate.01" content="B4918325F21BAD431E9F3AB1AAD21882" />
    <?php 
        if ($main_content == 'story_view') {
           
            $this->load->view('templates/meta_head_story');
        } else {
            $this->load->view('templates/meta_head_website');
        }
     ?>


    <!-- Custome css -->
   
    <link href="https://fonts.googleapis.com/css?family=Cabin|Poppins:300,400,700">

    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/materialize.min.css">

    <style type="text/css">
        /* Header Page*/
        .header-row{margin-bottom:0;max-height:47px}.header{background:#046fc2;padding-top:3px!important;padding-bottom:3px!important;padding-left:0!important}.header .side-barIcon{padding-left:0;padding-top:12px}.header .side-barIcon a{padding:15px 15px 10px}.header .side-barIcon a svg{fill:#fff;fill-rule:evenodd}.header .logo{padding-top:6px;float:left}.header .logo>a{padding:0;display:inline-block}.header .logo>a>svg .cls-1{fill:#fff;fill-rule:evenodd}.header .rightMenu{margin-top:4px;max-width:60px}.header .rightMenu ul{margin:0}.header .rightMenu ul a{color:#fff;vertical-align:top;position:relative;top:1.5px;padding:5px 8px;background-color:#104d7d;display:block}.header .rightMenu ul a svg{fill:#fff;fill-rule:evenodd;top:1px;position:relative}.header .rightMenu .action-dropdown{position:relative;top:0;display:none;background-color:#fff}.header .rightMenu .action-dropdown ul{position:absolute;top:0;right:-2px;z-index:1000;display:block;float:left;min-width:90px;margin:2px 0 0!important;font-size:14px;text-align:left;list-style:none;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);padding:0;border-radius:3px}.header .rightMenu .action-dropdown ul:after,.header .rightMenu .action-dropdown ul:before{content:'';border-right:6px solid transparent;border-left:6px solid transparent;position:absolute;top:-6px;right:14px}.header .rightMenu .action-dropdown ul:after{border-bottom:6px solid #fff}.header .rightMenu .action-dropdown ul:before{border-bottom:6px solid #c5c5c5}.header .rightMenu .action-dropdown ul li{font-size:14px}.header .rightMenu .action-dropdown ul li a{display:block;padding:7px 20px 6px!important;clear:both;font-weight:400;line-height:1.42857143;color:#333!important;white-space:nowrap;background-color:#fff;border-bottom:1px solid #ccc;font-size:15px}.header .rightMenu .action-dropdown ul li a>img{height:10px;margin-right:6px}.header .rightMenu .action-dropdown ul li:last-child a{border-radius:0 0 3px 3px;border:none}@media only screen and (max-width:340px){.footerCategory.FooterPart2{padding:0}.FooterWithCopyRight>li{display:inline-block;margin:3px 2px}.icon-list>li{margin:0;margin-top:12px!important}.app{border-radius:5px;padding:3px 12px;border:none}.appdiv{padding-bottom:6px!important}}
        /* Header end*/
    </style>

    <?php if($main_content != 'story_view'){?>

        <style type="text/css">
        /*----TRENDING CHIPS-------*/
        .trending-tags{padding:8px 15px 8px 0;overflow-x:scroll;white-space:nowrap;border-radius:83px}.wf-chips{background-color:#fff!important;border:1px solid #046fc2!important;margin-bottom:0!important;height:30px;line-height:27px}.wf-chips a{color:rgba(0,0,0,.6)}.bg-tags{background-color:#f9f9f9}.tl-button,.tr-button{height:30px;width:30px;background-color:#046fc2;color:#fff;top:0}.tr-button{right:0;border:none;border-radius:100%}.tl-button{left:0;border:none;border-radius:100%}.tag-icon{padding-top:10px;width:25px;margin-top:3px;padding-right:5px}
        /*----END OF TRENDING CHIPS-------*/
  .caption-top-story,.latest-story-caption{font-family:Cabin,sans-serif;font-weight:900;line-height:1.2;margin-top:10px;margin-bottom:5px;padding:0!important}.caption-top-story{font-size:21px}.latest-story-caption{font-size:20px;height:48px;overflow:hidden}.caption-top-story,.caption-top-story a,.latest-story-caption a{color:#000}.writer-text,.writer-text-read-repeat,.writer-text-top{color:#a0a1a1;font-size:11px;font-family:Cabin,sans-serif;font-weight:400;text-transform:uppercase}.writer-text{padding-bottom:15px;clear:both}.writer-text-read-repeat{padding-bottom:0;line-height:1.3}.writer-text-top{padding-left:0!important;padding-right:0!important;margin-top:0;margin-bottom:20px}.caption-bottom,.caption-top{text-align:left;font-family:Cabin,sans-serif;font-weight:600;margin-bottom:5px;line-height:1.4;height:61px;overflow:hidden}.writer-text-top>a{color:#039be5}.caption-top{color:#000;font-size:15px;margin-top:5px}.caption-bottom{color:#000;font-size:15px!important;margin-top:0;margin-left:5px;padding-right:0}.caption-bottom a{color:#000}.caption-div{overflow:hidden}

        </style>

        <link rel="stylesheet" href="<?php echo base_url();?>assets/css/homepage_v4.css" media="none" onload="if(media!='all')media='all'">
            <noscript><link rel="stylesheet" href="<?php echo base_url();?>assets/css/homepage_v4.css"></noscript>
    <?php }?>

    <?php if($main_content == 'story_view'){?>

        <style type="text/css">.FixShare-FlotBtn ul li a,.FixShare-FlotBtn ul li:nth-child(2) a svg,.FixShare-FlotBtn ul li:nth-child(4) a svg{height:50px;width:50px}.FixShare-FlotBtn{position:fixed;right:23px;bottom:23px;padding-top:15px;margin-bottom:0;z-index:998}.FixShare-FlotBtn a.FlotBtn{background:#046fc2;border:4px solid #198FEB;padding:5px;height:50px;width:50px}.FixShare-FlotBtn a.FlotBtn svg{fill:#fff;fill-rule:evenodd}.FixShare-FlotBtn ul{left:0;right:0;text-align:center;position:absolute;bottom:48px;margin:0;visibility:hidden}.FixShare-FlotBtn ul li:nth-child(1) a{background:#3b5998}.FixShare-FlotBtn ul li:nth-child(2) a{background-color:#4dc247;border-radius:50%;padding:2px 5px 0 0}.FixShare-FlotBtn ul li:nth-child(2) a svg .cls-1{fill:#4dc247}.FixShare-FlotBtn ul li:nth-child(2) a svg .cls-2{fill:#fff;fill-rule:evenodd}.FixShare-FlotBtn ul li:nth-child(3) a{background:#55acee}.FixShare-FlotBtn ul li:nth-child(4) a{background-color:#198feb;padding:2px 5px 0 1px}.FixShare-FlotBtn ul li:nth-child(4) a svg .cls-1{fill:#198feb}.FixShare-FlotBtn ul li:nth-child(4) a svg .cls-2{fill:#fff}.FixShare-FlotBtn ul li:nth-child(4) a svg .cls-2,.FixShare-FlotBtn ul li:nth-child(4) a svg .cls-3{fill-rule:evenodd}.FixShare-FlotBtn ul li:nth-child(4) a svg .cls-3{fill:#c5c5c5}.FixShare-FlotBtn ul li{margin-bottom:15px}.FixShare-FlotBtn ul li a{transition:.1s;padding:2px 5px 0 3px}.FixShare-FlotBtn ul li a img{height:44px}.FixShare-FlotBtn ul li .shareStory-Fbicons .cls-1{fill:#3b5998}.FixShare-FlotBtn ul li .shareStory-Fbicons .cls-2{fill:#fff;fill-rule:evenodd}.FixShare-FlotBtn ul li .shareStory-Twicons .cls-1{fill:#55acee}.FixShare-FlotBtn ul li .shareStory-Twicons .cls-2{fill:#fff;fill-rule:evenodd}.FixShare-FlotBtn ul li .shareStory-Gpicons .cls-1{fill:#dc4e41}.FixShare-FlotBtn ul li .shareStory-Gpicons .cls-2{fill:#fff;fill-rule:evenodd}

        /* above cover image */
        .breadcrumb,.breadcrumb>li{font-family:Lato,sans-serif}.breadcrumb{padding:0 15px 8px;background-color:rgba(0,0,0,0);margin-bottom:0;margin-top:0;text-align:center}.breadcrumb>li+li:before{padding:0 1px;color:#ccc;content:"/\00a0"}.breadcrumb>li{text-transform:uppercase;font-weight:400;font-size:12px;display:inline-block}.storyTitleDes{margin:0}.storyTitleDes .follow-btn-here{padding:0}.storyTitleDes .follow-btn-here ul{margin:0;display:-webkit-inline-box}.storyTitleDes .storyPage-categoryName a,.storyTitleDes .storyPage-categoryName span{margin-left:6px;border-bottom:1px dotted #838383}.storyTitleDes .follow-btn-here ul li{padding-right:5px}.storyTitleDes .storyPage-categoryName{margin-top:10px;margin-bottom:8px;color:#838383;text-transform:uppercase}.storyTitleDes .storyPage-categoryName a{color:#838383;text-transform:uppercase;margin-right:6px}.storyTitleDes .storyPage-creationDate{color:#838383;text-transform:uppercase;float:right;margin-top:10px}.storyTitleDes h1.mainTitle{font-size:24px;line-height:1.3;font-family:Cabin,sans-serif;padding-bottom:10px;font-weight:600;margin:0px;}.storyTitleDes .MainDescription{font-size:18px;font-family:proxima_nova_rgregular}.storyMeta,.storyMeta a.writerName{font-family:Cabin,sans-serif}.storyMeta{padding:0;margin-bottom:10px;margin-top:0;text-transform:uppercase;color:#a0a1a1;position:relative;clear:both;font-size:11px}.storyMeta>ul{list-style:none;padding-left:0;text-align:center}.storyMeta>ul>li{padding:0 8px 0 4px!important;font-size:12px!important;color:#a0a0a0;font-weight:400;display:inline}.storyMeta a.writerName{color:#046fc2;border-bottom:1px dotted #046fc2;padding-bottom:5px}.storyMeta span:last-child{margin-left:5px}p{font-family: Poppins,sans-serif; margin: 0px;}
.MPLNext_coverImage{position:relative;padding:0;margin-bottom:20px;margin-top:7px}.MPLNext_coverImage>div.coverPic{display:block;background-repeat:no-repeat;background-size:cover;background-position:0 50%;height:162px;overflow:hidden;padding:15px}.MPLNext_coverImage .storytitle{text-align:center;padding:2px;z-index:9;left:0;right:0;position:absolute}.MPLNext_coverImage .storytitle>h1{line-height:1.3;color:#fff;margin-top:0;font-size:21px;margin-bottom:10px;font-weight:600;font-family:Cabin,sans-serif}.MPLNext_coverImage .MPLstoryMeta{margin-top:0;font-size:12px;width:100%;text-transform:uppercase;z-index:9;position:absolute;bottom:0;background:rgba(51,51,51,.52);padding:8px 0;left:0}.MPLNext_coverImage .MPLstoryMeta>ul{list-style:none;padding-left:0;text-align:center;margin-bottom:0;margin-top:0}.MPLNext_coverImage .MPLstoryMeta>ul>li{display:inline;color:#fff;font-size:11px;padding:0 7px;font-weight:400}.storyImgBox h3.imgCaption{font-size:20px;padding:0 10px 5px;line-height:1.2;font-family:Poppins,sans-serif;font-weight:600;letter-spacing:.2px}.storyImgBox{margin-bottom:15px}.storyImgBox div.imgCard{position:relative;overflow:hidden;line-height:0;min-height:180px;text-align:center}.storyImgBox div.imgCard .source{position:absolute;right:0;bottom:10px}.storyImgBox div.imgCard .source a{background:rgba(0,0,0,.49);color:#fff;padding:3px 8px;font-size:12px}.storyImgBox div.imgCard>button{position:absolute;top:0;right:0;background:0 0;margin:0;height:30px;line-height:32px;box-shadow:none;padding:0 10px 4px;text-transform:capitalize;background-color:rgba(0,0,0,.49);border-radius:0 0 0 2px}.storyImgBox div.imgCard>button svg{position:relative;top:4px;float:left;right:4px;fill:#fff}.storyImgBox div.singleImg-SahreBox{display:none;position:absolute;top:0;width:100%;bottom:0;background:rgba(51,51,51,.65);height:100%}.storyImgBox ul{margin:0;position:absolute;top:40%;width:100%;display:none}.storyImgBox ul li:nth-child(1)>a svg .cls-1{fill:#fff;fill-rule:evenodd}.storyImgBox ul li:nth-child(1)>a svg .cls-2{fill:#3b5998}.storyImgBox ul li:nth-child(2)>a svg .cls-1{fill:#fff;fill-rule:evenodd}.storyImgBox ul li:nth-child(2)>a svg .cls-2{fill:#bd081c}.storyImgBox ul li:nth-child(3)>a svg .cls-1{fill:#fff}.storyImgBox ul li:nth-child(3)>a svg .cls-1,.storyImgBox ul li:nth-child(3)>a svg .cls-2{fill-rule:evenodd}.storyImgBox ul li:nth-child(3)>a svg .cls-2{fill:#4dc247}.storyImgBox li{width:33.3333%;float:left;transform:translateY(280px);-webkit-transform:translateY(280px);-moz-transform:translateY(280px);-o-transform:translateY(280px);transition:cubic-bezier(.87,-.03,.17,1.22) .5s}.storyImgBox li a{padding:0;height:100px;display:block;width:65px;margin:auto}.storyImgBox div.singleImg_shareInfo{transform:translateY(-40px);-webkit-transform:translateY(-40px);-moz-transform:translateY(-40px);-o-transform:translateY(-40px);transition:linear .2s;background:#046fc2;position:absolute;top:0;width:100%;text-align:center;z-index:9}.storyImgBox div.singleImg_shareInfo h4{font-size:20px;color:#fff;text-align:center;padding:2px 10px 8px}.storyImgBox div.singleImg_shareInfo h4 svg{fill:#fff;position:relative;top:5px}.storyImgBox div.singleImg_shareInfo .closeShareImage{position:absolute;top:-3px;right:5px;color:#fff;padding:0}.storyImgBox div.singleImg_shareInfo .closeShareImage i{padding:0 10px;color:#fff;margin-top:5px;font-size:24px}.storyImgBox div.imgDes{font-size:18px;padding:5px 10px 0;font-family:proxima_nova_rgregular}.storyImgBox div.imgDes>span{color:#ccc;font-size:12px}.storyImgBox div.imgDes>span>a{color:#ccc}.quizOptionWrapper .option{padding:0;margin:0 0 10px}.quizOptionWrapper .option a .selectbox .box{display:table-cell;width:55px;height:55px;text-align:center;background:#198feb;vertical-align:middle}.quizOptionWrapper .option a .selectbox .box img{opacity:.3;text-align:center;vertical-align:middle;font-weight:600;color:#eee}.quizOptionWrapper .option a .selectbox .box-label{display:table-cell;margin:0 10px;vertical-align:middle;text-align:left!important;padding:0 15px}.quizOptionWrapper .option a .selectbox .box-label p{font-size:18px;color:#000;text-transform:capitalize;line-height:1.2;text-align:left!important}.layer{background:rgba(0,0,0,.4);position:absolute;left:0;right:0;bottom:0;top:0}.MPLcountinue-ArticleBtn div.wrapper{padding:0}.MPLcountinue-ArticleBtn div.wrapper a{width:100%;border-radius:0;text-transform:capitalize;font-size:24px;padding:0 15px;background-size:70px;height:70px;line-height:25px;font-weight:300;background-color:#ffba14;border-bottom:5px solid #f59909;border-top:5px solid #ffc948}.MPLcountinue-ArticleBtn div.wrapper a span.book{width:18%;text-align:left}.MPLcountinue-ArticleBtn div.wrapper a span.book svg{top:5px;position:relative;fill:#fff;fill-rule:evenodd}.MPLcountinue-ArticleBtn div.wrapper a p{float:left;margin:7px 0 0;width:70%;text-transform:uppercase;font-size:20px}.MPLcountinue-ArticleBtn div.wrapper a p span{display:block;font-size:14px}.MPLcountinue-ArticleBtn div.wrapper a span.nextArrow svg{float:right;margin-top:10px;fill:#fff;fill-rule:evenodd}
        </style>
    
        <link rel="stylesheet" href="<?php echo base_url();?>assets/css/style_v12.css" media="none" onload="if(media!='all')media='all'">
            <noscript><link rel="stylesheet" href="<?php echo base_url();?>assets/css/style_v12.css"></noscript>
        
    <?php }?>

    <link rel="manifest" href="<?php echo base_url(); ?>manifest_v1.json">
    <style>
        .lean-overlay {
            opacity: 0.7 !important;
        }
    </style>

    <style>
      .lean-overlay{opacity: 0.7 !important;}     
      .spriteIcons {background: url('<?php echo base_url();?>assets/images/newcatlogos.png') no-repeat; width: 48px;height: 30px;display: inline-block;background-size: 34px;top: 6px;position: relative;display: inline-block; overflow: hidden;}
    </style>

</head>
<body>

 <?php 
    $this->load->view('templates/side_nav');
    $this->load->view('templates/header_nav');
?>
<div id="sidenav-ovrlay"></div>