import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Api } from '../providers/api';

export class Client {
    
    obj = {
        name:["",Validators.required],
        addressString:["",Validators.required],
        profilePic:[""],
        address:[{
            __type:"Pointer",
            className:"Address",
        }],
        phone:["",Validators.required],
        defaultPhone:[{
            __type:"Pointer",
            className:"Phone",
        }],
        email:["",Validators.email],
        emails:[
            
        ],
        addresses:[{
            __type:"Relation",
            className:"Address"
        }],
        phones:[{
            __type:"Relation",
            className:"Phone"
        }],
        username:["",Validators.required],
        password:["",Validators.required]
    }

    constructor(
        private client?: any
    ){
        if(client){
            var tmp = client.toJSON();
            for (let f in tmp) {
                if(this.obj[f]){
                    this.obj[f][0] = tmp[f];
                }else{
                    this.obj[f] = tmp[f];
                }
            }
            this.obj["username"]=[""];
            this.obj["password"]=[""];
            // console.log(this.obj);
        }
    }

    getClientFormObj(){
        return this.obj;
    }
}