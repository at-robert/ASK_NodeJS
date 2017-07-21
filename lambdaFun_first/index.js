'use strict';

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
                // let name =  request.intent.slots.ActionItem.value;
                options.speechText = "Thanks for opening AmTran skill, there are many other I can do in the future";
                options.endSession = true;
                context.succeed(buildResponse(options));

            } else {
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