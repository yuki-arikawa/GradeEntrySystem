'use client'

import { ENDPOINTS } from "@/utils/endpoints";
import { useEffect, useState } from "react"

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

  return (
    <table className="table w-1/4 bg-white rounded-md">
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
  )
}
