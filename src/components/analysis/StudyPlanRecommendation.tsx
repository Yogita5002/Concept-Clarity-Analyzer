
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Youtube, FileText, Coffee } from "lucide-react";
import { AnalysisResult } from "./ConceptAnalysisResults";

interface StudyPlanRecommendationProps {
  result: AnalysisResult | null;
  subject: string;
}

const StudyPlanRecommendation = ({ result, subject }: StudyPlanRecommendationProps) => {
  if (!result) return null;

  // Mock study resources based on subject and concepts to improve
  const studyResources = getStudyResources(subject, result.conceptsToImprove.map(c => c.name));

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          Personalized Study Plan
        </CardTitle>
        <CardDescription>
          Based on your analysis, here are resources to improve your understanding
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {result.conceptsToImprove.length > 0 ? (
            result.conceptsToImprove.map((concept, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{concept.name}</h3>
                  <Badge variant="outline">Priority {index + 1}</Badge>
                </div>
                <div className="space-y-2">
                  {studyResources
                    .filter(resource => resource.concepts.includes(concept.name))
                    .map((resource, resourceIndex) => (
                      <a
                        key={resourceIndex}
                        href="#"
                        className="flex items-center p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                      >
                        {getResourceIcon(resource.type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium">{resource.title}</div>
                          <div className="text-xs text-muted-foreground">{resource.source}</div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                      </a>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center">
              <Coffee className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p>Great job! You have a strong understanding of this subject.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Continue practicing to maintain your knowledge.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface StudyResource {
  title: string;
  type: "video" | "article" | "document";
  source: string;
  concepts: string[];
}

function getResourceIcon(type: string) {
  switch (type) {
    case "video":
      return <Youtube className="h-5 w-5 text-red-500" />;
    case "article":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "document":
      return <BookOpen className="h-5 w-5 text-green-500" />;
    default:
      return <BookOpen className="h-5 w-5 text-primary" />;
  }
}

function getStudyResources(subject: string, conceptsToImprove: string[]): StudyResource[] {
  const resourceMap: Record<string, StudyResource[]> = {
    ds: [
      { title: "Binary Search Trees Explained", type: "video", source: "YouTube - CS Dojo", concepts: ["Binary Search Trees", "Tree Traversal"] },
      { title: "Understanding Time Complexity", type: "article", source: "GeeksforGeeks", concepts: ["Time Complexity Analysis", "Algorithm Efficiency"] },
      { title: "Comprehensive Guide to Graphs", type: "document", source: "MIT OpenCourseware", concepts: ["Graph Algorithms", "Adjacency Matrices"] }
    ],
    dbms: [
      { title: "Database Normalization Tutorial", type: "video", source: "YouTube - Academind", concepts: ["Normalization", "Database Design"] },
      { title: "SQL Joins Explained", type: "article", source: "W3Schools", concepts: ["SQL Joins", "Query Optimization"] },
      { title: "Transaction Management in DBMS", type: "document", source: "Stanford Database Course", concepts: ["Transactions", "ACID Properties"] }
    ],
    ai: [
      { title: "Machine Learning Algorithms Explained", type: "video", source: "YouTube - StatQuest", concepts: ["Supervised Learning", "Classification Algorithms"] },
      { title: "Neural Networks from Scratch", type: "article", source: "Towards Data Science", concepts: ["Neural Networks", "Deep Learning"] },
      { title: "Understanding Reinforcement Learning", type: "document", source: "Berkeley AI Course", concepts: ["Reinforcement Learning", "Q-Learning"] }
    ],
    os: [
      { title: "Process Scheduling Algorithms", type: "video", source: "YouTube - Neso Academy", concepts: ["Process Scheduling", "CPU Scheduling"] },
      { title: "Memory Management Explained", type: "article", source: "OS Tutorial", concepts: ["Memory Management", "Virtual Memory"] },
      { title: "Understanding Deadlocks", type: "document", source: "Operating System Concepts", concepts: ["Deadlocks", "Process Synchronization"] }
    ],
    cn: [
      { title: "OSI Model Deep Dive", type: "video", source: "YouTube - PowerCert", concepts: ["OSI Model", "Network Layers"] },
      { title: "TCP/IP Protocol Suite", type: "article", source: "Networking Guide", concepts: ["TCP/IP", "Network Protocols"] },
      { title: "Router Configuration Basics", type: "document", source: "Cisco Learning Network", concepts: ["Routing", "Network Configuration"] }
    ],
    ml: [
      { title: "Backpropagation Explained", type: "video", source: "YouTube - 3Blue1Brown", concepts: ["Backpropagation", "Neural Networks"] },
      { title: "Feature Engineering Techniques", type: "article", source: "Machine Learning Mastery", concepts: ["Feature Engineering", "Data Preprocessing"] },
      { title: "Complete Guide to Decision Trees", type: "document", source: "Kaggle", concepts: ["Decision Trees", "Random Forests"] }
    ]
  };

  return resourceMap[subject] || [];
}

export default StudyPlanRecommendation;
