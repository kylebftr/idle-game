import { useState, useEffect } from 'react';

function App() {
  const defaultGameState = {
    coins: 0,
    upgrades: [],
    buildings: {
      mine: { level: 1, productionRate: 1 }
    }
  };

  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('idleGameSave');
    return saved ? JSON.parse(saved) : defaultGameState;
  });

  // Save to localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('idleGameSave', JSON.stringify(gameState));
    }, 5000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Tick logic (increase coins)
  useEffect(() => {
    const tick = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins + prev.buildings.mine.productionRate
      }));
    }, 1000); // 1-second tick
    return () => clearInterval(tick);
  }, []);

  // Upgrade building
  const upgradeMine = () => {
    if (gameState.coins >= 10) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - 10,
        buildings: {
          ...prev.buildings,
          mine: {
            ...prev.buildings.mine,
            level: prev.buildings.mine.level + 1,
            productionRate: prev.buildings.mine.productionRate + 1
          }
        }
      }));
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Idle Game</h1>
      <p>Coins: {gameState.coins}</p>
      <p>Mine Level: {gameState.buildings.mine.level}</p>
      <p>Production Rate: {gameState.buildings.mine.productionRate}/sec</p>
      <button onClick={upgradeMine} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Upgrade Mine (Cost: 10)
      </button>
    </div>
  );
}

export default App;
