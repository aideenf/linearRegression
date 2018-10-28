//Creates an array of tensor variables, a weight for each input(X's)
function createWeights(_numWeights) {
  for (var x = 0; x < _numWeights; x++) {
    globalWeightsTensorArr.push(tf.variable(tf.scalar(Math.random())));
    globalWeightsArr[x] = globalWeightsTensorArr[x].dataSync();
  }
  //const a = tf.tensor1d(globalWeights);
}

//Creates a daa set of  _size elements, where each element has _dimension dimensions
function createArrayFromFile(_jsonObj) {
  let xs = [];
  let labels = [];
  var percent = 20;
  //15 1:1 2:0.455 3:0.365 4:0.095 5:0.514 6:0.2245 7:0.101 8:0.15
  //Select a random number of lines here
  //
  var numLines = (_jsonObj.length / 100) * percent;
  //var startCount = random number between 0 and _jsonObj.length - numlines;

  console.log(percent + ' percent Of the data is: ' + numLines + ' lines');

  //for ( var x = 0; x < _jsonObj.length-1; x++)
  for (var x = 0; x < 1; x++) {
    var cols = [];
    var colsA = _jsonObj[x].split(' ');
    labels[x] = colsA[0];

    for (var i = 1; i < colsA.length; i++) {
      colsA[i - 1] = colsA[i].substr(2, colsA[i].length);
      if (colsA[i - 1] != '') cols[i - 1] = colsA[i - 1];
    }
    xs.push(cols);
  }

  createWeights(cols.length);

  globalArrayXs = xs;
  globalArrayYs = labels;
}

function getData(_file, callback) {
  //this will read file and send information to other function
  var xmlhttp;
  var dataSet;
  let resultArray = [];

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
      var lines = xmlhttp.responseText; //here we get all lines from text file
      dataSet = intoArray(lines); //here we call function with parameter "lines"
      createArrayFromFile(JSON.parse(JSON.stringify(dataSet)));
    }
  };
  xmlhttp.open('GET', _file, true);
  xmlhttp.send();
  callback();
}

function intoArray(lines) {
  // splitting all text data into array "\n" is splitting data from each new line
  //and saving each new line as each element*
  var lineArr = lines.split('\n');
  return lineArr;
}
