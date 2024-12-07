const API_URL = 'https://ton-server.onrender.com'; // Замените URL на свой с Render

// Функция для загрузки данных о холдерах
async function fetchTokenData() {
    const tableBody = document.getElementById('holdersTable');
    const loading = document.getElementById('loading');

    try {
        const response = await fetch(`${API_URL}?address=EQDjeocqoV44Y3miqstuQ0cT5BxSV05E2qEV2VY1OXRQJGGB`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        const holders = data.holders;

        // Убираем сообщение загрузки
        loading.style.display = 'none';

        // Заполняем таблицу данными
        holders.forEach(holder => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${holder.address}</td>
                <td>${holder.balance.toFixed(2)} USACH</td>
                <td>${(holder.percentage * 100).toFixed(2)}%</td>
                <td>$${(holder.value_usd || 0).toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        loading.textContent = "Failed to load data. Please try again.";
    }
}

// Функция для отображения графика
async function renderChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');

    // Пример статических данных для графика
    const prices = [0.00046, 0.00045, 0.00048, 0.00047, 0.00046];
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Token Price (USD)',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Инициализация функций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    fetchTokenData();
    renderChart();
});
