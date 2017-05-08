import * as AWS from 'aws-sdk';

export let data = {
    "awsConfig" : initAWS
}

export function initAWS(){
	console.log("initAWS");
	AWS.config.update({
        accessKeyId: "AKIAIHOWY5QSYNLZRAKA",
        secretAccessKey: "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",
        "region": "us-west-2" 
    });
}