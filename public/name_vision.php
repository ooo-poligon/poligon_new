<?php
	require_once ("db_inc.php"); // функции запросов к БД

  if ($argc > 1) {
    $DeviceName = $argv[1];
  } else {
    $DeviceName = 'N33F E ST022 G2'; // M20 E A1+SA/W+SAK
  }
	
	
	echo "<b style='color: #009900;'>Ниже дана расшифровка типа - ".$DeviceName.".</b><br /><br />";
  $aFinName = parseName($DeviceName);
	$idType = getIdType($aFinName[0]);
	$aTypeProperties = allProperties($idType);

  echo "<b style='color: #000099;'>Общие свойства</b><br /><br />";	
	
	echo '<table style="border: solid 1px;">';
	showProperties ($aTypeProperties);
	echo '</table><br /><br />';
	
  echo "<b style='color: #000099;'>Информация о корпусе (способе монтажа)</b>
    <p style='color: #000099;'>* изображение не отражает информация о доп. опциях (лицевая панель и все опции показаны ниже)</p>";

	$idDesign = getIdComposite($aFinName[0], $aFinName[1]); // передаем (Тип, Исполнение)
	$aDesignProperties = allProperties($idDesign);
	echo '<table class="k-table" style="border: solid 1px;">';
	showProperties ($aDesignProperties, 1, $aFinName[1]);
	echo '</table><br /><br />';
	
  echo "<b style='color: #000099;'>Информация о программе коммутации</b>";

	$idProgram = getIdComposite($aFinName[0], $aFinName[2]); // передаем (Тип, Программу)
	$aProgramProperties = allProperties($idProgram);
  $programma = $aProgramProperties["Программа переключения"];
	echo '<table class="k-table" style="border: solid 1px;">';
	showProperties ($aProgramProperties, 2, $aFinName[2], $programma);
	echo '</table><br /><br />';
	


	/*	Цикл для опций */
	
  echo "<b style='color: #000099;'>Данное изделие уже включает следующие опции:</b>";

	$options = count($aFinName) - 3;

	if ($options != 0)
	{
		for($i = 3; $i < count($aFinName); $i++)
		{
			$idOption = getIdOption($aFinName[0], $aFinName[1], $aFinName[$i]); // передаем (Тип, Исполнение, Опцию)
			$aOptionProperties = allProperties($idOption);
			echo '<table class="k-table" style="border: solid 1px;">';
			showPropertiesOption ($aOptionProperties, $aFinName[3]);
			echo '</table><br /><br />';
		}
	}

