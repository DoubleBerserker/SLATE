//Mediapipe Landmarks Function
import {
  HandLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";    // Try using specific version if this doesn't work: 0.10.0 or 0.10.14

// Mediapipe model loaded with options. Use .detect(~~img~~) for landmarks.
// handLandmarker will be loaded when createHandLandmarker() is called.
let handLandmarker = undefined

async function createHandLandmarker() {
    const vision = await
        FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");

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

const landmarkBtn = document.getElementById("landmarkBtn")
landmarkBtn.addEventListener('click', handleClick);

const imageContainer = document.getElementsByClassName("imageInput");
for (let i = 0; i < imageContainer.length; i++) {
  imageContainer[i].children[0].addEventListener("click", handleClick);
}

// imageContainer[0].children[0].addEventListener("click", handleClick);

export async function handleClick(event) {
    if(!handLandmarker) {
        console.log("Wait for Hand Landmarker to load!");
        return;
    }
    const handLandmarkerResult = handLandmarker.detect(event.target);

    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "canvas");
    canvas.setAttribute("width", event.target.naturalWidth + "px");
    canvas.setAttribute("height", event.target.naturalHeight + "px");
    canvas.style = "left: 0px; top: 0px; width: " + event.target.width + "px; height: " + event.target.height + "px;";

    event.target.parentNode.appendChild(canvas);

    const cxt = canvas.getContext("2d");

    for (const landmarks of handLandmarkerResult.landmarks) {
        // console.log(landmarks);
        drawConnectors(cxt, landmarks, HandLandmarker.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5
        });
        drawLandmarks(cxt, landmarks, {color: "#FF0000", lineWidth: 1});
    }
}