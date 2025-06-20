import { useEffect, useState } from 'react';
import './index.css';
import sonicImg from '/sonadow-sonic.gif';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://iuckiy67qg.execute-api.us-east-1.amazonaws.com/angel/items';
  const apiItemUrl = (id) => `https://iuckiy67qg.execute-api.us-east-1.amazonaws.com/angel/items/${id}`;

  const fetchItems = () => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const postItem = () => {
    const newItem = {
      id: String(Date.now()),
      price: Math.floor(Math.random() * 1000),
      name: 'Item POST ' + new Date().toLocaleTimeString()
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then((res) => res.text())
      .then(() => fetchItems())
      .catch((err) => setError(err.message));
  };

  const putItem = () => {
    const updatedItem = {
      id: 'teste123',
      price: Math.floor(Math.random() * 1000),
      name: 'Item Atualizado via PUT'
    };

    fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    })
      .then((res) => res.text())
      .then(() => fetchItems())
      .catch((err) => setError(err.message));
  };

  const deleteItem = () => {
    const id = prompt('Digite o ID do item que deseja deletar:');
    if (!id) return;

    fetch(apiItemUrl(id), { method: 'DELETE' })
      .then((res) => res.text())
      .then(() => fetchItems())
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-red-500 via-orange-400 via-yellow-300 via-green-400 via-blue-500 to-purple-600 p-4">
      <img src={sonicImg} alt="Sonic" className="w-150 h-auto mb-8" />

      {loading && <p className="text-white text-lg">Carregando...</p>}
      {error && <p className="text-red-300 text-lg">Erro: {error}</p>}

      {!loading && !error && (
        <>
          <ul className="text-white text-center">
            {items.length > 0 ? (
              items.map((item) => (
                <li key={item.id} className="mb-1">
                  {item.id}: {item.name} - R${item.price}
                </li>
              ))
            ) : (
              <p>Nenhum item encontrado.</p>
            )}
          </ul>

          <div className="mt-6 flex flex-col space-y-2">
            <button onClick={fetchItems} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
              GET Items
            </button>
            <button onClick={postItem} className="bg-green-300 px-4 py-2 rounded hover:bg-green-400">
              POST Novo Item
            </button>
            <button onClick={putItem} className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-400">
              PUT Atualizar Item Fixo
            </button>
            <button onClick={deleteItem} className="bg-red-400 px-4 py-2 rounded hover:bg-red-500">
              DELETE Item por ID
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
