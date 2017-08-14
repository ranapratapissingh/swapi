<?php
/**
 * @package dompdf
 * @link    //dompdf.github.com/
 * @author  Benj Carson <benjcarson@digitaljunkies.ca>
 * @license //www.gnu.org/copyleft/lesser.html GNU Lesser General Public License
 */

/**
 * Standard exception thrown by DOMPDF classes
 *
 * @package dompdf
 */
class DOMPDF_Exception extends Exception {

  /**
   * Class constructor
   *
   * @param string $message Error message
   * @param int $code Error code
   */
  function __construct($message = null, $code = 0) {
    parent::__construct($message, $code);
  }

}
