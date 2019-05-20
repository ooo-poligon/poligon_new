require 'pry'

class MyService
  def initialize(deviceName)
    puts deviceName
    aFinName = parseName(deviceName)
  end

  def parseName(deviceName)
    aName = deviceName.match(/[\+\s]/)
  end
end

=begin
 /* 
  * Парсинг Наименования 
  * получает строку наименования в формате "тип дизайн программа +опция1 +опция2/... etc."
  * отдает массив $aName ([0]=>type, [1]=>design, [2]=>program, [3]=>option (опци без знаков после "/" ), [i]=>etc.)
  */
  function parseName($name)
  { 
    $aName = preg_split("/[\+\s]/", $name); // /[\s,]+/
    $i = 1;
    foreach ($aName as $key => $value) 
    {
      if ( $i > 3){
        $aName[$key] = "+".$value;
        
        if ( substr_count($value, '/') != 0 ) {
          $aName[$key] = "+".strstr($value, '/', true)."/"; // отрезать после слеша
        }
      }
      $i++;
    }
    
    return ($aName);
  }
=end