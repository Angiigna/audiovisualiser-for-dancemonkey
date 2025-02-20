// we are gonna create a self invoking function
(function (){
  //get the audio and canvas element
  const audio = document.querySelector("audio");
  const canvas = document.querySelector("canvas");
  const canvasCtx = canvas.getContext("2d");
  //create audio context using api(Audiocontext)
  const audioCtx = new AudioContext();
  //we are creating an audio source
  const audiosource = audioCtx.createMediaElementSource(audio)
  //Create analyzer using baseaudiocontext api
  const analyser = audioCtx.createAnalyser()
  //Now we need to connect the source to the analyzer and back to the context destination
  audiosource.connect(analyser);
  audiosource.connect(audioCtx.destination)
  //print the analyze frequency
  const bufferLength = analyser.frequencyBinCount
  const freqdata = new Uint8Array(analyser.frequencyBinCount)//this function gives number of frequencies
  //create a function to draw
  function draw(){
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(freqdata);
    canvasCtx.fillStyle = "#121212";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 1.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = freqdata[i] * 0.75;
      canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 2;
    }  
   }
  audio.onplay = () => {
    draw();
  };
})();