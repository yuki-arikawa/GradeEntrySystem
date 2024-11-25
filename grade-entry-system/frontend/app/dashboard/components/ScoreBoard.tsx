'use client'

import { ENDPOINTS } from "@/utils/endpoints";
import { useEffect, useState } from "react";
import ScoreChart from "./ScoreChart";

type Score = {
  userId: number;
  score: number;
  testDate: string;
}

export default function ScoreBoard() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try{
        const response = await fetch(ENDPOINTS.HISTORY, {
          method: "GET",
          credentials: "include",
        });

        if(response.ok) {
          const data = await response.json();
          setScores(data.scoreHistory);
        }else{
          console.error("Failed to fetch scores");
        }
      }catch(error){
        console.error("Error fetching scores:", error);
      }
    }
    fetchScores();
  }, []);

  // グラフデータ準備
  const labels = scores.map((score) => new Date(score.testDate).toLocaleDateString());
  const dataPoints = scores.map((score) => score.score);

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
