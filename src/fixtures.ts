import { Summary as GameplaySummary } from "@lmiller1990/rhythm-engine";
import { perfect, great } from './constants'

export const testSummary: GameplaySummary = {
  timing: {
    [perfect]: {
      count: 100,
      early: 0,
      late: 0,
    },
    [great]: {
      count: 5,
      early: 0,
      late: 0,
    },
    miss: {
      count: 20,
      early: 0,
      late: 0,
    },
  },
};
