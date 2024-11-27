'use client'

import { useState } from "react";
import InputField from "@/app/components/InputField";
import { ENDPOINTS } from "@/utils/endpoints";

type EntryProps = {
  fetchScores: () => Promise<void>;
}

export default function Entry({ fetchScores }: EntryProps) {
  const [testDate, setTestDate] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーションチェック
    if(!testDate || !score) {
      alert("日付と点数を入力してください");
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.ENTRY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testDate, score: parseInt(score, 10) }),
        credentials: 'include',
      });

      if(response.ok){
        alert("点数が登録されました");
        setTestDate("");
        setScore("");
      }else{
        alert("エラー発生！");
      }
    }catch(error){
      console.error("Error submitting score:", error);
    }
    await fetchScores();
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="w-4/5 mx-auto my-5"
    >
      {/* <h2 className="text-lg">点数入力</h2> */}

      <div className="w-auto flex justify-center gap-4">
        <InputField
          type="date"
          placeholder="日付"
          onChange={(value) => setTestDate(value)}
        />
        <InputField
          type="number"
          placeholder="点数"
          onChange={(value) => setScore(value)}
          min={0}
          max={80}
        />
        <button type="submit" className="btn btn-primary w-auto">
          登録
        </button>
      </div>
    </form>
  )
}
