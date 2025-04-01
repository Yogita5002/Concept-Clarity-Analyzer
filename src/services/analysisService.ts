
import { AnalysisResult, KeyConcept } from "../components/analysis/ConceptAnalysisResults";

// Mock NLP analysis service
export const analyzeConceptClarity = (text: string, subject: string): Promise<AnalysisResult> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = mockAnalysis(text, subject);
      resolve(result);
    }, 1500);
  });
};

// Mock keyword detection based on subject
const subjectKeywords: Record<string, string[]> = {
  ds: ["binary search tree", "time complexity", "algorithm", "data structure", "tree traversal", "linked list", "sorting", "graph", "hash table", "adjacency matrix"],
  dbms: ["normalization", "sql", "transaction", "acid", "entity relationship", "join", "query", "primary key", "foreign key", "index"],
  ai: ["machine learning", "neural network", "supervised", "unsupervised", "deep learning", "classification", "regression", "clustering", "reinforcement learning", "nlp"],
  os: ["process", "scheduling", "memory management", "deadlock", "synchronization", "virtual memory", "file system", "page replacement", "cpu scheduling", "ipc"],
  cn: ["osi model", "tcp/ip", "routing", "subnet", "protocol", "ip address", "dns", "http", "encryption", "network layer"],
  ml: ["backpropagation", "feature engineering", "decision tree", "random forest", "overfitting", "underfitting", "cross-validation", "regularization", "gradient descent", "evaluation metric"]
};

// Mock analysis function
const mockAnalysis = (text: string, subject: string): AnalysisResult => {
  const keywords = subjectKeywords[subject] || [];
  const lowerText = text.toLowerCase();
  
  // Count keyword occurrences and quality
  const keywordOccurrences = keywords.map(keyword => {
    const count = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    const surroundingText = getSurroundingContext(lowerText, keyword);
    const quality = assessQuality(surroundingText, keyword);
    
    return { keyword, count, quality, context: surroundingText };
  }).filter(k => k.count > 0);
  
  // Generate mastered concepts
  const masteredConcepts: KeyConcept[] = keywordOccurrences
    .filter(k => k.quality === 'high')
    .slice(0, 2)
    .map(k => ({
      name: capitalizeFirstLetter(k.keyword),
      mastery: "high",
      explanation: `Your explanation of ${k.keyword} demonstrates a strong understanding of the concept.`
    }));
  
  // Generate concepts to improve
  const conceptsToImprove: KeyConcept[] = keywordOccurrences
    .filter(k => k.quality === 'medium' || k.quality === 'low')
    .slice(0, 3)
    .map(k => ({
      name: capitalizeFirstLetter(k.keyword),
      mastery: k.quality as "medium" | "low",
      explanation: k.quality === 'medium' 
        ? `You have a basic understanding of ${k.keyword}, but could benefit from deeper exploration.` 
        : `Your explanation of ${k.keyword} needs significant improvement.`
    }));
  
  // Generate missing concepts
  const coveredKeywords = keywordOccurrences.map(k => k.keyword);
  const missingConcepts = keywords
    .filter(keyword => !coveredKeywords.includes(keyword))
    .slice(0, 4)
    .map(capitalizeFirstLetter);
  
  // Calculate overall score based on keyword coverage and quality
  const totalKeywords = keywords.length;
  const coverageScore = (coveredKeywords.length / totalKeywords) * 100;
  const qualityScore = calculateQualityScore(keywordOccurrences);
  let overallScore = Math.round((coverageScore * 0.4) + (qualityScore * 0.6));
  
  // Ensure score is between 0-100
  overallScore = Math.min(100, Math.max(0, overallScore));
  
  return {
    overallScore,
    conceptsMastered: masteredConcepts,
    conceptsToImprove,
    missingConcepts,
  };
};

// Helper functions
function getSurroundingContext(text: string, keyword: string): string {
  const index = text.indexOf(keyword);
  if (index === -1) return "";
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + keyword.length + 50);
  return text.substring(start, end);
}

function assessQuality(context: string, keyword: string): "high" | "medium" | "low" {
  if (!context) return "low";
  
  // Simple quality assessment based on surrounding text length and complexity
  const contextWords = context.split(/\s+/).length;
  
  if (contextWords > 30 && containsRelatedTerms(context, keyword)) {
    return "high";
  } else if (contextWords > 15) {
    return "medium";
  } else {
    return "low";
  }
}

function containsRelatedTerms(context: string, keyword: string): boolean {
  // Simple check for related terms based on keyword
  const relatedTermsMap: Record<string, string[]> = {
    "binary search tree": ["balanced", "traversal", "node", "leaf", "root"],
    "normalization": ["normal form", "redundancy", "dependency", "relation"],
    "neural network": ["neuron", "layer", "activation", "weight", "bias"],
    "process": ["thread", "cpu", "scheduler", "context switch"],
    "osi model": ["layer", "application", "transport", "network", "physical"],
    "backpropagation": ["gradient", "error", "weight", "learning rate"]
  };
  
  const termsToCheck = Object.entries(relatedTermsMap)
    .find(([key]) => keyword.includes(key))
    ?.[1] || [];
    
  return termsToCheck.some(term => context.includes(term));
}

function calculateQualityScore(keywordOccurrences: { keyword: string; count: number; quality: string }[]): number {
  if (keywordOccurrences.length === 0) return 0;
  
  const qualityMap = { high: 1, medium: 0.6, low: 0.3 };
  const totalQuality = keywordOccurrences.reduce((sum, k) => 
    sum + (qualityMap[k.quality as keyof typeof qualityMap] || 0), 0);
  
  return (totalQuality / keywordOccurrences.length) * 100;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
