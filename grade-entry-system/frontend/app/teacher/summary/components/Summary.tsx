'use client'

import { useEffect, useState } from "react";
import Search from "./Search";
import { ENDPOINTS } from "@/utils/endpoints";
import ScoreChart from "./ScoreChart";

type SummaryScore = {
  score: number;
}

type SummaryScores = {
  data: SummaryScore[];
}

export default function Summary() {
  const [testDate, setTestDate] = useState("");
  const [scores, setScores] = useState<SummaryScores>();
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  const handleDateChange = (value: string) => {
    setTestDate(value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!testDate){
      alert("日付を入力してください");
      return;
    }

    try{
      const response = await fetch(`${ENDPOINTS.SUMMARY}?date=${testDate}`,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token'),
        },
      });
      if(!response.ok){
        alert('エラー発生！！');
        throw new Error("レスポンスエラー");
      }
      const data: SummaryScores = await response.json();
      setScores(data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    if(scores){
      const groupedScores = scores.data.reduce(
        (acc: Record<number, number>, { score }) => {
          acc[score] = (acc[score] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>
      );

      const labels = Object.keys(groupedScores).sort((a, b) => Number(a) - Number(b)); // 点数の昇順
      const dataPoints = labels.map((label) => groupedScores[Number(label)]);

      setLabels(labels);
      setDataPoints(dataPoints);
      // console.log("点数の分布：", groupedScores);
    }
  }, [scores]);

  return (
    <div className="w-5/6 mx-auto">
      <Search onDateChange={handleDateChange} onSearchSubmit={handleSubmit} />
      <ScoreChart labels={labels} dataPoints={dataPoints} minScore={0} maxScore={80} />
    </div>
  )
}
