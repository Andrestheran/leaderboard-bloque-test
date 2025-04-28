import { useEffect, useState } from "react";

type Player = {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
};

type Item = {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
};

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leaderboardRes, marketRes] = await Promise.all([
          fetch("https://api-game.bloque.app/game/leaderboard"),
          fetch("https://api-game.bloque.app/game/market"),
        ]);

        if (!leaderboardRes.ok || !marketRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const leaderboardData = await leaderboardRes.json();
        const marketData = await marketRes.json();

        setPlayers(leaderboardData.players);
        setItems(marketData.items);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <main className="p-8 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🏆 Leaderboard</h1>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-[#919608]">
            <th className="border p-2">Rank</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Level</th>
            <th className="border p-2">XP</th>
            <th className="border p-2">Gold</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.username} className="text-center">
              <td className="border p-2">{player.rank}</td>
              <td className="border p-2">{player.username}</td>
              <td className="border p-2">{player.level}</td>
              <td className="border p-2">{player.xp}</td>
              <td className="border p-2">{player.gold}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-3xl font-bold text-center">🛒 Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="font-bold">Cost: {item.cost} gold</p>
            <p className="text-sm text-gray-400 mt-1">Type: {item.type}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