/*	=== Functions ===  */	
	
	/* 
	*	Парсинг Наименования 
	*	получает строку наименования в формате "тип дизайн программа +опция1 +опция2/... etc."
	*	отдает массив $aName ([0]=>type, [1]=>design, [2]=>program, [3]=>option (опци без знаков после "/" ), [i]=>etc.)
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
	
	/* 
	*	Получение id значения Типа в property_values по Названию Типа
	*/
	function getIdType($type)
	{	
		$sql = "SELECT id FROM property_values WHERE value = '".$type."'";
    $propertyValues = GetOneRecord($sql);

		return $propertyValues['id'];
	}	
	
	/* 
	*	Получение id Свойства Дизайн или Программа в property_values по Названию для нужного Типа 
	*	Принцип множественных св-в 
	*/
	function getIdComposite($type, $name)
	{	
		$sql = "SELECT * FROM 	property_values AS n, 
								property_values AS t 
								WHERE (n.value = '".$name."' OR n.value = 'All') AND t.value = '".$type."' AND t.composite_to_id = n.id";
		$propertyValues = GetOneRecord($sql);
		
		return $propertyValues['composite_to_id'];
	}	
	
	/* 
	*	Получение id Свойства Опции в property_values по Названию для нужного Типа и Дизайна (Дизайн может иметь как собственное имя так и "All")
	*	Принцип множественных св-в 
	*/
	function getIdOption($type, $design, $name)
	{	
		$sql = "SELECT * FROM 	property_values AS n, 
								property_values AS t,
								property_values AS d
								WHERE n.value = '".$name."' 
								AND t.value = '".$type."' AND t.composite_to_id = n.id
								AND (d.value = '".$design."' OR d.value = 'All') AND d.composite_to_id = n.id
								";
		$propertyValues = GetOneRecord($sql);
		
		return $propertyValues['composite_to_id'];
	}
	
	/* 
	*	Набор св-в по id в массив ([дизайн]=>Е, [размер]=>30х30, [фото]=>img.png [типы]=>arr( [0]=>М4, [1]=>М10 ));
	*/
	function allProperties($valueId)
	{
		$aProperties = array();	// массив свойств
		$aSort = array();		// массив для сортировки

		$sql = "SELECT * FROM property_values WHERE id =".$valueId; // значение композита
		$aPropertyValues = GetOneRecord($sql);
		$sql = "SELECT * FROM properties WHERE id =".$aPropertyValues['property_id']; // наименование композита
		$aPropertyNames = GetOneRecord($sql);

		$sql = "SELECT * FROM property_values WHERE composite_to_id = ".$valueId; // все св-ва принадлежащие композиту
		$aIncludeValues = GetRecords($sql);
			
		$multiId = 0;
		$currentId = 0;
		
		// Поиск id множествнного св-ва (св-ва будут массивом в Итоговом массиве: [типы]=>arr( [0]=>М4, [1]=>М10 ))
		for($i = 0; $i < count($aIncludeValues); $i++) 
		{						
			if ( $aIncludeValues[$i]['property_id'] != $currentId )
			{
				$currentId = $aIncludeValues[$i]['property_id'];
			}
			else 
			{
				$multiId = $aIncludeValues[$i]['property_id']; // если в БД будет несколько множествнных св-в $multiId сделать массивом
			}
		}
		
		// Итоговый массив - наименования и значения св-в
		for($i = 0; $i < count($aIncludeValues); $i++) 
		{						
			$sql = "SELECT * FROM properties WHERE id = ".$aIncludeValues[$i]['property_id'];
			$aIncludeNames = GetOneRecord($sql);
			
			if ( $aIncludeValues[$i]['property_id'] == $multiId ) // множественное св-во в свой массив [имя] => ([0]=значение, ...)
			{
				$aProperties[$aIncludeNames['title']][] = $aIncludeValues[$i]['value'];
			}
			else // простое св-во [имя]=значение
			{						
				$aProperties[$aIncludeNames['title']] = $aIncludeValues[$i]['value']; 
			}
		}	
		
		// Массив для сортировки
		$sql = "SELECT * FROM properties WHERE parent_id = ".$aPropertyNames['id']; // все св-ва принадлежащие композиту
		$aIncludeNamesSort = GetRecords($sql);
		
		for($i = 0; $i < count($aIncludeNamesSort); $i++)
		{
			$aSort[$i] = $aIncludeNamesSort[$i]['sorting'];
		}

		// Сортировка итогового массива св-в соотв-но sorting 
		array_multisort($aSort, SORT_ASC, $aProperties); 	// SORT_DESC - reverse
		
		// Наименование и значение композита в начало итогового массива, [имя]=>значение
		$aProperties = array($aPropertyNames['title'] => $aPropertyValues['value']) + $aProperties;
		
		return $aProperties;
	}
	
	/* 
	*	Отображение св-в из массива
	*/		
	function showProperties ($aProperties, $type = NULL, $alt = NULL, $programma = NULL) 
	{
		foreach($aProperties as $key => $value)
		{
			// Mult - Множественное св-во
			if ( is_array($value) and array_key_exists(0, $value) ) 
			{
				
			} 
			// Simple - Простое св-во
			else 
			{ 
        
        if ($key == "Изображение") {
          showTableRow ($value, $key, $type, $alt, 1);
        } elseif (strstr($key, 'Габаритный чертеж')) {
          showTableRow ($value, $key, $type, $alt, 2);
        } elseif (strstr($key, 'Схема подключения')) {
          showTableRow ($value, $key, $type, $alt, 3, $programma);
        } elseif (strstr($key, 'Лицевая панель (стандартная)')){
          showTableRow ($value, $key, $type, $alt, 4, $programma);
        } elseif (strstr($key, 'Лицевая панель (дополнительная')) {
          showTableRow ($value, $key, $type, $alt, 5, $programma);
        } else {
          showTableRow ($value, $key, $type, $alt);
        }
			}
		}
	}
	
	/* 
	*	Отображение св-в Опции из массива (разница в пути к картинкам - вызов showTableRowOption)
	*/		
	function showPropertiesOption ($aProperties, $alt) 
	{
		foreach($aProperties as $key => $value)
		{
			// Mult - Множественное св-во
			if ( is_array($value) and array_key_exists(0, $value) ) 
			{
				//echo '<tr><td colspan="2"> = Find Mult = <td></tr>';
			} 
			// Simple - Простое св-во
			else 
			{ if (strstr($key, 'Изображение опции')) {
          showTableRowOption ($value, $key, 1, $alt);
        } elseif (strstr($key, 'Схема опции')) {
          showTableRowOption ($value, $key, 2, $alt);
        } elseif (strstr($key, 'Габаритный чертеж')) {
          showTableRowOption ($value, $key, 3, $alt);
        } else {
          showTableRowOption ($value, $key);
        }

      
			}
		}
	}
	/* 
	*	Вывод строки таблицы Дизайна или Программы
	*/
	function showTableRow ($value, $key, $type = NULL, $alt = NULL, $param = NULL, $programma = NULL)

	{
		if ($value != '')
		{
			echo "<tr><td>".$key."</td><td>";
			if ( preg_match('/^(.*\.(?!(jpg|png)$))?[^.]*$/i', $value) )
			{
				echo ($value); // вывод с htmlspecialchars если нет html в описаниях, сейчас в БД есть html
			}
			else 
			{  
        if ( $type == 1 && !empty($alt) && $param == 1 ) {
          echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Кулачковые выключатели, исполнение '.$alt.' - Общий вид (без опций)"></a>';
        } elseif ( $type == 1 && !empty($alt) && $param == 2 ) {
           echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Кулачковые выключатели, исполнение '.$alt.' - Габаритный чертеж (без опций)"></a>';
        } elseif ( $type == 2 && !empty($alt) && $param == 3 ) {
           echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Программа '.$alt.' - '.$programma.' - схема подключения"></a>';
        } elseif ( $type == 2 && !empty($alt) && $param == 4 ) {
           echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Программа '.$alt.' - '.$programma.' - стандартная лицевая панель"></a>';
        } elseif ( $type == 2 && !empty($alt) && $param == 5 ) {
           echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Программа '.$alt.' - '.$programma.' - опциональная лицевая панель"></a>';
        } else {
          echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;"></a>';
        
        }

			}
			echo "</td></tr>";
		}
	}
	
	/* 
	*	Вывод строки таблицы Опции (разница с предыдущей - путь к картинкам)
	*/
	function showTableRowOption ($value, $key, $type = NULL, $alt = NULL)
	{
		if ($value != '')
		{
			echo "<tr><td>".$key."</td><td>";
			if ( preg_match('/^(.*\.(?!(jpg|png)$))?[^.]*$/i', $value) )
			{
				echo ($value); // вывод с htmlspecialchars если нет html в описаниях, сейчас в БД есть html
			}
			else 
			{ 
        if ( $type == 1 && !empty($alt) ) {
          echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/options/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Опция '.$alt.' для кулчакового переключателя - изображение"></a>';
        }
        elseif ( $type == 2 && !empty($alt) ) {
          echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/options/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Опция '.$alt.' для кулчакового переключателя - схема опции"></a>';
        }
        elseif ( $type == 3 && !empty($alt) ) {
          echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/options/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;" alt="Опция '.$alt.' для кулчакового переключателя - габаритный чертеж"></a>';
        } else {
          echo '<a data-fancybox="gallery" href=https://poligon.info/images/automated/kulachkovie_perekluchateli/'.htmlspecialchars($value).' ><img src=https://poligon.info/images/automated/kulachkovie_perekluchateli/options/'.htmlspecialchars($value).' style = "max-width:140px; max-height:140px;"></a>';
        }
				
			}
			echo "</td></tr>";
		}
	}
	
/*	==========  */
	
?>
