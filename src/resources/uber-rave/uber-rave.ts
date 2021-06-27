import type { Chart, ChartNote } from "@lmiller1990/rhythm-engine";

const notes: ChartNote[] = []

for (let i = 0; i < 20; i++) {
  notes.push({
    id: i.toString(),
    ms: i * 300,
    code: (i % 2 === 0 ? 3 : 4).toString()
  })
}

export const chart: Chart = {
  notes
  // notes: [
  //   { id: "1", code: "2", ms: 0 },
  //   { id: "2", code: "4", ms: 343 },
  //   { id: "3", code: "3", ms: 686 },
  //   { id: "4", code: "5", ms: 1029 },
  //   { id: "5", code: "2", ms: 1371 },
  //   { id: "6", code: "3", ms: 1714 },
  //   { id: "7", code: "4", ms: 2057 },
  //   { id: "8", code: "5", ms: 2400 },
  //   { id: "9", code: "2", ms: 2743 },
  //   { id: "10", code: "5", ms: 3086 },
  //   { id: "11", code: "3", ms: 3429 },
  //   { id: "12", code: "4", ms: 3771 },
  //   { id: "13", code: "2", ms: 4114 },
  //   { id: "14", code: "5", ms: 4457 },
  //   { id: "15", code: "4", ms: 4800 },
  //   { id: "16", code: "3", ms: 5143 },
  //   { id: "17", code: "2", ms: 5486 },
  //   { id: "18", code: "5", ms: 5829 },
  //   { id: "19", code: "2", ms: 6171 },
  //   { id: "20", code: "4", ms: 6514 },
  // ],
};
