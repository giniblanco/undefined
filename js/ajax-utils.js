(function (global) {
	
	var ajaxUtils = {};

	//check what type of HTTPRequestor object is available in the browser

	function getRequestObject(){
		//for modern browsers
		if (global.XMLHttpRequest) {
			return (new XMLHttpRequest());
		}
		else if (global.ActiveXObject){
			return (new ActiveXObject("MicrosoftXMLHTTP"));
		}
		else {
			global.alert("Ajax is not supported!");
			return(null);
		}
	}

	//function attached to namespace object we created above as we'll be passing it outside

	ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse){  //address where it'll send the GET request and the callback function
		var request = getRequestObject(); //assinging the type of HTTPRequestor to local var 

		//property fired in the HTTPRequestor object when the server responds back
		request.onreadystatechange = 
			function (){
				handleResponse(request, responseHandler, isJsonResponse)};//interim anonymous function **expression** (request, callback function)
		request.open("GET", requestUrl, true); //true to make it asynchronous
		request.send(null);
	};

	function handleResponse (request, responseHandler, isJsonResponse){
		if ((request.readyState == 4 && request.status == 200)) {
			responseHandler(request); //a function that the user of this library provided

			//Default to isJsonResponse = true
			if (isJsonResponse == undefined) {
				isJsonResponse = true;
			}

			if (isJsonResponse) {  //if it's true
				responseHandler(JSON.parse(request.responseText));
			}

			else {
				responseHandler(request.responseText);
			}
		}
	}

	global.$ajaxUtils = ajaxUtils;
})(window);