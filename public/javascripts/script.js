//construct IIFE to keep code contained from global object, global is the window
((global) => {

//invoke WebSocket io to emit to the Node.js server
    const socket = io();
//invoke an instance of SpeechRecognition controller interface (double bar)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
//this will customize the speech recognition for english
    recognition.lang = 'en-US';
//taper the results for less spam
    recognition.interimResults = false;
//jQuery to get DOM button ref, and give it a click event
//(this replaces document.querySelector('button').addEventListener("click")...
    $('button').click(() => {
        recognition.start();
    });
//let us know in browser when has started
    recognition.addEventListener('speechstart', () => {
        console.log('Speech has been detected.');
    });
//once speech recognition is started, use result event to retrieve speech into array
    recognition.addEventListener('result', (e) => {
        let last = e.results.length - 1;
        let text = e.results[last][0].transcript;
        console.log('Confidence: ' + e.results[0][0].confidence);
        console.log(text);
        //emit the message, same as send, server js will look for 'chat message'
        socket.emit('chat message', text);
    });

    recognition.addEventListener('speechend', () => {
        recognition.stop();
    });

//we have emitted from app.js, capture the bot reply with this EL
    socket.on('bot reply', (replyText) => {
        if (replyText == '') replyText = '(No answer...)';
        //jquery to post bot reply text sent via app.js
        $('.output').html(replyText);
        //Now lets get the bot to speak!
        synthVoice(replyText);
    });

//give AI a Voice with SpeechSynthesis Interface
    const synthVoice = (text) => {
        const synth = global.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        //fuck. It works.
        console.log(utterance.text);
        synth.speak(utterance);
    }
    //pass in the window object

    (() => {
        console.log("1010101101101")
    })();

    (() => {
        console.log("222222222222")
    })();

})(window);
