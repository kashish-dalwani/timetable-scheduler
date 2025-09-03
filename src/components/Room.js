import React, { useRef, useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

function RoomOccupancyDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [occupancy, setOccupancy] = useState(false);
  const [lastOccupancy, setLastOccupancy] = useState(null);

  useEffect(() => {
    cocoSsd.load().then(loadedModel => {
      setModel(loadedModel);
      startVideo();
    });
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Expected error when play is interrupted, handle gracefully
              console.warn("Video play promise rejected:", error);
            });
          }
        }
      }).catch(err => {
        console.error("Error accessing camera: ", err);
      });
  };

  useEffect(() => {
    if (!model || !videoRef.current) return;

    const interval = setInterval(() => {
      detectFrame();
    }, 500);

    return () => clearInterval(interval);
  }, [model]);

  useEffect(() => {
    // Alert only when occupancy changes
    if (lastOccupancy === null) {
      setLastOccupancy(occupancy);
    } else if (occupancy !== lastOccupancy) {
      if (occupancy) {
        alert('Person detected in the room!');
      } else {
        alert('No person detected. The room is available.');
      }
      setLastOccupancy(occupancy);
    }
  }, [occupancy, lastOccupancy]);

  const detectFrame = async () => {
    if (!videoRef.current || videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
      // Video not ready yet, skip this frame
      return;
    }

    const predictions = await model.detect(videoRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let personDetected = false;
    predictions.forEach(pred => {
      if (pred.class === 'person' && pred.score > 0.5) {
        personDetected = true;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 3;
        ctx.strokeRect(...pred.bbox);
        ctx.font = '18px Arial';
        ctx.fillStyle = '#00FFFF';
        ctx.fillText(`Person: ${(pred.score * 100).toFixed(1)}%`, pred.bbox[0], pred.bbox[1] > 10 ? pred.bbox[1] - 5 : 10);
      }
    });

    setOccupancy(personDetected);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Room Occupancy Detection</h2>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <video
          ref={videoRef}
          style={{ width: 600, height: 450, borderRadius: '10px' }}
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: 600, height: 450, pointerEvents: 'none'
          }}
        />
      </div>
      <h3 style={{ marginTop: '12px', color: occupancy ? 'green' : 'red' }}>
        Room is {occupancy ? 'Occupied' : 'Available'}
      </h3>
    </div>
  );
}

export default RoomOccupancyDetector;
