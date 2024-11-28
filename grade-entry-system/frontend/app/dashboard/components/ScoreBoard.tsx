'use client'

import ScoreChart from "./ScoreChart";

type ScoreBoardProps = {
  scores: {
    userId: number;
    score: number;
    testDate: string;
  }[];
}

export default function ScoreBoard({ scores }: ScoreBoardProps) {

  // グラフ用データを昇順でソート
  const sortedScores = [...scores].sort((a, b) => new Date(a.testDate).getTime() - new Date(b.testDate).getTime());

  // グラフデータ準備
  const labels = sortedScores.map((score) => new Date(score.testDate).toLocaleDateString());
  const dataPoints = sortedScores.map((score) => score.score);

  return (
    <div className="w-full md:w-2/3 flex flex-col md:flex-row items-start gap-4 mx-auto">
      <table className="table w-full md:w-1/2 bg-white rounded-md">
        <thead>
          <tr>
            <th>日付</th><th>点数</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{score.testDate}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full md:w-1/2 h-96 md:h-80 lg:h-64 mt-2">
        <ScoreChart labels={labels} dataPoints={dataPoints} />
      </div>
    </div>
  )
}
