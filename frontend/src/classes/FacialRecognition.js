// import all the necessary files
//const cv = require('opencv4nodejs');
// const MDB_USER = require('../models/MDB_USER');
const globals = methods.methods;
// const fs = require('fs');
// const path = require('path');

module.exports = class FacialRecognition
{
    constructor()
    {
        // this.user_list = new MDB_USER()
    }

    async captureImage()
    {
        await this.$_call_gallery()
    }

    async checkimage(image)
    {
        const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
        const getFaceImage = (grayImg) => {
            const faceRects = classifier.detectMultiScale(grayImg).objects;
            if (!faceRects.length) {
                throw new Error('failed to detect faces');
            }
            return grayImg.getRegion(faceRects[0]);
        };
        
        
        const basePath = './images_db';
        
        //Setting the path of the Subject images to train(toCompare);
        const subjectPath = path.resolve(basePath, 'subjects');
        const allFiles = fs.readdirSync(subjectPath);
        
        //Setting the path of the Subject images to match(toMatch);
        const matchPath = path.resolve(basePath, 'match');
        const matchFiles = fs.readdirSync(matchPath);
        
        //Mapping names for result
        const nameMappings = ['chad','garb', 'conan', 'paul'];
        
        
        console.log('toTrain',allFiles);
        console.log('toMatch',matchFiles);
        
        
        //Getting subject images to train, Converting image to gray and resizing it (*required)
        const images = allFiles
            .map(file => path.resolve(subjectPath, file))
            .map(filePath => cv.imread(filePath))
            .map(image => image.bgrToGray())
            .map(getFaceImage)
            .map(faceImg => faceImg.resize(200, 200)); //(Should be equal size to images to match)
        
        //Getting subject images to compare, Converting image to gray and resizing it (*required)
        const matchimg = matchFiles
            .map(file => path.resolve(matchPath, file))
            .map(filePath => cv.imread(filePath))
            .map(image => image.bgrToGray())
            .map(getFaceImage)
            .map(faceImg => faceImg.resize(200, 200)); //(Should be equal size to images to campare)
        
        const isTargetImage = (_, i) => matchFiles[i];
        const isTrainingImage = (_, i) => allFiles[i];
        
        const trainImages = images.filter(isTrainingImage);
        
        const testImages = matchimg.filter(isTargetImage);
        
        //getting the names of specific image to train
        const labels = allFiles.filter(isTrainingImage)
            .map(file => nameMappings.findIndex(name => file.includes(name)));
        
        
        //different types of recognizer
        const eigen = new cv.EigenFaceRecognizer();
        const fisher = new cv.FisherFaceRecognizer();
        const lbph = new cv.LBPHFaceRecognizer();
        
        //training images
        eigen.train(trainImages, labels);
        fisher.train(trainImages, labels);
        lbph.train(trainImages, labels);
        
        
        //predicting image to match with specific recognizers with trained images to compare
        const runPrediction = (recognizer) => {
            testImages.forEach((img) => {
                const result = recognizer.predict(img);
                console.log('predicted: %s, confidence: %s', nameMappings[result.label], result.confidence);
                cv.imshowWait('face', img);
                cv.destroyAllWindows();
            });
        };
        
        console.log('lbph:');
        runPrediction(lbph);
        console.log('fisher:');
        runPrediction(fisher);
        console.log('eigen:');
        runPrediction(eigen);
    }
}
//FrontalFace classifier for face recognition
