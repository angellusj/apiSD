import { useState } from 'react';
import './index.css';
import sonicImg from '/sonadow-sonic.gif';

const apiBaseUrl = 'https://iuckiy67qg.execute-api.us-east-1.amazonaws.com/angel/items';

function App() {
  const [responseMessage, setResponseMessage] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');

  const handleGetAll = async () => {
    try {
      const res = await fetch(apiBaseUrl);
      const data = await res.json();
      setResponseMessage(`GET PRIDE MONTH SONADOW funcionando! ${JSON.stringify(data)}`);
    } catch (error) {
      setResponseMessage('Erro no GET');
    }
  };

  const handlePost = async () => {
    try {
      const item = {
        id: inputId,
        name: inputName,
        price: parseInt(inputPrice),
      };
      const res = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      setResponseMessage(`Esse é um POST PRIDE MONTH SONADOW: método POST funcionando! ${data}`);
    } catch (error) {
      setResponseMessage('Erro no POST');
    }
  };

  const handlePut = async () => {
    try {
      const item = {
        id: inputId,
        name: inputName,
        price: parseInt(inputPrice),
      };
      const res = await fetch(apiBaseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      setResponseMessage(`Esse é um PUT PRIDE MONTH SONADOW: método PUT funcionando! ${data}`);
    } catch (error) {
      setResponseMessage('Erro no PUT');
    }
  };

  const handleGetById = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/${inputId}`);
      const data = await res.json();
      setResponseMessage(`GET PRIDE MONTH SONADOW por ID funcionando! ${JSON.stringify(data)}`);
    } catch (error) {
      setResponseMessage('Erro no GET por ID');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/${inputId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setResponseMessage(`DELETE HAPPY PRIDE MONTH SONADOW funcionando! ${data}`);
    } catch (error) {
      setResponseMessage('Erro no DELETE');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-red-500 via-orange-400 via-yellow-300 via-green-400 via-blue-500 to-purple-600 text-white p-4 space-y-4">
      <img src={sonicImg} alt="Sonic" className="w-64 h-auto" />

      <div className="flex flex-col space-y-2 w-full max-w-md">
        <input
          type="text"
          placeholder="ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="number"
          placeholder="Price"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
          className="p-2 rounded text-black"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={handleGetAll} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">GET Todos</button>
        <button onClick={handleGetById} className="bg-indigo-700 px-4 py-2 rounded hover:bg-indigo-800">GET por ID</button>
        <button onClick={handlePost} className="bg-green-700 px-4 py-2 rounded hover:bg-green-800">POST</button>
        <button onClick={handlePut} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">PUT</button>
        <button onClick={handleDelete} className="bg-red-700 px-4 py-2 rounded hover:bg-red-800">DELETE</button>
      </div>

      <div className="bg-black/50 p-4 rounded w-full max-w-md text-center break-words">
        <strong>Resposta da API:</strong>
        <p>{responseMessage}</p>
      </div>
    </div>
  );
}

export default App;
