import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FacialExpression() {
    const videoRef = useRef();
    
    const [mood, setMood] = useState('🤔 Waiting...');

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => {
                console.error("Error accessing webcam: ", err);
                setMood("❌ Webcam access denied");
            });
    };

    const detectMood = async () => {
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        if (!detections || detections.length === 0) {
            setMood("😶 No face detected");
            return;
        }

        let mostProbable = 0;
        let expression = '';

        for (const key of Object.keys(detections[0].expressions)) {
            const value = detections[0].expressions[key];
            if (value > mostProbable) {
                mostProbable = value;
                expression = key;
            }
        }

        // Emoji mapping
        const emojiMap = {
            happy: "😊",
            sad: "😢",
            angry: "😠",
            surprised: "😮",
            disgusted: "🤢",
            fearful: "😨",
            neutral: "😐"
        };

        const emoji = emojiMap[expression] || '🤔';
        setMood(`${emoji} Mood: ${expression}`);
    };

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className='w-full  px-20 h-[30rem] flex flex-col gap-5' >

           <h1 className='text-3xl capitalize font-bold '> Live Mood Detection  </h1>

           <div className='flex ' >
             
               <div className=' w-1/2 h-full overflow-hidden '>
                <video
                ref={videoRef}
                autoPlay
                muted
               className='w-full h-full rounded-lg  object-cover '
            />
        </div>
                    <div className=' w-1/2 flex items-center relative  flex-col justify-center gap-10 '>

                     <h1 className='text-7xl text-[#54189e]'>   {mood}</h1>

                        <button
                        onClick={detectMood}
                        className='text-[#fff] bg-[#54189e] text-2xl absolute bottom-10 left-15 py-2 px-5 rounded-md '
                        
                        >
                        Detect Mood
                    </button>
                    </div>
           </div>
            
        </div>
    );
}
