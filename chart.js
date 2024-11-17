// Beispielwerte
const exampleEPSS = 0.8;
const exampleCVSS = 9.0;
const exampleRiskScore = 8.5;

// Chart-Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    updateBarChart(exampleEPSS, exampleCVSS, exampleRiskScore);
    updateRadarChart(3, 3, 3, 1);
});

// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
let barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['EPSS', 'CVSS', 'Risikoscore'],
        datasets: [{
            label: 'Werte',
            data: [0, 0, 0],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Radar Chart
const radarCtx = document.getElementById('radarChart').getContext('2d');
let radarChart = new Chart(radarCtx, {
    type: 'radar',
    data: {
        labels: ['Systemzugang', 'Patch-Geschwindigkeit', 'Datenverarbeitung', 'Systemkritikalität'],
        datasets: [{
            label: 'Bewertung',
            data: [0, 0, 0, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true
            }
        }
    }
});

// Charts aktualisieren
function updateBarChart(epss, cvss, riskScore) {
    barChart.data.datasets[0].data = [epss, cvss, riskScore];
    barChart.update();
}

function updateRadarChart(access, patch, data, importance) {
    radarChart.data.datasets[0].data = [access, patch, data, importance];
    radarChart.update();
}
// Funktion zum Anzeigen der Score-Erklärung
function showInfo(scoreType) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');

    let explanation = '';
    if (scoreType === 'EPSS') {
        explanation =
            'EPSS beschreibt die Wahrscheinlichkeit, dass eine Schwachstelle in der Praxis ausgenutzt wird.';
    } else if (scoreType === 'CVSS') {
        explanation =
            'CVSS bewertet die Schwere einer Schwachstelle basierend auf deren Auswirkungen und Zugänglichkeit.';
    } else if (scoreType === 'Risiko') {
        explanation =
            'Der Risikoscore kombiniert die Wahrscheinlichkeit (EPSS) und die Schwere (CVSS) der Schwachstelle.';
    }

    popupText.textContent = explanation;
    popup.classList.remove('hidden');
}

// Funktion zum Schließen des Popups
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}
