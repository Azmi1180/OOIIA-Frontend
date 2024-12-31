const counterDisplay = document.getElementById("counter");
const image = document.getElementById("image");
const audio = document.getElementById("audio");
const counterButton = document.getElementById("counterButton");

const staticImage = "./assets/OOIIACat.png";
const animatedGif = "./assets/OOIIAspin.gif";


async function fetchCounter() {
  try {
    const response = await fetch('/counter'); 
    const data = await response.json();
    console.log('Fetched counter:', data.count);
    counterDisplay.innerText = `Global Count: ${data.count}`;
  } catch (error) {
    console.error('Error fetching counter:', error); 
    counterDisplay.innerText = "Error fetching counter";
  }
}

async function incrementCounter() {
  try {    
    const newAudio = audio.cloneNode(); 
    newAudio.play();
    image.src = animatedGif;

    newAudio.addEventListener("ended", () => {
      image.src = staticImage; 
    });

    const response = await fetch('/counter', { method: 'POST' });
    const data = await response.json();
    console.log('Incremented counter response:', data);
    counterDisplay.innerText = `Global Count: ${data.count}`;
  } catch (error) {
    console.error('Error incrementing counter:', error); 
  }
}
counterButton.addEventListener("click", incrementCounter);

fetchCounter();
