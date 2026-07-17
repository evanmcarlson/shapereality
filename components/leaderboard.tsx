const API_BASE = "https://ovxjz5pwza.execute-api.us-east-1.amazonaws.com";
const PREVIEW_COUNT = 5;

type Entry = {
  rank: number;
  displayName: string;
  elapsedSeconds: number;
  sessionId: string;
};

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

const MEDALS = ["🥇", "🥈", "🥉"];

async function getEntries(puzzleId: string): Promise<Entry[]> {
  try {
    const res = await fetch(`${API_BASE}/leaderboard/${puzzleId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch {
    return [];
  }
}

export async function Leaderboard({ puzzleId }: { puzzleId: string }) {
  const entries = await getEntries(puzzleId);
  const preview = entries.slice(0, PREVIEW_COUNT);
  const hasMore = entries.length > PREVIEW_COUNT;

  return (
    <div className="flex flex-col gap-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10">
            <th className="pb-3 text-left font-mono text-[9px] uppercase tracking-widest text-black opacity-30 dark:text-white">
              Rank
            </th>
            <th className="pb-3 text-left font-mono text-[9px] uppercase tracking-widest text-black opacity-30 dark:text-white">
              Player
            </th>
            <th className="pb-3 text-right font-mono text-[9px] uppercase tracking-widest text-black opacity-30 dark:text-white">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="pt-8 pb-3 text-center font-mono text-[11px] uppercase tracking-widest text-black opacity-30 dark:text-white"
              >
                No entries yet — be the first.
              </td>
            </tr>
          ) : (
            preview.map((e) => (
              <tr key={e.rank}>
                <td
                  className="pb-3 pt-5 font-mono text-base font-bold"
                  style={{ color: e.rank <= 3 ? "#ffcc00" : undefined }}
                >
                  {MEDALS[e.rank - 1] ?? e.rank}
                </td>
                <td className="pb-3 pt-5 font-sans text-sm font-medium uppercase text-black dark:text-white">
                  {e.displayName}
                </td>
                <td className="pb-3 pt-5 text-right font-mono text-sm text-black opacity-60 dark:text-white">
                  {formatTime(e.elapsedSeconds)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {hasMore && (
        <a
          href={`https://play.shapereality.com/?puzzle=${puzzleId}`}
          className="mt-6 block text-center font-mono text-[12px] uppercase tracking-widest transition-opacity hover:opacity-70"
          style={{ color: "#0088ff" }}
        >
          See full leaderboard →
        </a>
      )}
    </div>
  );
}
