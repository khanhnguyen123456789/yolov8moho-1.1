export interface TechStackItem {
  name: string;
  icon: JSX.Element;
  description: string;
}

export interface FeatureDetail {
  title: string;
  description: string;
  subItems?: string[];
  diagram?: React.FC;
  interactiveComponent?: React.FC;
  codeExample?: {
    code: string;
    language: string;
    title: string;
  };
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  description: string;
  tasks: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface HardwareSpec {
  spec: string;
  value: string;
}

export interface EcosystemComponent {
  title: string;
  icon: JSX.Element;
  description: string;
}

export interface ProjectGoal {
  title: string;
  description: string;
}

export interface ReleaseChecklistItem {
    text: string;
    status: 'completed' | 'in-progress' | 'upcoming';
}

// New types for the Final Sprint
export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}

export interface SprintTask {
  description: string;
  code?: CodeSnippet;
}

export interface SprintPhase {
  phase: number;
  title: string;
  description: string;
  tasks: SprintTask[];
}

// New types for Documentation
export interface DocStep {
  title: string;
  content: string;
}

export interface DocumentationArticle {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  steps?: DocStep[];
  interactiveComponent?: React.FC;
}