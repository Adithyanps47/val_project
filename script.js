// --- SEQUENCE 1: TERMINAL TYPING ---
const logs = [
    { id: 'log-1', text: '> Checking compatibility... [OK]', delay: 800 },
    { id: 'log-2', text: '> Searching for "The One"... [FOUND]', delay: 1800 },
    { id: 'log-3', text: '> Error: Heart Overflow detected.', delay: 2800 }
];

logs.forEach(log => {
    setTimeout(() => {
        const el = document.getElementById(log.id);
        if(el) el.innerText = log.text;
    }, log.delay);
});

setTimeout(() => {
    document.getElementById('question').style.display = 'block';
    document.getElementById('interaction').style.opacity = '1';
}, 3800);


// --- SEQUENCE 2: THE "CLICK" AWAY NO BUTTON ---
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const resetBtn = document.getElementById('resetBtn');
const resetContainer = document.getElementById('resetContainer');

let clickCount = 0;
let yesScale = 1;

// Function to reset the No button to original center position
const resetNoButton = () => {
    // Restore default CSS values
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.zIndex = 'auto';
    
    resetContainer.style.display = 'none'; // Hide failsafe
    clickCount = 4; // Set to 4 so next click triggers the alert
};

noBtn.addEventListener('click', (e) => {
    clickCount++;

    if (clickCount <= 3) {
        // --- JUMP LOGIC ---
        if (noBtn.style.position !== 'fixed') {
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '9999'; 
        }
        
        resetContainer.style.display = 'block';

        const padding = 20; 
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
        
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        yesScale += 0.1; 
        yesBtn.style.transform = `scale(${yesScale})`;

    } else if (clickCount === 4) {
        resetNoButton(); 
        
    } else {
        setTimeout(() => {
            window.alert("Error 403: Forbidden. You are too cute to say no.");
        }, 100);
    }
});

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetNoButton();
});


// --- SEQUENCE 3: STARTING THE NIGHT FLOWERS ---
yesBtn.addEventListener('click', () => {
    document.getElementById('stage1').style.opacity = '0';
    document.body.style.backgroundColor = 'black';
    
    // PLAY AUDIO (Looping)
    const audio = new Audio('munbe_bgm.mp3');
    audio.volume = 0.6;
    audio.loop = true; // <--- THIS MAKES IT LOOP FOREVER
    audio.play().catch(error => console.log("Audio play failed (browser blocked):", error));

    setTimeout(() => {
        document.getElementById('stage1').style.display = 'none';
        document.getElementById('stage2').style.display = 'flex';
        document.querySelector('.night').style.opacity = '1';
        document.body.classList.remove("not-loaded");
        
        // Only fade in the sub-text now
        document.querySelector('.sub-text').style.opacity = '1';

    }, 1000);
});