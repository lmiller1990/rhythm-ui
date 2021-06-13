import { Chart } from '@lmiller1990/rhythm-engine'

export type Difficulty = "easy" | "medium" | "hard";

export interface Song {
  id: string;
  name: string;
  offset: number;
  displayName: string;
  bpm: number;
  artist: string;
  durationInSec: number;
  difficulties: Array<{
    name: Difficulty
    level: number;
    noteCount: number;
    chart: Chart
  }>;
}
