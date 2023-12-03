import axios from "axios";

export async function generateImage(prompt) {
    const apiBase = 'https://resazureopenai.openai.azure.com';
    const apiKey = 'xxxx';
    const apiVersion = '2023-06-01-preview';
    const url = `${apiBase}/openai/images/generations:submit?api-version=${apiVersion}`;
    const headers = { "api-key": apiKey, "Content-Type": "application/json" };
    const body = { prompt: prompt, n: 1, size: '512x512' };

    try{
        const submission = await axios.post(url, body, { headers: headers });
        const operationLocation = submission.headers['operation-location'];
        let status = '';
        let response;
        while(status !== 'succeeded') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await axios.get(operationLocation, { headers: headers });
        status = response.data.status;

    }
        
    return response.data.result.data;
    }
    catch (error) {
        console.error("Error generating image",error);
        return null;
     }
 }
