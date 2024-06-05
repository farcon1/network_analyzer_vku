chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes("/api/service/") && details.url.includes("/scenario/getNextStep")) {
            let statusCode = details.statusCode.toString(); // Получение реального статуса ответа
            chrome.storage.local.get(['details'], function(result) {
                // Обновление сохраненных деталей с новым статусом
                let updatedDetails = result.details;
                updatedDetails.statusCode = statusCode;
                chrome.storage.local.set({details: updatedDetails});
            });
        }
    },
    {urls: ["https://svcdev-beta.test.gosuslugi.ru/*"]},
    ["responseHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.url.includes("/api/service/") && details.url.includes("/scenario/getNextStep")) {
            let requestBody = details.requestBody;
            let rawPayload = "{}";
            if (requestBody && requestBody.raw) {
                let encoder = new TextDecoder("utf-8");
                rawPayload = requestBody.raw.map(segment => encoder.decode(new Uint8Array(segment.bytes))).join("");
            }
            chrome.storage.local.set({details: {
                    statusCode: 'Pending', // Инициализация статуса как 'Pending'
                    method: details.method,
                    url: details.url,
                    payload: rawPayload,
                    response: "{}"
                }});
            console.log("Request URL:", details.url, "Request Body:", rawPayload);
        }
    },
    {urls: ["https://svcdev-beta.test.gosuslugi.ru/*"]},
    ["requestBody"]
);
