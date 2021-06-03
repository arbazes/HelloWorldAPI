var http = require('http');
const { type } = require('os');
var url = require('url');

//intializing http server 
var server = http.createServer(function(req,res){
    
    var parsedURL= url.parse(req.url,true);
    var path = parsedURL.path;
    var trimmedPath =path.replace(/^\/+|\/+$/g, '');
  
    // check router for matching path for a handler 

    var chosenHandler = typeof(router[trimmedPath]) !=='undefined' ? router[trimmedPath] : handlers.notFound;

    //route the request to correct handler
    chosenHandler(function(statusCode,payload){
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        payload = typeof(payload)=='object' ? payload : {};

        var payloadString = JSON.stringify(payload);

        //Return the response
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log('Retruning this response' ,statusCode,payloadString);


    } );



});

//start the http server 

server.listen(3000,function(){
    console.log('server is up now ');
});


// define the handlers

var handlers ={};

//hello handler

handlers.hello= function(callback){
    callback(200,{'message':'Hello World'});
};

//not found handler
handlers.notFound= function(callback){
    callback(404);
};

//defining the request router 

var router={
    'hello' : handlers.hello
};


