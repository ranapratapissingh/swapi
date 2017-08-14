	<!-- Website Information -->
	<title><?php if(isset($title) && $title != ''){ echo $title; } else { echo "SWAPI";}?></title>
	<link rel="icon" href="<?php echo base_url();?>assets/images/favicon.ico">
	<meta name="description" content="<?php if(isset($description) && $description != ''){ echo $description;} else { echo "No description"; } ?>">
	<meta name="keywords" content="<?php if(isset($keyword) && $keyword != ''){ echo $keyword;} else{ echo "SWAPI keywords";} ?>">

	<meta name="p:domain_verify" content="1db3abf8e9d4097f6c7629858a4e0de2">

	<!-- Facebook OG meta -->
	<meta property="og:type" content="website">
	<meta property="og:title" content="<?php if(isset($title)){ echo $title;} else { echo "SWAPI App";}?>">
	<meta property="og:url" content="<?php if(isset($pagename)){ echo 'http://'.$_SERVER['HTTP_HOST'].'/'.$pagename;} else {echo 'http://'.$_SERVER['HTTP_HOST'].'/';}?>">
	<meta property="og:image" content="">
	<meta property="og:image:width" content="210">
	<meta property="og:image:height" content="210">
	<meta property="og:description" content="<?php if(isset($description)){ echo $description;} else { echo 'No description';}?>">
	<meta property="og:site_name" content="SWAPI.com">
	<meta property="article:author" content="https://www.facebook.com/SWAPI">
	<meta property="article:publisher" content="https://www.facebook.com/SWAPI">
	<meta property="article:section" content="SWAPI">

	<!-- Twitter Card meta -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:account_id" content="7373739287339292">
	<meta name="twitter:site" content="@SWAPI">
	<meta name="twitter:creator" content="@SWAPI">
	<meta name="twitter:url" content="<?php if(isset($pagename)){ echo '//'.$_SERVER['HTTP_HOST'].'/'.$pagename;} else {echo '//'.$_SERVER['HTTP_HOST'].'/';}?>">
	<meta name="twitter:title" content="<?php if(isset($title)){ echo $title;} else { echo "No title";}?>">
	<meta name="twitter:description" content="<?php if(isset($description)){ echo $description;} else { echo 'No description';}?>">
	<meta name="twitter:image:src" content="<?php if(isset($meta_image)){ echo $meta_image; } else { echo 'No image'; } ?>">
	<meta name="twitter:image:width" content="210">
	<meta name="twitter:image:height" content="210">    

	<!-- Mobile Settings -->
	<meta name="HandheldFriendly" content="true" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
	<meta name="apple-mobile-web-app-title" content="SWAPI" />
	<meta name="apple-mobile-web-app-capable" content="no" />
	<meta name="msapplication-TileImage" content="Content/ico/apple-touch-icon-210-precomposed.jpg" />
	<meta name="msapplication-TileColor" content="#FFF" />
	<meta name="theme-color" content="#046fc2">
	<meta name="msapplication-navbutton-color" content="#046fc2">
	<link rel="apple-touch-startup-image" href="<?php echo base_url(); ?>assets/images/logo.png">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

	<meta name="version" content="2016-02-24_151403_30">

	<script type="application/ld+json">
	{
	    "@context": "https://schema.org","@type":"Webpage","headline":"SWAPI","url": "http://www.SWAPI.com/","thumbnailUrl": "<?php echo base_url();?>images/SWAPI.svg","dateCreated": "2015-01-12 T13:00:00Z","potentialAction": {"@type": "SearchAction","target": "<?php echo base_url();?>search?q={search_term}","query-input": "required name=search_term"},"keywords": ["Social Networking","Social Media","News","Web","Technology","Web 2.0","Tech","Information","Blog","Facebook","YouTube","Google","Top"],"creator": ["Psych Crazy Coder"]
	}
	</script>
