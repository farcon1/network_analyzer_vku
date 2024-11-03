document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['details'], function(result) {
        if(result.details) {
            document.getElementById('status').textContent = `Status: ${result.details.statusCode}`;
            document.getElementById('method').textContent = `Method: ${result.details.method}`;
            document.getElementById('url').textContent = `URL: ${result.details.url}`;

            // Парсинг payload как JSON
            const payload = JSON.parse(result.details.payload);

            // Обработка и форматирование finishedAndCurrentScreens
            const screens = payload.scenarioDto.finishedAndCurrentScreens;
            const screensFormatted = JSON.stringify(screens, null, 2);

            // Обработка и форматирование applicantAnswers
            const answers = payload.scenarioDto.applicantAnswers;
            const answersFormatted = JSON.stringify(answers, null, 2);

            // Обработка и форматирование orderId
            const orderId = payload.scenarioDto.orderId;
            const orderIdFormatted = JSON.stringify(orderId, null, 2);

            // Вывод отформатированных данных

            document.getElementById('orderId').textContent = `orderId: ${orderIdFormatted}`;
            document.getElementById('payload').textContent = `finishedAndCurrentScreens: ${screensFormatted}`;
            document.getElementById('response').textContent = `applicantAnswers: ${answersFormatted}`;
        }
    });
});
