import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Api } from '../providers/api';

export class Client {
    
    obj = {
        name:["",Validators.required],
        addressString:["",Validators.required],
        logo:[{
            __type:"File",
            name:"",
            url:""
        }],
        address:[{
            __type:"Pointer",
            className:"Address",
        }],
        phone:["",Validators.required],
        defaultPhone:[{
            __type:"Pointer",
            className:"Phone",
        }],
        emails:[
            [{
                value:"",
                default:true
            }]
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
            for (let f in this.obj) {
                this.obj[f][0] = tmp[f];
            }
        }
    }

    getClientFormObj(){
        return this.obj;
    }
}