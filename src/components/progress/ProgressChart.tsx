
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { subjects } from "../subjects/SubjectSelector";
import { useState } from "react";

// Mock progress data
const generateMockProgressData = (subject: string) => {
  const baseScores: Record<string, number[]> = {
    ds: [45, 55, 60, 65, 72],
    dbms: [40, 48, 63, 70, 75],
    ai: [30, 42, 50, 58, 65],
    os: [55, 60, 68, 72, 78],
    cn: [42, 50, 62, 68, 74],
    ml: [35, 45, 52, 60, 68],
  };

  const scores = baseScores[subject] || [50, 55, 60, 65, 70];
  return [1, 2, 3, 4, 5].map((week, index) => ({
    week: `Week ${week}`,
    score: scores[index]
  }));
};

const ProgressChart = () => {
  const [subject, setSubject] = useState("ds");
  const data = generateMockProgressData(subject);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Progress Tracking</CardTitle>
        <CardDescription>
          Track your concept clarity improvement over time
        </CardDescription>
        <Tabs defaultValue="ds" value={subject} onValueChange={setSubject} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            {subjects.map(s => (
              <TabsTrigger key={s.id} value={s.id} className="text-xs">
                {s.id.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                name="Concept Clarity Score" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
