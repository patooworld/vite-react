var voice = {
  sform: null,
  sfield: null,
  sbtn: null,
  recog: null,
  init: () => {
    voice.sform = document.getElementById("search-form");
    voice.sfield = document.getElementById("search-field");
    voice.sbtn = document.getElementById("search-speech");

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voice.recog = new SpeechRecognition();
        voice.recog.lang = "en-US";
        voice.recog.continuous = false;
        voice.recog.interimResults = false;

        voice.recog.onresult = evt => {
          let said = evt.results[0][0].transcript.toLowerCase();
          voice.sfield.value = said;
          voice.stop();
        };

        voice.recog.onerror = err => console.error(err);

        voice.sbtn.disabled = false;
        voice.sbtn.onclick = voice.start;
      })
      .catch(err => {
        console.error(err);
        voice.sbtn.value = "Please enable access and attach microphone.";
      });
  },
  start: () => {
    voice.recog.start();
    voice.sbtn.onclick = voice.stop;
    voice.sbtn.value = "Speak Now Or Click Again To Cancel";
  },
  stop: () => {
    voice.recog.stop();
    voice.sbtn.onclick = voice.start;
    voice.sbtn.value = "Press to Speak";
  }
};

window.addEventListener("DOMContentLoaded", voice.init);
