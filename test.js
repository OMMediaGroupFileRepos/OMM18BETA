const { exec } = require('child_process');

// Kleuremoji's voor statusberichten
const emojis = {
  upToDate: '🟩',      // Groen
  updatesAvailable: '🟨', // Geel
  updatesUrgent: '🟧',    // Oranje
  endOfLifeSoon: '🟥',   // Rood
  endOfLife: '⬛'        // Zwart
};

// Variabele om statusbericht op te slaan
let statusMessage = '';

// Voer het Git-commando uit om het aantal commits op de main-branch op te halen
exec('git rev-list --count origin/main..main', (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  // Parse de uitvoer naar een integer
  const commitCount = parseInt(stdout.trim(), 10);

  // Simuleer de end-of-life-status
  const soonEndOfLife = false;
  const endOfLife = false;

  // Controleer end-of-life-status en stel bijbehorende statusbericht in
  if (endOfLife) {
    if (commitCount === 0) {
      statusMessage = `${emojis.endOfLife} This version has reached its End Of Life (EOL). Please upgrade to our latest repository for a better experience.`;
    } else {
      const updateCountText = commitCount === 1 ? 'update' : 'updates';
      statusMessage = `${emojis.endOfLife} This version has reached its End Of Life (EOL). You have ${commitCount} ${updateCountText}. Please upgrade to our latest repository for more updates.`;
    }
  } else if (soonEndOfLife) {
    if (commitCount === 0) {
      statusMessage = `${emojis.endOfLifeSoon} The bot is up-to-date. This version will soon reach its End of Life (EOL).`;
    } else {
      const updateCountText = commitCount === 1 ? 'update' : 'updates';
      statusMessage = `${emojis.endOfLifeSoon} You have ${commitCount} ${updateCountText}. Consider upgrading soon. This version will soon reach its End of Life (EOL).`;
      if (commitCount >= 40) {
        statusMessage += ' Consider updating soon.';
      }
    }
  } else {
    if (commitCount === 0) {
      statusMessage = `${emojis.upToDate} Bot is up-to-date.`;
    } else if (commitCount === 1) {
      statusMessage = `${emojis.updatesAvailable} There is 1 update available.`;
    } else if (commitCount > 1 && commitCount <= 30) {
      statusMessage = `${emojis.updatesAvailable} There are ${commitCount} updates available.`;
    } else if (commitCount > 30 && commitCount < 40) {
      statusMessage = `${emojis.updatesUrgent} There are ${commitCount} updates available.`;
    } else if (commitCount >= 40) {
      statusMessage = `${emojis.updatesUrgent} There are ${commitCount} updates available. We recommend updating as soon as possible.`;
    }
  }

  // Roep de functie aan die de statusbericht verwerkt
  handleStatusMessage(statusMessage);
});

// Functie om de statusbericht te verwerken en weer te geven
function handleStatusMessage(message) {
  // Hier kun je de statusMessage variabele gebruiken zoals je wilt buiten de functie
  console.log(message);
}
