document.addEventListener('DOMContentLoaded', () => {
    // Popup-Logik
    function showInfo(scoreType) {
        const popup = document.getElementById('popup');
        const popupText = document.getElementById('popup-text');

        let explanation = '';
        if (scoreType === 'EPSS') {
            explanation = 'EPSS beschreibt die Wahrscheinlichkeit, dass eine Schwachstelle in der Praxis ausgenutzt wird.';
        } else if (scoreType === 'CVSS') {
            explanation = 'CVSS bewertet die Schwere einer Schwachstelle basierend auf deren Auswirkungen und Zugänglichkeit.';
        } else if (scoreType === 'Risiko') {
            explanation = 'Der Risikoscore kombiniert die Wahrscheinlichkeit (EPSS) und die Schwere (CVSS) der Schwachstelle.';
        }

        popupText.textContent = explanation;
        popup.classList.remove('hidden');
    }

    function closePopup() {
        const popup = document.getElementById('popup');
        popup.classList.add('hidden');
    }

    // Event-Listener für die Buttons
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', () => {
            const scoreType = button.getAttribute('onclick').split("'")[1];
            showInfo(scoreType);
        });
    });

    document.querySelector('.close-btn').addEventListener('click', closePopup);

    // Chart-Initialisierung
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['EPSS', 'CVSS', 'Risikoscore'],
            datasets: [{
                label: 'Werte',
                data: [0.8, 9.0, 8.5],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const radarCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Systemzugang', 'Patch-Geschwindigkeit', 'Datenverarbeitung', 'Systemkritikalität'],
            datasets: [{
                label: 'Bewertung',
                data: [3, 1, 3, 3],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: { beginAtZero: true }
            }
        }
    });
});
