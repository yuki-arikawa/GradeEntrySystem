'use client'

import { useEffect, useState } from "react";
import Entry from "./Entry";
import ScoreBoard from "./ScoreBoard";
import { ENDPOINTS } from "@/utils/endpoints";

type Score = {
  userId: number;
  score: number;
  testDate: string;
}

export default function DashboardContent() {
  const [scores, setScores] = useState<Score[]>([]);

  const fetchScores = async () => {
    try{
      const response = await fetch(ENDPOINTS.HISTORY, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
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

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <>
      <Entry fetchScores={fetchScores} />
      <ScoreBoard scores={scores} />
    </>
  )
}
