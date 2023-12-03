import axios from "axios";
export async function analyzeImage(imageUrl) {
    try{
    const subscriptionKey = 'xxxxxx';
    const endpoint = 'https://computervisionres.cognitiveservices.azure.com/';

    
    const response = await axios.post(`${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview`, {url: imageUrl},
        {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        body: JSON.stringify({
            url: imageUrl
        }),
        params: {
            language: 'en',
            'model-version': 'latest',
            features: 'caption,read',

        }
      }
    );

    ;
    return response.data;
}
catch (error) {
    console.error("Error analysing image",error);
    return null;
 }
}
