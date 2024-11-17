document.getElementById('calculate-score').addEventListener('click', () => {
    // Formulardaten erfassen
    const epss = parseFloat(document.getElementById('epss-input').value);
    const cvss = parseFloat(document.getElementById('cvss-input').value);
    const criticality = parseFloat(document.getElementById('criticality-input').value);
    const dataSensitivity = parseFloat(document.getElementById('data-input').value);
    const patchSpeed = parseFloat(document.getElementById('patch-input').value);

    // Beispielrechnung für den Risikoscore
    const riskScore = calculateRiskScore(epss, cvss, criticality, dataSensitivity, patchSpeed);

    // Ergebnisse anzeigen
    document.getElementById('risk-score-result').textContent = riskScore.toFixed(2);

    // Charts aktualisieren
    updateBarChart(epss, cvss, riskScore);
    updateRadarChart(epss, cvss, criticality, dataSensitivity, patchSpeed);
});

// Funktion zur Score-Berechnung
function calculateRiskScore(epss, cvss, criticality, dataSensitivity, patchSpeed) {
    return (
        epss * 0.3 +
        (cvss / 10) * 0.3 +
        criticality * 0.2 +
        dataSensitivity * 0.1 +
        patchSpeed * 0.1
    );
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
        labels: ['EPSS', 'CVSS', 'Systemkritikalität', 'Datensensitivität', 'Patch-Geschwindigkeit'],
        datasets: [{
            label: 'Bewertung',
            data: [0, 0, 0, 0, 0],
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

function updateRadarChart(epss, cvss, criticality, dataSensitivity, patchSpeed) {
    radarChart.data.datasets[0].data = [epss, cvss / 10, criticality, dataSensitivity, patchSpeed];
    radarChart.update();
}
