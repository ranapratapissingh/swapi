<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit71d946e73c71f1547deee7a8bff19b55
{
    public static $classMap = array (
        'SimpleEmailService' => __DIR__ . '/../..' . '/src/SimpleEmailService.php',
        'SimpleEmailServiceMessage' => __DIR__ . '/../..' . '/src/SimpleEmailServiceMessage.php',
        'SimpleEmailServiceRequest' => __DIR__ . '/../..' . '/src/SimpleEmailServiceRequest.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit71d946e73c71f1547deee7a8bff19b55::$classMap;

        }, null, ClassLoader::class);
    }
}