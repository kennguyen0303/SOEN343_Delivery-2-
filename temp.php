  <?php

  //Load the file
  $contents = file_get_contents('layout.json');

  //Decode the JSON data into a PHP array.
  $contentsDecoded = json_decode($contents, true);

  $newTemp = $_POST['tempchange'];
  //Modify the counter variable.
  $contentsDecoded['temperature'] = $newTemp;

  //Encode the array back into a JSON string.
  $json = json_encode($contentsDecoded);

  //Save the file.
  file_put_contents('layout.json', $json);
  
  ?>
