document.getElementById('calculate-score').addEventListener('click', () => {
    // Formulardaten erfassen
    const systemImportance = parseFloat(document.getElementById('system-importance').value);
    const dataSensitivity = parseFloat(document.getElementById('data-sensitivity').value);
    const systemAccess = parseFloat(document.getElementById('system-access').value);
    const patchSpeed = parseFloat(document.getElementById('patch-speed').value);

    // Beispielrechnung für die Werte
    const epss = calculateEPSS(systemAccess, patchSpeed);
    const cvss = calculateCVSS(dataSensitivity, systemImportance);
    const riskScore = calculateRiskScore(epss, cvss);

    // Ergebnisse anzeigen
    document.getElementById('epss-result').textContent = epss.toFixed(2);
    document.getElementById('cvss-result').textContent = cvss.toFixed(2);
    document.getElementById('risk-score-result').textContent = riskScore.toFixed(2);

    // Charts aktualisieren
    updateBarChart(epss, cvss, riskScore);
    updateRadarChart(systemImportance, dataSensitivity, systemAccess, patchSpeed);
});

// Funktion zur Berechnung von EPSS
function calculateEPSS(access, patch) {
    return (access * 0.7) + (1 / patch) * 0.3;
}

// Funktion zur Berechnung von CVSS
function calculateCVSS(data, importance) {
    return (data * 0.5) + (importance * 0.5);
}

// Funktion zur Berechnung des Risikoscores
function calculateRiskScore(epss, cvss) {
    return epss * 0.5 + cvss * 0.5;
}

// Bar Chart Initialisieren
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

// Radar Chart Initialisieren
const radarCtx = document.getElementById('radarChart').getContext('2d');
let radarChart = new Chart(radarCtx, {
    type: 'radar',
    data: {
        labels: ['Systemkritikalität', 'Datensensitivität', 'Systemzugang', 'Patch-Geschwindigkeit'],
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

function updateRadarChart(importance, sensitivity, access, patch) {
    radarChart.data.datasets[0].data = [importance, sensitivity, access, patch];
    radarChart.update();
}
