<template>
    <div>
        <div class="q-pa-md">Hello! <b>{{ $user_info.full_name }}</b></div>
        <q-input type="file" v-model="pic"></q-input>
        <q-btn label="send pic" @click="submit" outlined></q-btn>
        <q-btn label="test" @click="testing"></q-btn>   
        <img style="display:none" id='Img1' src='http://localhost:4001/images/eme.jpg-1593484285090.jpg'>
        <q-btn label="create" @click="create"></q-btn>   
        <q-btn label="get Log" @click="getLog"></q-btn>   
    </div>
</template>

<script>
import { postUserList }                         from '../../references/url';
import { postAddPerson }                        from '../../references/url';
import axios from 'axios';
// import {AjaxClient} from 'ajax-client'

function getBase64 (file, callback) {

    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));

    reader.readAsDataURL(file);
}
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

export default
{
    data:() =>
    ({
        pic: "",
        img64: "",
        details: {},
        ip_address: ["192.168.1.177", "192.168.1.116"]
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
               
            
            // console.log(this.pic[0])
            const formData = new FormData();
            formData.append('image',this.pic[0]); 
            // console.log(formData.entries().next())
            console.log(this.pic[0])
            let res = await this.$_post_file(postAddPerson, formData);
            // console.log(res.filename)    

            // console.log(res);
            // getBase64(res ,async function(base64Data){
            // console.log(base64Data);
            // });

            var c = document.createElement('canvas');
            var img = document.getElementById('Img1');
            c.height = img.naturalHeight;
            c.width = img.naturalWidth;
            var ctx = c.getContext('2d');

            ctx.drawImage(img, 0, 0, c.width, c.height);
            this.img64 = c.toDataURL();
            this.img64 = this.img64.replace(/^data:image\/[a-z]+;base64,/, "");
            // console.log(this.img64)
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
            request.open("POST", "http://192.168.1.177:8080/person/findByPage");
            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(JSON.parse(request.responseText));
                }
            }
            request.send(formData);
        },
        create(){
             var formData = new FormData();
            let person={
                imgBase64: this.img64,
                name: "Eimie S. Enriquez",
                person_id: "1234",
                sex: 0,
                group_id: 20,
                phone: 123456,
                email: "",
                ic_card_no: "",
                nation: "",
                native_place: "",
                birth_day: "",
                address: "",
                remarks: "",
                att_flag: 0,
                banci_id: "",
                device_group_ids: "",
                device_group: 1,
                type: 1.1,
                reg_type: 0,
                vipId:"20004",
            }
            formData.append("pass", "123456");
            formData.append("person", "{'imgBase64': '"+this.img64+"', 'name' : 'Eimie S. Enriquez', 'person_id' : '1234', 'sex' : 0, 'group_id' : 20, 'phone' : 123456, 'email' : '', 'ic_card' : '', 'nation' : '', 'native_place' : '', 'birth_day' : '', 'address' : '', 'remarks' : '', 'att_flag' : 0 , 'banci_id' : '', 'device_group_id' : '', 'device_group' : 1, 'type' : 1.1, 'reg_type' : 0, 'vipId': '20004'}" );
        
            
            // HTML file input, chosen by user
            // formData.append("userfile", fileInputElement.files[0]);

            // JavaScript file-like object
            // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
            // var blob = new Blob([content], { type: "text/xml"});
            // Access-Control-Allow-Origin: *;
            // formData.append("webmasterfile", blob);

            this.ip_address.forEach((ret) => {
            var request = new XMLHttpRequest();
            request.open("POST", "http://"+ret+":8080/person/create");
            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(request.responseText);
                    console.log("ulit")
                }
            }
            request.send(formData);
            })
        },
        async getLog(){
                
            var formData = new FormData();
            console.log("Asd")
            formData.append("pass", "123456");
            formData.append("startTime", "2020-06-22 12:00"); // number 123456 is immediately converted to a string "123456"
            formData.append("endTime", "2020-06-30 12:00"); // number 123456 is immediately converted to a string "123456"
            
            // HTML file input, chosen by user
            // formData.append("userfile", fileInputElement.files[0]);

            // JavaScript file-like object
            // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
            // var blob = new Blob([content], { type: "text/xml"});
            // Access-Control-Allow-Origin: *;
            // formData.append("webmasterfile", blob);

            var request = new XMLHttpRequest();
            request.open("POST", "http://192.168.1.177:8080/newFindRecords");
            request.onreadystatechange = function() {
                if (request.readyState == XMLHttpRequest.DONE) {
                    console.log(JSON.parse(request.responseText));
                }
            }
            request.send(formData);

            
        }

    },
}
</script>
