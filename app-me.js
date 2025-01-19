let audio;
let isPlaying = false; // État de la musique

function setReminder() {
    const input = document.getElementById("reminderDate").value;
    const resultDiv = document.getElementById("result");
    const pauseButton = document.getElementById("pauseButton");

    if (!input) {
        resultDiv.innerHTML = `<p><strong>Veuillez entrer une date valide.</strong></p>`;
        return;
    }

    const reminderDate = new Date(input);
    const now = new Date();

    if (reminderDate <= now) {
        resultDiv.innerHTML = "La date doit être dans le futur.";
        return;
    }

    audio = new Audio('alarm.mp3');

    // Afficher le jour de la semaine
    const lesJoursDeLaSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const nomDuJour = lesJoursDeLaSemaine[reminderDate.getDay()];

    // Mettre à jour le compte à rebours
    function updateCountdown() {
        const now = new Date();
        const timeDiff = reminderDate - now;

        if (timeDiff <= 0) {
            resultDiv.innerHTML = "Le rappel vient d'etre arrivé";
            audio.play(); 
            isPlaying = true;
            pauseButton.style.display = "inline";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        resultDiv.innerHTML = `
            <p>Aujourdhui est le ${nomDuJour}</p>
            <p><strong>Le temps réstant: ${days} jours ${hours} Heures ${minutes} Minutes ${seconds} secondes</strong></p>`;
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function toggleAudio() {
    const pauseButton = document.getElementById("pauseButton");

    if (isPlaying) {
        audio.pause();
        pauseButton.textContent = "Reprendre";
    } else {
        audio.play();
        pauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying
}