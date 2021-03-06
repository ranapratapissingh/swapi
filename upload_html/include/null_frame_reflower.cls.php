<?php
/**
 * @package dompdf
 * @link    //dompdf.github.com/
 * @author  Benj Carson <benjcarson@digitaljunkies.ca>
 * @license //www.gnu.org/copyleft/lesser.html GNU Lesser General Public License
 */

/**
 * Dummy reflower
 *
 * @access private
 * @package dompdf
 */
class Null_Frame_Reflower extends Frame_Reflower {

  function __construct(Frame $frame) { parent::__construct($frame); }

  function reflow(Block_Frame_Decorator $block = null) { return; }
  
}
