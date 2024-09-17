const logsContent = document.getElementById('logsContent');
const searchInput = document.getElementById('searchInput');
const autoRefreshToggle = document.getElementById('autoRefresh');
let autoRefreshInterval;

function clearLogs() {
    document.getElementById('logsContent').innerText = '';
    fetch('/logs/clear', { method: 'POST' })
}

function searchLogs() {
    fetch('/logs/logs-content').then(response => response.text()).then(logs => {
        const searchTerm = searchInput.value.toLowerCase();
        const logLines = logs.split('\n');
        const filteredLogs = logLines.filter(line => line.toLowerCase().includes(searchTerm));
        logsContent.innerHTML = filteredLogs.join('\n').replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
    }).catch(error => console.error('Error fetching logs:', error));
}

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchLogs();
    }
});

async function loadLogs() {
    try {
        const response = await fetch('/logs/logs-content');
        if (response.ok) {
            const logs = await response.text();
            logsContent.textContent = logs;
        } else {
            console.error('Failed to fetch logs');
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
    }
}

loadLogs();

function toggleAutoRefresh() {
    if (autoRefreshToggle.checked) {
        autoRefreshInterval = setInterval(loadLogs, 1000);
    } else {
        clearInterval(autoRefreshInterval);
    }
}


searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchLogs();
    }
});

autoRefreshToggle.addEventListener('change', toggleAutoRefresh);