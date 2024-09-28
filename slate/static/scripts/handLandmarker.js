//Mediapipe Landmarks Function
import {
  HandLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";    // Try using specific version if this doesn't work: 0.10.0 or 0.10.14

const demosSection = document.getElementById("demos");              // Temp

// Mediapipe model loaded with options. Use .detect(~~img~~) for landmarks.
// handLandmarker will be loaded when createHandLandmarker() is called.
let handLandmarker = undefined;
let enableWebcamButton = undefined;
let webcamRunning = false;
let runningMode = 'VIDEO';

async function createHandLandmarker() {
    const vision = await
        FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");

    handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
        },
        runningMode: runningMode, // Change this for Image --> Webcam Input
        numHands: 1
    });
    demosSection.classList.remove("invisible")
} createHandLandmarker();

const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");

// Check if webcam is supported
const hasGetUserMedia = () => !! navigator.mediaDevices?.getUserMedia;
// If supported, add event listener to the button
if(hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
} else {
    console.warn("Webcam is not supported by your browser.");
}

function enableCam(event) {
    if(!handLandmarker){
        console.log("Mediapipe model has not loaded yet!");
        return;
    }

    if(webcamRunning === true){
        webcamRunning = false;
        enableWebcamButton.innerText = "ENABLE PREDICTIONS";
    } else {
        webcamRunning = true;
        enableWebcamButton.innerText = "DISABLE PREDICTIONS";
    }

    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    });
}

let lastVideoTime = -1;
let results = undefined;
console.log(video);
async function predictWebcam() {
    canvasElement.style.width = video.videoWidth;
    canvasElement.style.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;

    let startTime = performance.now();
    if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = handLandmarker.detectForVideo(video, startTime);
    }
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if(results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawConnectors(canvasCtx, landmarks, HandLandmarker.HAND_CONNECTIONS, {
                color: "#00FF00",
                lineWidth: 5
            });
            drawLandmarks(canvasCtx, landmarks, {
                color: "#FF0000",
                lineWidth: 2
            });
        }
    }
    canvasCtx.restore();
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }
}