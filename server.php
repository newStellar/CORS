<?php

 $ajaxData  = json_decode(file_get_contents("php://input"));

 if($ajaxData->command == "go"){

 	$time = date("Y-m-d h.i.s",strtotime('+5 hours'));
 	$str = "csv_files/{$time}.csv";
	$file = fopen($str,"w");

	foreach ($ajaxData->csv as $line)
	{
		fputcsv($file,explode(',',$line));
	}

	fclose($file);

	echo json_encode($str);

 }

 ?>
