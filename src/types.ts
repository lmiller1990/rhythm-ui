export interface Song {
  id: string;
  name: string;
  bpm: number;
  artist: string
  noteCount: number;
  durationInSec: number
  difficulties: Array<{
    name: "easy" | "medium" | "hard";
    level: number;
  }>;
}
