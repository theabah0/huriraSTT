if ("webkitSpeechRecognition" in window) {

function scrollToBottom() { const messagesContainer = document.querySelector('.innerBody'); messagesContainer.scrollTop = messagesContainer.scrollHeight; }
//toggle settings menu
function settingToggle(){
let settings = document.querySelector('.settings')
if (settings.style.display=="none"){
    settings.style.display="block"
}else{
    settings.style.display="none"
}
   //copy to clipboard functionality
    function copyToCB{

    }
}
   // chat functionality 
    chatContainer= document.querySelector("#chatContainer")
     function createUserMessage(interim_transcript) {
  const chatBubble = document.createElement('div'); 
chatBubble.classList.add('text-light'); chatBubble.classList.add('chat-bubble');
  chatBubble.innerText = interim_transcript + " ";
  chatContainer.appendChild(chatBubble);
} 
//web speech api config and setting parameters
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;
//on start 
  speechRecognition.onstart = () => {
    document.querySelector("#status").innerText = "Listening ...";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").innerText = "Error";
    console.log("Speech Recognition Error");
  };
  //on result
  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
    //  if (event.results[i].isFinal) {
     /*   final_transcript += event.results[i][0].transcript;
      } else {*/
       interim_transcript += event.results[i][0].transcript;
       
     // }
    }
 
  //on end
  speechRecognition.onend = () => {
    document.querySelector("#status").innerHTML = "Tap fly to speak.";
    
  document.querySelector("#interim").innerText=""; createUserMessage(interim_transcript);
scrollToBottom();
    console.log("Speech Recognition Ended");
  };
//createUserMessage(interim_transcript)
 //document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
  };

  
} else {
  document.querySelector('body').innerHTML="<h1>Speech Recognition Not Available</h1>";
}
