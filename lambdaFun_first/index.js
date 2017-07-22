'use strict';

var http = require('http');

exports.handler = function(event,context){

    try{
        var request = event.request;

        //request.type
        /*
        i)   LaunchRequest       Ex: "Open greeter"
        ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to John"
        iii) SessionEndedRequest Ex: "exit" or error or timeout
        */

        if(request.type === "LaunchRequest"){
            let options = {};
            options.speechText = "Welcome to AmTran Skill. This is a test skill";
            options.repromptText = "Again to ask for AmTran skill";
            options.endSession = false;

            context.succeed(buildResponse(options));

        } else if(request.type === "IntentRequest") {
            let options = {};
            if(request.intent.name === "GetAmTranSkill") {
                options.speechText = "Thanks for opening AmTran skill, there are many other I can do in the future"; 
                
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

                options.endSession = true;
                context.succeed(buildResponse(options));

            } else if(request.intent.name === "AskAmTran") {
                let name =  request.intent.slots.AMT_PRODUCT.value;
                if( name === "sound bar") {
                  options.speechText = "Sound bar is a kind of audio product which provide better sound quality for the home theater system";
                } else if (name === "speaker") {
                  options.speechText = "Speaker is a kind of portable audio product";
                } else if (name === "TV") {
                  options.speechText = "TV is a kind of display product which can play video signal";
                } else {
                  options.speechText = "Unknow Product type";
                }

                options.endSession = true;
                context.succeed(buildResponse(options));
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
                type: "PlainText",
                text: options.speechText
            },
            shouldEndSession: options.endSession
        }
    };

    if(options.repromptText){
        response.response.repromptText = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
            }
        };
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