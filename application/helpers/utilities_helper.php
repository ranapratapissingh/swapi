<?php 
function normalize_str($str) {    
    $invalid = array('â€™'=>"'", 'â€˜' => "'", '’' => '\'', '‘'=>'\'', '“' => "\"", '”' => "\"", '—' => '-');        
    $str = str_replace(array_keys($invalid), array_values($invalid), $str);        
    return html_entity_decode($str);    
}


function no_html($html) {
    $html = strip_tags($html);
    $html = preg_replace('/[^A-Za-z0-9\. --,]/', ' ', $html);        
    $html = str_replace('&nbsp', '', $html);        
    return $html;
}

function filter_str($str) {
    $invalid = array('â€™'=>"'", 'â€˜' => "'", '’' => '\'', '‘'=>'\'', '“' => "\"", '”' => "\"", '—' => '-', '<p>' => '','</p>' => '','<br>' => '', '</br>' => '',"&nbsp" => '', "<h1>" => '', "</h1>" => '', '<strong>' => '' , '</strong>' => '', ';' => ' ', '"' => '\'',  '>' => '', '<' => '');
    $str = str_replace(array_keys($invalid), array_values($invalid), $str);
    $str = preg_replace('/\s+/', ' ', trim($str));
    return strip_tags($str);
} 



if(!function_exists("clean_xss")){
    function clean_xss($data){
        // Fix &entity\n;
        $data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
        $data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
        $data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
        $data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');

        // Remove any attribute starting with "on" or xmlns
        $data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);

        // Remove javascript: and vbscript: protocols
        $data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
        $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
        $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);

        // Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
        $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
        $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
        $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);

        // Remove namespaced elements (we do not need them)
        $data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);

        do
        {
            // Remove really unwanted tags
            $old_data = $data;
            $data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
        }
        while ($old_data !== $data);

        // we are done...
        return $data;
    }
}

 function slugify($text){  
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);  
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, '-');
        $text = preg_replace('~-+~', '-', $text);
        $text = strtolower($text);
        if (empty($text)) {
          return 'n-a';
        }
        return $text;
}

 function timify($date) {
    $date = strtotime($date);
    $now = time();
    $diff = $now - $date;

    if ($diff < 60){
        return sprintf($diff > 1 ? '%s seconds ago' : 'a second ago', $diff);
    }

    $diff = floor($diff/60);

    if ($diff < 60){
        return sprintf($diff > 1 ? '%s minutes ago' : 'one minute ago', $diff);
    }

    $diff = floor($diff/60);

    if ($diff < 24){
        return sprintf($diff > 1 ? '%s hours ago' : 'an hour ago', $diff);
    }

    $diff = floor($diff/24);

    if ($diff < 7){
        return sprintf($diff > 1 ? '%s days ago' : 'yesterday', $diff);
    }

    if ($diff < 30)
    {
        $diff = floor($diff / 7);

        return sprintf($diff > 1 ? '%s weeks ago' : 'one week ago', $diff);
    }

    $diff = floor($diff/30);

    if ($diff < 12){
        return sprintf($diff > 1 ? '%s months ago' : 'last month', $diff);
    }

    $diff = date('Y', $now) - date('Y', $date);

    return sprintf($diff > 1 ? '%s years ago' : 'last year', $diff);
}




?>