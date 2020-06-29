<template>
   <div>
       <div class="q-pa-md">Hello! <b>{{ $user_info.full_name }}</b></div>
       <q-input type="file" v-model="pic"></q-input>
       <q-btn label="send pic" @click="submit" outlined></q-btn>
       <q-btn label="test" @click="testing"></q-btn>

       
   </div>
</template>

<script>
import { postUserList }                         from '../../references/url';
import { postAddPerson }                  from '../../references/url';
import axios from 'axios';
// import {AjaxClient} from 'ajax-client'

function getBase64 (file, callback) {

    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));

    reader.readAsDataURL(file);
}

export default
{
    data:() =>
    ({
        pic: "",
        img64: "",
        details: {},
    }),
    mounted()
    {
        this.getUserList();
    },
    methods:
    {
        async getUserList()
        {
            let res = await this.$_post(postUserList);
            console.log(postUserList);
        },
        async submit()
        {
               
        //     getBase64(this.pic[0],async function(base64Data){
            
        // });
                    
            const formData = new FormData();
            formData.append('image',this.pic[0]); 
            // console.log(formData.entries().next())
            let res = await this.$_post_file(postAddPerson, formData);
            
        },


        
        testing(){
            var formData = new FormData();
            console.log("Asd")
            formData.append("pass", "123456");
            formData.append("length", "50"); // number 123456 is immediately converted to a string "123456"
            formData.append("index", "0"); // number 123456 is immediately converted to a string "123456"
            
            // HTML file input, chosen by user
            // formData.append("userfile", fileInputElement.files[0]);

            // JavaScript file-like object
            // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
            // var blob = new Blob([content], { type: "text/xml"});
            // Access-Control-Allow-Origin: *;
            // formData.append("webmasterfile", blob);

            var request = new XMLHttpRequest();
            request.open("POST", "http://192.168.254.107:8080/person/findByPage");
            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(request.responseText);
                }
            }
            request.send(formData);
        }      
    },
}
</script>
