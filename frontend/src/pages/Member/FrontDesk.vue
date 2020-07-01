<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-header>
            <q-toolbar>
                <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" /> -->

                <q-toolbar-title>
                   Front Desk
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <div class="registration">
                <div class="title">Registration Form</div> 
            </div>
        </q-page-container>
            <div class="q-pa-md">
                <div>
                    <q-input v-model="id_url" label="ID Url">
                        <q-btn round dense flat @click="checkImage" icon="camera"></q-btn>
                    </q-input>
                    <q-select filled v-model="id_type" :options="options" label="Filled" />

                    <q-img
                    :src="id_url"
                    :ratio="16/9"
                    />
                </div>
                <div v-if="id_class.id_info">
                    <q-input v-model="id_class.id_info.name" label="Full Name"/>
                    <q-input v-model="id_class.id_info.address" label="Address"/>
                    <q-input v-model="id_class.id_info.birthdate" type='date' label="Birthday"/>
                    <q-input v-model="id_class.id_info.gender" label="Gender"/>
                    <q-input v-model="id_class.id_info.id_num" label="ID Number"/>
                </div>
                <!-- {{id_class.id_info}} -->
                <!-- <q-btn @click="check">check</q-btn>
                <q-btn @click="saveImage">save</q-btn> -->
                <canvas border icon="mdi-camera" id="canvas" width="640" height="480"></canvas>
                <!-- <q-btn @click="open_camera = true">save</q-btn> -->
                <!-- <label for="recognition-image-input">Choose image</label> -->
                <!-- <q-uploader
                    :factory="checkImage"
                    color="teal"
                    flat
                    bordered
                    style="max-width: 300px"
                /> -->
                <!-- <input type="file" accept="image/jpeg, image/png" id="recognition-image-input" /><br /> -->
                <q-btn @click="check"> Open Camera</q-btn>
                
                <!-- <label for="recognition-confidence-input">Confidence</label>
                <input type="number" max="100" min="0" id="recognition-confidence-input" value="70" /><br />
                <label for="recognition-progress">File recognition progress:</label>
                <progress id="recognition-progress" max="100" value="0">0%</progress>
                <div id="recognition-text"></div>
                <div id="recognition-images">
                <div id="original-image"></div>
                <div id="labeled-image"></div> -->
            <!-- </div> -->
                
            </div>
            <q-dialog v-model="open_camera">
                <q-card>
                    <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Capture Image</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>

                    <q-card-section>
                        <div class="text-center">
                            <video id="video" width="500" height="500" autoplay></video>
                            <q-btn icon="mdi-camera" @click="takePhoto"  id="snap"></q-btn>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
    </q-layout>
    
</template>
<script>

// Classes
import OpticalReadClass from '../../classes/OpticalReadClass';

export default
{
	data: () =>
	({
        video_details: null,
        open_camera: false,
        id_url: '',
        id_class: new OpticalReadClass(),
        id_type: 'Drivers License',
        options:[
            'Drivers License',
            'Umid ID',
            'Philhealth ID'
        ],
        image: null
	}),
    mounted()
    {
    },
    watch:
    {
        open_camera(val)
        {
            if (val)
            {
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                });
                }
            }
        }
    },

    methods:
    {
        async checkImage(image)
        {
            console.log(this.id_type);
            
            this.$q.loading.show();
            await this.id_class.checkImage(this.id_type, this.id_url)
            this.$q.loading.hide();
            // let data = new FormData()
            // postData.append('path', path);
            // postData.append('file', blob);
            // Tesseract.recognize(
            // this.id_url,
            // 'eng',
            // { logger: m => console.log(m) }
            // ).then(async({ data: { text } })  => {
            //     let text_data = text.split("\n")
            //     await this.$_getIDInformation(text.split("\n"))
            // })

            // return data
        },
        saveImage()
        {
            // const recognitionImageInputElement = document.querySelector(
            // '#recognition-image-input',
            // );
            // const recognitionConfidenceInputElement = document.querySelector(
            // '#recognition-confidence-input',
            // );
            // const recognitionProgressElement = document.querySelector('#recognition-progress');
            // const recognitionTextElement = document.querySelector('#recognition-text');
            // const originalImageElement = document.querySelector('#original-image');
            // const labeledImageElement = document.querySelector('#labeled-image');



            // recognitionImageElement.addEventListener('change', () => {
            // if (!recognitionImageElement.files) {
            // return null;
            // }
            //     const file = recognitionImageElement.files[0];
            //     this.recognize(file)
            // })
            // var canvas1 = document.getElementById("canvas");        
            // if (canvas1.getContext) {
                //     var ctx = canvas1.getContext("2d");                
            //     var myImage = canvas1.toDataURL("image/png");      
            // }
            // var imageElement = document.getElementById("MyPix");  
            // imageElement.src = myImage;  
        },

        recognize(file)
        {
            return tesseract
            .recognize(file, {
                lang: 'eng',
            })
            .progress(({ progress, status }) => {
                if (!progress || !status || status !== 'recognizing text') {
                return null;
                }
            const p = (progress * 100).toFixed(2);
            recognitionProgressElement.textContent = `${status}: ${p}%`;
            recognitionProgressElement.value = p;
            })
        },

        check()
        {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');
            this.open_camera = true
        },
        async takePhoto()
        {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');

            document.getElementById("snap").addEventListener("click", function() {
                context.drawImage(video, 0, 0, 640, 480);

            this.image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            // window.location.href=image;
            console.log(this.image);
            
        });
            // await this.id_class.checkImage(this.id_type, this.image) 
        }
        
    },
}
</script>
<style lang="scss">
.registration {
    background-color: #fff;
    margin: auto;
    width: 600px;
    margin-top: 100px;
    border-radius: 5px;

    .title {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
    }
    .subtitle {
        text-align: center;
        color: #666;
    }
}
</style>
