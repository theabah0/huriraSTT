document.addEventListener('DOMContentLoaded', function() {
  


if ("webkitSpeechRecognition" in window) {
//animated icon
/*
const icon = document.querySelector("#myIcon");

function handleClick() {
  icon.classList.add("clicked");
}

icon.addEventListener("click", handleClick);

*/
//indent functionality
document.querySelector("#indent").addEventListener("click",()=>{
    document.querySelector("#chatContainer").appendChild(document.createElement('br'))
});

//scrolling to bottom
function scrollToBottom() { const messagesContainer = document.querySelector('.innerBody'); messagesContainer.scrollTop = messagesContainer.scrollHeight; }

//show/hide settings
document.querySelector(".navbar-right").addEventListener("click",()=>{
    settingToggle()
})
function settingToggle(){
let settings = document.querySelector('.settings')
if (settings.style.display=="none"){
    settings.style.display="block"
}else{
    settings.style.display="none"
}
    
}
   // chat functionality 
    chatContainer= document.querySelector("#chatContainer");
     function createUserMessage(interim_transcript) {
  const chatBubble = document.createElement('div'); 
chatBubble.classList.add('text-light'); chatBubble.classList.add('chat-bubble');
//make first letter of capital and add full stop.
  chatBubble.innerText = interim_transcript.charAt(0).toUpperCase() + interim_transcript.slice(1) +". ";
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
    document.querySelector("#status").innerHTML= "Listening ...";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").innerText = "error";
    console.log("Speech Recognition Error");
  };
  //on result
  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
   
       interim_transcript += event.results[i][0].transcript;
       
     
    }
 
  //on end
  speechRecognition.onend = () => {
    document.querySelector("#status").innerText = "Tap fly to talk";
    
  document.querySelector("#interim").innerText=""; createUserMessage(interim_transcript);
scrollToBottom();
    console.log("Speech Recognition Ended");
  };
//createUserMessage(interim_transcript)
 
    document.querySelector("#interim").innerHTML = interim_transcript ;
  };

 //ignition 
  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
  };
  
  
  //copy to clipboard functionality
  
  /* getting the text*/
 var textToCopy =''; 
  console.log(textToCopy);
const copyButton = document.getElementById('copyButton');
  copyButton.addEventListener('click', copyToClipboard);
function show(mess){
    document.querySelector('#cliperr').innerHTML=mess;
}
  function copyToClipboard() {
    
[...document.querySelector("#chatContainer").children].forEach((child)=>{
      textToCopy+=child.innerText;
  } );
  console.log(textToCopy);
    try {
      navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              show('Text copied to clipboard');
              // You can display a success message or perform other actions here
            })
            .catch(err => {
              show('Failed to copy text: ', err);
              show('DOMException: ', err.name);
              // Display an error message or handle the error in an appropriate way
            });
        } else {
          show('Clipboard write permission denied');
          // Display an error message or handle the error in an appropriate way
        }
      });
    } catch (err) {
      show('Clipboard API not supported', err);
      // Display an error message or handle the error in an appropriate way
    }
  }
  
} else {
  alert("Speech Recognition Not Available");
}
});
