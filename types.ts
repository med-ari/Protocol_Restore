
export type ModuleId = 'm1_numbers' | 'm2_algebra';
export type SectorId = 'integers' | 'rationals' | 'percentages' | 'powers' | 'roots' | 'mini_test_numbers' | 'linear_functions' | 'algebraic_expressions' | 'factorization';
export type StageId = 'dashboard' | 'hook' | 'lab' | 'manual' | 'mission' | 'quiz' | 'bridge' | 'final_exam' | 'module_complete';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  difficulty: Difficulty;
  hint: string;
  tags?: string[];
}

export interface MissionStep {
  id: string;
  label: string;
  correctValue: number;
  placeholder?: string;
  errorFeedback?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  example: string;
}

export interface SectorData {
  id: SectorId;
  moduleId: ModuleId;
  name: string;
  symbol: string;
  description: string;
  hook: {
    title: string;
    message: string;
  };
  lab: {
    type: 'thermometer' | 'fraction-bar' | 'shield-slider' | 'power-growth' | 'root-square' | 'linear-graph' | 'algebra-sorter' | 'factor-area' | 'none';
    instruction: string;
    targetValue: number;
    initialValue: number;
    unit: string;
    hint: string;
  };
  manual: {
    title: string;
    sections: { title: string; content: string }[];
    hint: string;
    glossary?: GlossaryTerm[];
    recallQuestions?: { question: string; answer: string }[];
    learnMore?: {
      title: string;
      content: string;
    };
  };
  mission: {
    title: string;
    description: string;
    steps: MissionStep[];
    hint: string;
  };
  quiz: {
    questions: Question[];
    hint: string;
  };
  outro: string;
}

export interface AppState {
  currentModuleId: ModuleId;
  currentSectorId: SectorId | null;
  currentStage: StageId;
  unlockedSectors: SectorId[];
  completedSectors: SectorId[];
  hasSeenIntro: boolean;
}
