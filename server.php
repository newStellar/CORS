<?php

 $ajaxData  = json_decode(file_get_contents("php://input"));

 if($ajaxData->command == "go"){

 	$str = "contacts{$ajaxData->cnt}.csv";
	$file = fopen($str,"w");

	foreach ($ajaxData->csv as $line)
	{
		fputcsv($file,explode(',',$line));
	}

	fclose($file);

	echo json_encode($str);

 }

 ?>
