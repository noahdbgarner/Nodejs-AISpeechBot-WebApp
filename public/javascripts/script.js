
//invoke an instance of SpeechRecognition controller interface
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
//this will customize the speech recognition for english
recognition.lang = 'en-US';
//taper the results for less spam
recognition.interimResults = false;
//jQuery to get DOM button ref, and give it a click event
//(this replaces document.querySelector('button').addEventListener("click")...
document.querySelector('button').addEventListener('click', () => {
    recognition.start();
});
//once speech recognition is started, use result event to retrieve speech into array
recognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    console.log('Confidence: ' + e.results[0][0].confidence);
    // We will use the Socket.IO here later…
});
