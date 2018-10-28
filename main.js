let globalArrayXs = 0;  //inputs
let globalArrayYs = 0;  //labels
let globalTensorXs = 0;
let globalTensorYs = 0;

const globalWeightsTensorArr = []; //the weights(coefficients) as array of tensors
const globalWeightsArr = []; //the weights(coefficients) as normal array

//Create an optimizer, we will use this later. You can play
// with some of these values to see how the model performs.
const numIterations = 75;
const learningRate = 0.5;
const optimiser = tf.train.sgd(learningRate);

function pageLoad() {
	//Read the dataset from the url, convert to JSON Objet and then to Tensor Vectors
	// we will have norml Arrays and Tensor Vectors for the Xs(inputs) the Ys(Labels) and the Coefficients(Weights).
	getData('https://www.csie.ntu.edu.tw/~cjlin/libsvmtools/datasets/regression/abalone', function () {
		//need to determine how the callBack should work! ok for now as everything is loaded on pageload.
	});
}


//The following code constructs a predict function that takes inputs(X's) and returns prediction Y:
// it represents our 'model'. Given an input 'xs' it will try and * predict the appropriate output 'y'.
function predict(_Xs) {
	return tf.tidy(() => {
		for (var x = 0; x < 8; x++)
			globalWeightsArr[x] = globalWeightsTensorArr[x].dataSync();
		const weightTensor = tf.tensor1d(globalWeightsArr);
		const prediction = tf.dot(_Xs, weightTensor);
		return prediction;
	});
}

//The loss function takes the predictions from the predict function
//and the actual lables and adjusts the weights
//the weights are considered to be any tensor variable that impact the function
//We can define a MSE loss function in TensorFlow.js as follows:
function loss(_predictedTensor, _labels) {

	//const meanSquareError = predictions.sub(labels).square().mean();
	//return meanSquareError;
	console.log("loss function  - Result from predicted: " + _predictedTensor);
	console.log("loss function  - labels: " + _labels);
	console.log("loss function  - About to calculate mean square error ");
	const meanSquareError = _predictedTensor.sub(_labels).square().mean();
	//const meanSquareError =  tf.losses.meanSquaredError(_labels, _predictedTensor);
	console.log("loss function -  Mean square error: " + meanSquareError);
	return meanSquareError;
}


function train(xsTensor, ysTensor, numIterations) {

	/*//////OPTIMISER.MINIMISE/////////////
	Minimize takes a function that does two things:
	It predicts y values (predYs) for all the x values using the predict model function
	It returns the mean squared error loss for those predictions using the loss function
	Minimize then automatically adjusts any Variables used by this predict function in order to minimize the
	return value (our loss), in this case the variables are in "globalWeightsTensorArr"
    After running our training loop, a, b, c, and d will contain the coefficient values learned by the model
    after "numIterations" iterations of SGD.
    */

	for (let iter = 0; iter < numIterations; iter++) {
		optimiser.minimize(() => loss(predict(xsTensor), ysTensor))
	}
}

function justDoIt() {

	//******** STEP 1: Called on PageLoad*******
	// The data is read from file during pageLoad() using the getData() function
	//
	//******** STEP 2:*******
	//Random create vriables to hold current best estimates(weights) during pageLoad
	//
	//******** STEP 3:*******
	//
	// Train

	console.log("MAIN  - globalArrayXs: " + globalArrayXs);
	console.log("MAIN  - globalArrayLabels: " + globalArrayYs);

	globalTensorXs = tf.tensor2d(globalArrayXs);
	globalTensorYs = tf.tensor1d(globalArrayYs);

	console.log("MAIN  - globalTensorXs: " + globalTensorXs);
	console.log("MAIN  - globalTensorLabels:: " + globalTensorYs);

	train(globalTensorXs, globalTensorYs, numIterations);


	/* Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
	// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
	// Train the model using the data.
model.fit(globalXs, globalYs, {epochs: 10}).then(() => {
 // Use the model to do inference on a data point the model hasn't seen before:
 /// Open the browser devtools to see the output
model.predict(tf.tensor2d([5], [1, 1])).print();
	});*/
	//**********************/*
}
