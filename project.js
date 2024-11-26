function goToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.card');
    pages.forEach(page => page.style.display = 'none');

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
}

// Function to open the camera
function openCamera() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoInputs = devices.filter(device => device.kind === 'videoinput');
            if (videoInputs.length === 0) {
                alert('No camera device found!');
                return;
            }

            // Use the first available camera
            const constraints = { video: { deviceId: videoInputs[0].deviceId } };
            return navigator.mediaDevices.getUserMedia(constraints);
        })
        .then(stream => {
            if (!stream) return;

            // Create video container and element
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';

            const videoElement = document.createElement('video');
            videoElement.setAttribute('autoplay', true);
            videoElement.setAttribute('playsinline', true);
            videoElement.srcObject = stream;

            // Append video and close button
            videoContainer.appendChild(videoElement);
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close Camera';
            closeButton.className = 'close-camera-btn';
            closeButton.onclick = () => {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                document.body.removeChild(videoContainer);
            };
            videoContainer.appendChild(closeButton);

            document.body.appendChild(videoContainer);
        })
        .catch(error => {
            alert('Error accessing the camera: ' + error.message);
            console.error('Camera error:', error);
        });
}
function openCamera() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoInputs = devices.filter(device => device.kind === 'videoinput');
            if (videoInputs.length === 0) {
                alert('No camera device found!');
                return;
            }

            // Use the first available camera
            const constraints = { video: { deviceId: videoInputs[0].deviceId } };
            return navigator.mediaDevices.getUserMedia(constraints);
        })
        .then(stream => {
            if (!stream) return;

            // Create video container and element
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';

            const videoElement = document.createElement('video');
            videoElement.setAttribute('autoplay', true);
            videoElement.setAttribute('playsinline', true);
            videoElement.srcObject = stream;

            // Append video and close button
            videoContainer.appendChild(videoElement);
            const closeButton = document.createElement('button');
            closeButton.innerText = 'Close Camera';
            closeButton.className = 'close-camera-btn';
            closeButton.onclick = () => {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                document.body.removeChild(videoContainer);
            };
            videoContainer.appendChild(closeButton);

            document.body.appendChild(videoContainer);
        })
        .catch(error => {
            alert('Error accessing the camera: ' + error.message);
            console.error('Camera error:', error);
        });
}
function startMic() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            // Create microphone container
            const micContainer = document.createElement('div');
            micContainer.className = 'mic-container';

            // Create audio visualizer canvas
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 100;
            micContainer.appendChild(canvas);

            // Create stop microphone button
            const stopButton = document.createElement('button');
            stopButton.innerText = 'Stop Mic';
            stopButton.className = 'stop-mic-btn';
            stopButton.onclick = () => {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                document.body.removeChild(micContainer);
            };
            micContainer.appendChild(stopButton);

            document.body.appendChild(micContainer);

            // Audio visualizer
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            const ctx = canvas.getContext('2d');
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            function draw() {
                analyser.getByteTimeDomainData(dataArray);

                ctx.fillStyle = '#e6f0ff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.lineWidth = 2;
                ctx.strokeStyle = '#3b82f6';

                ctx.beginPath();
                const sliceWidth = canvas.width / dataArray.length;
                let x = 0;

                for (let i = 0; i < dataArray.length; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = v * canvas.height / 2;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();

                requestAnimationFrame(draw);
            }

            draw();
        })
        .catch(error => {
            alert('Error accessing the microphone: ' + error.message);
            console.error('Microphone error:', error);
        });
}
function openFileManager() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click(); // Programmatically click the hidden file input
}

function handleFileSelect(event) {
    const files = event.target.files;
    if (files.length > 0) {
        alert(`You selected: ${files[0].name}`);
        // Perform further processing with the selected file
        console.log('Selected file:', files[0]);
    }
}



