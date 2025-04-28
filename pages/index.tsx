import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

const ITEMS_PER_PAGE = 20;
const PLAYERS_PER_PAGE = 30;

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPlayersPage, setCurrentPlayersPage] = useState(1);

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

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const totalPlayersPages = Math.ceil(players.length / PLAYERS_PER_PAGE);
  const currentItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const currentPlayers = players.slice(
    (currentPlayersPage - 1) * PLAYERS_PER_PAGE,
    currentPlayersPage * PLAYERS_PER_PAGE
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#5C77FF]" />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 p-8 bg-red-50 rounded-lg shadow">
          {error}
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-black p-8 space-y-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg py-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#5C77FF]">
          🏆 Leaderboard
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-[#5C77FF] text-white rounded-2xl">
                <th className="p-4 text-left font-medium">Rank</th>
                <th className="p-4 text-left font-medium">Username</th>
                <th className="p-4 text-left font-medium">Level</th>
                <th className="p-4 text-left font-medium">XP</th>
                <th className="p-4 text-left font-medium">Gold</th>
              </tr>
            </thead>
            <tbody>
              {currentPlayers.map((player) => (
                <tr
                  key={player.username}
                  className="border-b hover:bg-[#5C77FF]/50 transition-colors"
                >
                  <td className="p-4 text-black font-normal">{player.rank}</td>
                  <td className="p-4 font-medium text-black">
                    {player.username}
                  </td>
                  <td className="p-4 text-black font-normal">{player.level}</td>
                  <td className="p-4 text-black font-normal">
                    {player.xp.toLocaleString()}
                  </td>
                  <td className="p-4 text-[#5C77FF] font-normal">
                    {player.gold.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPlayersPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPlayersPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPlayersPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPlayersPage === page
                      ? "bg-[#5C77FF] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold rounded-2xl text-center mb-8 text-[#5C77FF]">
          🛒 Market
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition-all duration-300 bg-white"
            >
              <h2 className="text-xl font-medium mb-2 text-[#5C77FF]">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-4 font-light">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg text-[#5C77FF]">
                  {item.cost.toLocaleString()} gold
                </p>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-light">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === page
                    ? "bg-[#5C77FF] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
