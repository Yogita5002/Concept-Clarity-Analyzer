
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const subjects = [
  { id: "ds", name: "Data Structures" },
  { id: "dbms", name: "Database Management Systems" },
  { id: "ai", name: "Artificial Intelligence" },
  { id: "os", name: "Operating Systems" },
  { id: "cn", name: "Computer Networks" },
  { id: "ml", name: "Machine Learning" },
];

interface SubjectSelectorProps {
  onSubjectChange: (subject: string) => void;
}

const SubjectSelector = ({ onSubjectChange }: SubjectSelectorProps) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Select Subject</Label>
            <Select onValueChange={onSubjectChange} defaultValue="ds">
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose the subject you want to analyze your understanding for.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectSelector;
