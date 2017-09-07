'use strict';

var http = require('http');

exports.handler = function(event,context){

    try{
        if(process.env.NODE_DEBUG_EN) {
            console.log("[DEBUG_LOG] Request:\n" + JSON.stringify(event,null,2));
        }

        var request = event.request;

        //request.type
        /*
        i)   LaunchRequest       Ex: "Open greeter"
        ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to John"
        iii) SessionEndedRequest Ex: "exit" or error or timeout
        */

        if(request.type === "LaunchRequest"){
            handleLanuchIntent(request,context);
        } else if(request.type === "IntentRequest") {
            
            if(request.intent.name === "GetAmTranSkill") {
                let options = {};
                // options.speechText = "Thanks for opening AmTran skill, there are many other I can do in the future"; 
                options.speechText = "Hello new friends, please tell me your name and we will start register"; 
                
                // get string back URL json file
                // getQuote(function(quote,err) {
                //     if(err) {
                //         context.fail(err);
                //     } else {
                //         options.speechText += quote;
                //         options.endSession = true;
                //         context.succeed(buildResponse(options));
                //     }
                // });

                options.cardTitle = "AmTran Card Title";
                options.cardContent = "AmTran Card Content Test Get";
                options.endSession = true;
                context.succeed(buildResponse(options));

            } else if(request.intent.name === "AskAmTran") {
                handleAmtSkillIntent(request,context);
            } else if(request.intent.name === "AMAZON.HelpIntent") {
                handleHelpIntent(request, context);
            } else if(request.intent.name === "AMAZON.StopIntent") {
                handleStopIntent(request,context);
            }
            else {
                // context.fail("Unknow intent");
                throw "Unknow intent";
            }

        } else if(request.type === "SessionEndedRequest") {
            
        } else {
            // context.fail("Unknown intent type");
            throw "Unknow intent type";
        }
    } catch(e) {
        context.fail("Exception: "+e);
    }

}

function buildResponse(options){

    var response = {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>"+options.speechText+"</speak>"
            },
            shouldEndSession: options.endSession
        }
    };

    if(options.repromptText){
        response.response.reprompt = {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>"+options.repromptText+"</speak>"
            }
        };
    }

    if(options.cardTitle) {
        response.response.card = {
            type: "Simple",
            title: options.cardTitle,
            content: options.cardContent
        }
    }

    if(options.imageUrl) {
        response.response.card.type = "Standard";
        response.response.card.text = options.cardContent;
        response.response.card.image = {
            smallImageUrl: options.imageUrl,
            largeImageUrl: options.imageUrl
        };
    } else {
        response.response.card.content = options.cardContent;
    }

    return response;
}

// function getWish() {
//     var myDate = new Date();
//     var hours = myDate.getUTCHours() - 8;
//     if(hours < 0) {
//         hours = hours + 24;
//     }

//     if(hours < 12) {
//         return "Good Morining. ";
//     } else if(hours < 18) {
//         return "Good afternoon. ";
//     }
// }

function getQuote(callback){
    var url = "http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json";
    var req =  http.get(url, function(res){
        var body = "";

        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function() {
            body = body.replace(/\\/g,'');
            var quote = JSON.parse(body);
            callback(quote.quoteText);
        });

    });

    req.on('error', function(err) {
        callback('',err);
    });
}

function handleLanuchIntent(request,context) {
    let options = {};
    // options.speechText = "AmTran is ready";
    options.speechText = "Hello new friends, please tell me your name and we will start register"; 
    options.repromptText = "Again to ask for AmTran skill";

    options.cardTitle = "AmTran Card Title";
    options.cardContent = "AmTran Card Content Test";

    options.endSession = false;
    context.succeed(buildResponse(options));
}

function handleAmtSkillIntent(request,context) {
    let options = {};

    let name =  request.intent.slots.AMT_PRODUCT.value; 

    options.endSession = true;
    if(( name === "sound bar") || ( name === "soundbar")) {
      options.speechText = "Sound bar is a kind of audio product which provide better sound quality for the home theater system";
    } else if (name === "speaker") {
      options.speechText = "Speaker is a kind of portable audio product";
    } else if ((name === "TV") || (name === "t.v.")) {
      options.speechText = "TV is a kind of display product which can play video signal";
    } else {
      options.speechText = "I don't know what is " + name + " please try a different one";
      options.endSession = false;
    }   

    if(options.endSession === false) {
        options.repromptText = "Again to ask for AmTran skill";
    }
    
    options.cardTitle = "AmTran Card Title";
    options.cardContent = "AmTran Card Content Test" + name;    
    
    context.succeed(buildResponse(options));
}

function handleHelpIntent(request,context) {
    let options = {};

    options.cardTitle = "AmTran Card Title";
    options.cardContent = "AmTran Card Content Test Help";
    
    options.speechText = "AmTran help function";
    options.endSession = true;
    context.succeed(buildResponse(options));    
}

function handleStopIntent(request,context) {
    let options = {};
    
    options.cardTitle = "AmTran Card Title";
    options.cardContent = "AmTran Card Content Test Stop";
    
    options.speechText = "AmTran Stop function";
    options.endSession = true;
    context.succeed(buildResponse(options));    
}