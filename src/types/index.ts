export type Language = 'en' | 'hi' | 'mr';

export interface FormField {
  id: string;
  originalLabel: string;
  simplifiedLabel: string;
  explanation: string;
  fictionalExample: string;
  caution: string;
  isRequired?: boolean;
  isUnclearOrBlurry?: boolean;
}

export interface FormExplanationResult {
  formTitle: string;
  apparentPurpose: string;
  languageExplainedIn: string;
  authorityOrDepartment: string;
  overallSummary: string;
  fields: FormField[];
  requiredDocuments: string[];
  unclearPortions: string[];
  importantVerificationNotes: string[];
  imagePreviewUrl?: string;
  associatedCertificateId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: number;
  language?: Language;
}

export interface ConversationSession {
  id: string;
  title: string;
  language: Language;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  formContext?: FormExplanationResult | null;
  certificateId?: string;
}

export interface RecentActivity {
  id: string;
  type: 'form_scan' | 'voice_query' | 'guided_step' | 'checklist_toggle' | 'certificate_switch';
  title: string;
  timestamp: number;
}

export interface GuidedQuestion {
  id: string;
  label: string;
  category: 'applicant' | 'family' | 'income' | 'purpose' | 'address' | 'proof';
  simplifiedQuestion: {
    en: string;
    hi: string;
    mr: string;
  };
  explanation: {
    en: string;
    hi: string;
    mr: string;
  };
  exampleAnswer: {
    en: string;
    hi: string;
    mr: string;
  };
  cautionNote: {
    en: string;
    hi: string;
    mr: string;
  };
  placeholder: {
    en: string;
    hi: string;
    mr: string;
  };
  required: boolean;
}

export interface GuidedStage {
  id: string;
  stageNumber: number;
  stageKey:
    | 'purpose'
    | 'jurisdiction'
    | 'process'
    | 'eligibility'
    | 'documents'
    | 'form_fields'
    | 'review'
    | 'next_steps'
    | string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  summary: {
    en: string;
    hi: string;
    mr: string;
  };
  keyDetails: {
    en: string[];
    hi: string[];
    mr: string[];
  };
  questions?: GuidedQuestion[];
  officialNotice?: {
    en: string;
    hi: string;
    mr: string;
  };
}

export interface DocumentChecklistItem {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  whyNeeded?: {
    en: string;
    hi: string;
    mr: string;
  };
  category: 'identity' | 'address' | 'income' | 'proof' | 'optional';
  requirementType: 'required' | 'conditional' | 'optional' | 'verification';
  isOfficiallyVerified: boolean;
  officialAuthority?: string;
  officialPortalUrl?: string;
  lastVerifiedDate?: string;
  checked: boolean;
}

export interface CertificateInfo {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  shortDescription: {
    en: string;
    hi: string;
    mr: string;
  };
  department: {
    en: string;
    hi: string;
    mr: string;
  };
  standardIssuingAuthority: {
    en: string;
    hi: string;
    mr: string;
  };
  typicalDeliveryDays: number;
  officialFee: string;
  validityDuration: {
    en: string;
    hi: string;
    mr: string;
  };
  officialPortalName: string;
  officialPortalUrl: string;
  sampleFormId?: string;
}

export interface CertificateWorkflow {
  id: string; // Certificate ID, e.g. 'income_cert'
  state: string;
  district: string;
  conversationHistory: ChatMessage[];
  formAnalysis: FormExplanationResult | null;
  formMetadata: {
    name?: string;
    size?: number;
    mimeType?: string;
    previewSvg?: string;
    analyzedAt?: number;
    isSample?: boolean;
    sampleId?: string;
  } | null;
  formUserNote: string;
  guidedPreparationProgress: {
    stepIndex: number;
    isReviewMode: boolean;
    answers: Record<string, string>;
  };
  documentChecklist: DocumentChecklistItem[];
  collectedAnswers: Record<string, string>;
  lastUpdated: number;
}

export interface OfficialPortal {
  id: string;
  name: {
    en: string;
    hi: string;
    mr: string;
  };
  jurisdiction: string;
  department: string;
  url: string;
  servicesProvided: string[];
  verificationDate: string;
  safetyNotice: {
    en: string;
    hi: string;
    mr: string;
  };
}

export interface SampleForm {
  id: string;
  title: {
    en: string;
    hi: string;
    mr: string;
  };
  description: {
    en: string;
    hi: string;
    mr: string;
  };
  department: string;
  thumbnailSvg: string;
  explanation: FormExplanationResult;
}
