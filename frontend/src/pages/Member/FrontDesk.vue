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
            <div>
                <!-- <q-btn @click="check">check</q-btn>
                <q-btn @click="saveImage">save</q-btn>
                <canvas border icon="mdi-camera" id="canvas" width="640" height="480"></canvas> -->
                <q-btn @click="open_camera = true">save</q-btn>
                <!-- <label for="recognition-image-input">Choose image</label> -->
                <q-uploader
                    :factory="checkImage"
                    color="teal"
                    flat
                    bordered
                    style="max-width: 300px"
                />
                <!-- <input type="file" accept="image/jpeg, image/png" id="recognition-image-input" /><br /> -->
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
import Tesseract from 'tesseract.js';

export default
{
	data: () =>
	({
        video_details: null,
        open_camera: false
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
        checkImage(image)
        {
            let data = new FormData()
            postData.append('path', path);
            postData.append('file', blob);
            // Tesseract.recognize(
            // data,
            // 'eng',
            // { logger: m => console.log(m) }
            // ).then(({ data: { text } }) => {
            // console.log(text);
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
        takePhoto()
        {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            var video = document.getElementById('video');

            document.getElementById("snap").addEventListener("click", function() {
                context.drawImage(video, 0, 0, 640, 480);

            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            // window.location.href=image; 
            console.log(typeof(image));
            
        });
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
