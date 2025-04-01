
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2 } from "lucide-react";

interface ConceptInputFormProps {
  selectedSubject: string;
  onAnalyze: (inputText: string) => void;
  isAnalyzing: boolean;
}

const ConceptInputForm = ({ selectedSubject, onAnalyze, isAnalyzing }: ConceptInputFormProps) => {
  const [inputText, setInputText] = useState("");
  const subjectPrompts = {
    ds: "Explain how binary search trees work and their advantages.",
    dbms: "Describe the concept of database normalization and its importance.",
    ai: "Explain the difference between supervised and unsupervised learning.",
    os: "Describe process scheduling algorithms and their trade-offs.",
    cn: "Explain the OSI model layers and their functions.",
    ml: "Describe how backpropagation works in neural networks.",
  };

  const selectedPrompt = subjectPrompts[selectedSubject as keyof typeof subjectPrompts];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim().length > 0) {
      onAnalyze(inputText);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
          Concept Explanation
        </CardTitle>
        <CardDescription>
          Explain the concept in your own words to analyze your understanding.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="mb-2 text-sm font-medium">Prompt:</div>
          <div className="p-3 mb-4 bg-muted rounded-md text-sm">{selectedPrompt}</div>
          <Textarea
            placeholder="Type your explanation here..."
            className="min-h-[200px] resize-y"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={inputText.trim().length === 0 || isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Concept Clarity"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ConceptInputForm;
