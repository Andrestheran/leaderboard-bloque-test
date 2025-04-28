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
                  className={`border-b transition-colors ${
                    player.rank === 1
                      ? "bg-yellow-200 hover:from-yellow-200 "
                      : player.rank === 2
                      ? "bg-gray-300 hover:from-gray-200 "
                      : player.rank === 3
                      ? "bg-yellow-600 hover:from-amber-200"
                      : "hover:bg-[#5C77FF]/50"
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {player.rank <= 3 ? (
                        <span
                          className={`text-2xl ${
                            player.rank === 1
                              ? "text-yellow-500"
                              : player.rank === 2
                              ? "text-gray-400"
                              : "text-amber-600"
                          }`}
                        >
                          {player.rank === 1
                            ? "🥇"
                            : player.rank === 2
                            ? "🥈"
                            : "🥉"}
                        </span>
                      ) : (
                        <span className="text-black font-normal">
                          {player.rank}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`${
                        player.rank <= 3 ? "font-bold text-lg" : "font-medium"
                      } text-black transition-transform duration-300 hover:scale-110 hover:text-[#5C77FF]`}
                    >
                      {player.username}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`${
                        player.rank <= 3 ? "font-bold" : "font-normal"
                      } text-black`}
                    >
                      {player.level}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`${
                        player.rank <= 3 ? "font-bold" : "font-normal"
                      } text-black`}
                    >
                      {player.xp.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`${
                        player.rank <= 3 ? "font-bold" : "font-normal"
                      } text-black`}
                    >
                      {player.gold.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPlayersPages > 1 && (
          <div className="mt-8">
            <div className="flex justify-center overflow-x-auto pb-2">
              <div className="flex space-x-1 sm:space-x-2 min-w-max">
                {Array.from({ length: totalPlayersPages }, (_, i) => i + 1)
                  .filter((page) => {
                    const currentPage = currentPlayersPage;
                    const totalPages = totalPlayersPages;
                    if (totalPages <= 5) return true;
                    if (window.innerWidth < 768) {
                      // Mobile
                      if (currentPage <= 3) return page <= 5;
                      if (currentPage >= totalPages - 2)
                        return page >= totalPages - 4;
                      return page >= currentPage - 2 && page <= currentPage + 2;
                    } else {
                      // Tablet/Desktop
                      if (currentPage <= 5) return page <= 10;
                      if (currentPage >= totalPages - 5)
                        return page >= totalPages - 9;
                      return page >= currentPage - 5 && page <= currentPage + 4;
                    }
                  })
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPlayersPage(page)}
                      className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg font-medium ${
                        currentPlayersPage === page
                          ? "bg-[#5C77FF] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
              </div>
            </div>
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
          <div className="mt-8">
            <div className="flex justify-center overflow-x-auto pb-2">
              <div className="flex space-x-1 sm:space-x-2 min-w-max">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    const currentPageNum = currentPage;
                    const totalPagesNum = totalPages;
                    if (totalPagesNum <= 5) return true;
                    if (window.innerWidth < 768) {
                      // Mobile
                      if (currentPageNum <= 3) return page <= 5;
                      if (currentPageNum >= totalPagesNum - 2)
                        return page >= totalPagesNum - 4;
                      return (
                        page >= currentPageNum - 2 && page <= currentPageNum + 2
                      );
                    } else {
                      // Tablet/Desktop
                      if (currentPageNum <= 5) return page <= 10;
                      if (currentPageNum >= totalPagesNum - 5)
                        return page >= totalPagesNum - 9;
                      return (
                        page >= currentPageNum - 5 && page <= currentPageNum + 4
                      );
                    }
                  })
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg font-medium ${
                        currentPage === page
                          ? "bg-[#5C77FF] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
