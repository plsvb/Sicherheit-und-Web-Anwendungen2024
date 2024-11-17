document.getElementById('calculate-score').addEventListener('click', () => {
    // Formulardaten erfassen
    const epss = parseFloat(document.getElementById('epss-input').value);
    const cvss = parseFloat(document.getElementById('cvss-input').value);
    const criticality = parseFloat(document.getElementById('criticality-input').value);
    const patchSpeed = parseFloat(document.getElementById('patch-input').value);

    // Score-Berechnung
    const riskScore = calculateRiskScore(epss, cvss, criticality, patchSpeed);

    // Ergebnisse anzeigen
    document.getElementById('epss-result').textContent = (epss * 100).toFixed(2) + '%';
    document.getElementById('cvss-result').textContent = cvss.toFixed(2);
    document.getElementById('risk-score-result').textContent = riskScore.toFixed(2);

    // Chart aktualisieren
    updateChart(epss, cvss, riskScore);
});

// Funktion zur Risikoberechnung
function calculateRiskScore(epss, cvss, criticality, patchSpeed) {
    const weightEPSS = 0.4;
    const weightCVSS = 0.3;
    const weightCriticality = 0.2;
    const weightPatch = 0.1;

    return (
        epss * weightEPSS +
        (cvss / 10) * weightCVSS +
        criticality * weightCriticality +
        patchSpeed * weightPatch
    );
}

// Chart initialisieren
const ctx = document.getElementById('riskChart').getContext('2d');
let riskChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['EPSS', 'CVSS', 'Systemkritikalität', 'Patch-Geschwindigkeit'],
        datasets: [
            {
                label: 'Bewertung',
                data: [0, 0, 0, 0], // Initiale Daten
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 1,
            },
        },
    },
});

// Chart-Daten aktualisieren
function updateChart(epss, cvss, riskScore) {
    riskChart.data.datasets[0].data = [epss, cvss / 10, riskScore / 2, riskScore / 5];
    riskChart.update();
}
