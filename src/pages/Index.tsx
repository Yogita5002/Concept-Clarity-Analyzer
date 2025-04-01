
import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import SubjectSelector from "@/components/subjects/SubjectSelector";
import ConceptInputForm from "@/components/analysis/ConceptInputForm";
import ConceptAnalysisResults, { AnalysisResult } from "@/components/analysis/ConceptAnalysisResults";
import StudyPlanRecommendation from "@/components/analysis/StudyPlanRecommendation";
import ProgressChart from "@/components/progress/ProgressChart";
import { analyzeConceptClarity } from "@/services/analysisService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState("ds");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setAnalysisResult(null);
  };

  const handleAnalyze = async (inputText: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeConceptClarity(inputText, selectedSubject);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your concept clarity. Check the results below.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your input. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container py-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <SubjectSelector onSubjectChange={handleSubjectChange} />
            </div>
            <div className="md:col-span-2">
              <ConceptInputForm 
                selectedSubject={selectedSubject}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>

          {analysisResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptAnalysisResults result={analysisResult} subject={selectedSubject} />
              <StudyPlanRecommendation result={analysisResult} subject={selectedSubject} />
            </div>
          )}

          <div className="mt-4">
            <ProgressChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
