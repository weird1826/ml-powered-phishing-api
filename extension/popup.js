document.getElementById('scanBtn').addEventListener('click', async () => {
    const text = document.getElementById('emailText').value;
    const resultDiv = document.getElementById('result');
    
    if (!text) {
        resultDiv.style.display = 'block';
        resultDiv.textContent = "Please paste some text first.";
        resultDiv.className = '';
        return;
    }

    // Show loading state
    document.getElementById('scanBtn').innerText = "Scanning...";
    resultDiv.style.display = 'none';

    try {
        // REPLACE THIS URL WITH YOUR AZURE APP URL
        // Ensure you keep the /predict at the end
        const response = await fetch('https://ml-powered-phishing-api.onrender.com/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        // Update UI based on result
        resultDiv.style.display = 'block';
        if (data.is_phishing) {
            resultDiv.textContent = `PHISHING DETECTED (${(data.confidence * 100).toFixed(1)}% confidence)`;
            resultDiv.className = 'phishing';
        } else {
            resultDiv.textContent = `Looks Safe (${(data.confidence * 100).toFixed(1)}% confidence)`;
            resultDiv.className = 'safe';
        }

    } catch (error) {
        resultDiv.style.display = 'block';
        resultDiv.textContent = "Error connecting to server. Is it asleep?";
        resultDiv.className = '';
        console.error(error);
    }

    // Reset button text
    document.getElementById('scanBtn').innerText = "Analyze Text";
});