import React, { useState } from 'react';
import { analyzeImage } from './azure-image-analysis';
import { generateImage } from './azure-image-generation';

const Title = ({ text }) => <h1>{text}</h1>;

const Input = ({ value, setValue }) => (
  <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter image URL" />
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const ProcessingIndicator = () => <div>Processing...</div>;

function App() {
  const [url, setUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null); // [1
  const analyzeImageHandler = async () => {
    setProcessing(true);
  const result =   await analyzeImage(url);
  setResult(result);
    setProcessing(false);
  };

  const generateImageHandler = async () => {
    setProcessing(true);
   let prompt = "A beautiful sunset over the ocean";
   try{
    const generateResult = await generateImage(prompt);
    setResult(generateResult[0]);
   }
   catch (error) {
    console.error("Error generating image",error);
   }
    setProcessing(false);
  };

  const displayresults = () => {
   if(!result) return null;
   return <div>
    <h2>Image Analysis Results</h2>
 <img width="500px"
 src={result?.url?result.url:url} 
 alt="uploaded"></img>   
<pre>{JSON.stringify(result, null, 2)}</pre>
   </div>
  }

  return (
    <div>
      <Title text="Image Analyzer and Generator" />
      <Input value={url} setValue={setUrl} />
      <Button onClick={analyzeImageHandler} text="Analyze Image" />
      <Button onClick={generateImageHandler} text="Generate Image" />
      {processing && <ProcessingIndicator />}
      {displayresults()}
    </div>
  );
}

export default App;