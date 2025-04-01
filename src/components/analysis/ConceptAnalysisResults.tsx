
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

export interface KeyConcept {
  name: string;
  mastery: "high" | "medium" | "low";
  explanation: string;
}

export interface AnalysisResult {
  overallScore: number;
  conceptsMastered: KeyConcept[];
  conceptsToImprove: KeyConcept[];
  missingConcepts: string[];
}

interface ConceptAnalysisResultsProps {
  result: AnalysisResult | null;
  subject: string;
}

const ConceptAnalysisResults = ({ result, subject }: ConceptAnalysisResultsProps) => {
  if (!result) return null;

  const getSubjectName = (subjectId: string) => {
    const subjectMap: Record<string, string> = {
      ds: "Data Structures",
      dbms: "Database Management Systems",
      ai: "Artificial Intelligence",
      os: "Operating Systems",
      cn: "Computer Networks",
      ml: "Machine Learning"
    };
    
    return subjectMap[subjectId] || subjectId;
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMasteryBadge = (mastery: string) => {
    switch (mastery) {
      case "high":
        return <Badge className="bg-green-500">Strong</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Moderate</Badge>;
      case "low":
        return <Badge className="bg-red-500">Weak</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Analysis Results: {getSubjectName(subject)}</CardTitle>
          <CardDescription>
            Based on your explanation, here's an assessment of your concept clarity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Comprehension</span>
              <span className="text-sm font-medium">{result.overallScore}%</span>
            </div>
            <Progress value={result.overallScore} className="h-2" />
          </div>

          <div className="space-y-6">
            {/* Mastered Concepts */}
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                <h3 className="text-lg font-medium">Concepts Mastered</h3>
              </div>
              {result.conceptsMastered.length > 0 ? (
                <div className="space-y-3">
                  {result.conceptsMastered.map((concept, index) => (
                    <div key={index} className="p-3 bg-muted rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{concept.name}</span>
                        {getMasteryBadge(concept.mastery)}
                      </div>
                      <p className="text-sm text-muted-foreground">{concept.explanation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No concepts fully mastered yet.</p>
              )}
            </div>

            <Separator />

            {/* Concepts to Improve */}
            <div>
              <div className="flex items-center mb-4">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                <h3 className="text-lg font-medium">Concepts to Improve</h3>
              </div>
              {result.conceptsToImprove.length > 0 ? (
                <div className="space-y-3">
                  {result.conceptsToImprove.map((concept, index) => (
                    <div key={index} className="p-3 bg-muted rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{concept.name}</span>
                        {getMasteryBadge(concept.mastery)}
                      </div>
                      <p className="text-sm text-muted-foreground">{concept.explanation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No concepts that need improvement.</p>
              )}
            </div>

            <Separator />

            {/* Missing Concepts */}
            <div>
              <div className="flex items-center mb-4">
                <HelpCircle className="h-5 w-5 mr-2 text-red-500" />
                <h3 className="text-lg font-medium">Missing Concepts</h3>
              </div>
              {result.missingConcepts.length > 0 ? (
                <div className="space-y-2">
                  {result.missingConcepts.map((concept, index) => (
                    <div key={index} className="flex items-center p-2 bg-muted rounded-md">
                      <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No missing concepts detected.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptAnalysisResults;
