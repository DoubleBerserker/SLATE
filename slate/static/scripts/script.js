//Mediapipe Landmarks Function
import {
  HandLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision";    // Try using specific version if this doesn't work: 0.10.0 or 0.10.14

let handLandmarker = undefined      // Mediapipe model loaded with options. Use .detect(~~img~~) for landmarks.
let image = undefined   // Temporary for testing purposes. Delete later

async function createHandLandmarker() {
    const vision = await
        FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );

    handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
        },
        runningMode: "IMAGE", // Change this for Image --> Webcam Input
        numHands: 1
    });
}
createHandLandmarker();

let results = handLandmarker.detect(image);

const canvasCtx = canvas
const drawingUtils = new DrawingUtils()




// // Generating Webcam Stream
// const webcamView = document.getElementById("webcamVideo");
//
// navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//     webcamView.srcObject = stream;
// })