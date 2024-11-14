// Initialisiere Chart.js mit leeren Daten
const ctx = document.getElementById('radarChart').getContext('2d');
const radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: [
            'Sicherheitslücken schließen',
            'Benutzerzugänge absichern',
            'Datensicherung durchführen',
            'Gefahrenbewusstsein schaffen',
            'Netzübergänge absichern',
            'Schadprogramme abwehren',
            'Notfallplan erstellen',
            'Inventarisieren und dokumentieren'
        ],
        datasets: [{
            label: 'Erfüllungsgrad',
            data: [0, 0, 0, 0, 0, 0, 0, 0], // Anfangswerte sind 0
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Funktion zum Aktualisieren des Diagramms basierend auf der Benutzereingabe
function updateChart() {
    const form = document.getElementById('checklist-form');
    const formData = new FormData(form);
    let values = [];

    // Addiere die Werte der Fragen je nach Abschnitt
    let sumSection1 = 0;
    let sumSection2 = 0;
    let sumSection3 = 0;
    let sumSection4 = 0;
    let sumSection5 = 0;
    let sumSection6 = 0;
    let sumSection7 = 0;
    let sumSection8 = 0;

    formData.forEach((value, key) => {
        value = parseInt(value, 10);
        if (key.startsWith('question_1')) sumSection1 += value;
        else if (key.startsWith('question_2')) sumSection2 += value;
        else if (key.startsWith('question_3')) sumSection3 += value;
        else if (key.startsWith('question_4')) sumSection4 += value;
        else if (key.startsWith('question_5')) sumSection5 += value;
        else if (key.startsWith('question_6')) sumSection6 += value;
        else if (key.startsWith('question_7')) sumSection7 += value;
        else if (key.startsWith('question_8')) sumSection8 += value;
    });

    // Berechne den Durchschnitt pro Abschnitt (je nach Anzahl der Fragen im Abschnitt)
    values = [
        sumSection1 / 2,  // Abschnitt 1 hat 2 Fragen
        sumSection2 / 2,  // Abschnitt 2 hat 2 Fragen
        sumSection3,      // Abschnitt 3 hat 1 Frage
        sumSection4,      // Abschnitt 4 hat 1 Frage
        sumSection5,      // Abschnitt 5 hat 1 Frage
        sumSection6,      // Abschnitt 6 hat 1 Frage
        sumSection7,      // Abschnitt 7 hat 1 Frage
        sumSection8 / 2   // Abschnitt 8 hat 2 Fragen
    ];

    // Aktualisiere das Diagramm
    radarChart.data.datasets[0].data = values;
    radarChart.update();
}
