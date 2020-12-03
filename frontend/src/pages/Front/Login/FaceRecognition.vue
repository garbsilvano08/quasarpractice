<template>
  <div class="face-recognition">
    <div class="face-recognition_content">
      <div class="user-add__content-info">
        <div class="content__img-holder">
          <img
            class="content__img img__sm"
            id="imagePreview"
            src="../../../assets/Member/placeholder-img.jpg"
          />
          <input
            style="display:none"
            id="userImage"
            accept="image/*"
            @change="uploadUserImage()"
            ref="useImageUploader"
            type="file"
          >
          <q-btn
            class="btn-upload btn-primary"
            flat
            dense
            no-caps
            label="Upload"
            @click="openFilemanager()"
          ></q-btn>
          <q-btn
            class="btn-upload btn-primary"
            flat
            dense
            no-caps
            label="Compare Image"
            @click="compareImage()"
          ></q-btn>
        </div>
      </div>
      <div
        v-if="this.compared_image"
        align="center"
      >
        <q-img
          :src="compared_image"
          spinner-color="white"
          style="height: 350px; max-width: 350px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
// EXTERNAL CSS
import "./FaceRecognition.scss";
import * as cv from 'opencv4nodejs';
export default
  {
    filters: {},
    data: () => (
      {
        compared_image: 'https://placeimg.com/500/300/nature',

        imgsPath: '',
        imgFiles: '',
        nameMappings: []
      }),
    mounted () {


    },
    methods:
    {
      openFilemanager () {
        this.$refs.useImageUploader.click()
      },
      uploadUserImage () {
        let oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById("userImage").files[0]);
        oFReader.onload = function (oFREvent) {
          document.getElementById("imagePreview").src = oFREvent.target.result;
        };
      },
      compareImage () {
      }
    },
    computed: {}
  }
</script>