// Beispiel-Daten
const exampleData = [
    { cve: 'CVE-2023-1234', epss: 0.85, cvss: 9.8 },
    { cve: 'CVE-2023-2345', epss: 0.60, cvss: 7.5 },
    { cve: 'CVE-2023-3456', epss: 0.20, cvss: 5.0 },
    { cve: 'CVE-2023-4567', epss: 0.40, cvss: 4.3 },
];

// Bar Chart: EPSS-Wahrscheinlichkeit
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: exampleData.map(item => item.cve),
        datasets: [{
            label: 'EPSS-Wahrscheinlichkeit (%)',
            data: exampleData.map(item => (item.epss * 100).toFixed(2)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Wahrscheinlichkeit (%)' }
            },
            x: { title: { display: true, text: 'CVE-Nummern' } }
        }
    }
});

// Bubble Chart: CVSS vs. EPSS
const bubbleCtx = document.getElementById('bubbleChart').getContext('2d');
new Chart(bubbleCtx, {
    type: 'bubble',
    data: {
        datasets: exampleData.map(item => ({
            label: item.cve,
            data: [{
                x: item.cvss, // CVSS-Wert
                y: item.epss * 100, // EPSS-Wahrscheinlichkeit in %
                r: item.cvss * 2 // Bubble-Größe basierend auf CVSS
            }],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
        }))
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: 'CVSS-Wert (Schwere)' },
                beginAtZero: true,
                max: 10
            },
            y: {
                title: { display: true, text: 'EPSS-Wahrscheinlichkeit (%)' },
                beginAtZero: true,
                max: 100
            }
        }
    }
});
