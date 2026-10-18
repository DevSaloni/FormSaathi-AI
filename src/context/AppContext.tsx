import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import {
  Language,
  ChatMessage,
  ConversationSession,
  FormExplanationResult,
  DocumentChecklistItem,
  RecentActivity,
  CertificateWorkflow
} from '../types';
import { supportedCertificates, defaultCertificateId, CertificateData, createCustomCertificateData } from '../data/certificateData';
import { getChecklistForCertificate } from '../data/checklistItems';

export type DashboardTab =
  | 'home'
  | 'explain'
  | 'voice'
  | 'wizard'
  | 'checklist'
  | 'portals'
  | 'settings';

export interface FormExplainerState {
  result: FormExplanationResult | null;
  metadata: {
    name?: string;
    size?: number;
    mimeType?: string;
    isSample?: boolean;
    sampleId?: string;
    previewSvg?: string;
    analyzedAt?: number;
  } | null;
  userNote: string;
}

export interface GuidedPrepState {
  answers: Record<string, string>;
  stepIndex: number;
  isReviewMode: boolean;
  selectedCertificateType: string;
}

export interface SettingsState {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  speechSpeed: number;
}

interface AppContextType {
  // Authoritative language
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;

  // Navigation & Workflow
  viewMode: 'landing' | 'dashboard';
  setViewMode: (mode: 'landing' | 'dashboard') => void;
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;
  lastVisitedSection: DashboardTab;

  // Certificate, State, District & Workflow
  selectedCertificate: string;
  setSelectedCertificate: (certId: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  activeWorkflowId: string;
  recentCertificates: string[];

  // Dynamic & Custom Requirements
  customCertificates: Record<string, CertificateData>;
  allCertificates: Record<string, CertificateData>;
  addCustomCertificate: (params: { name: string; department?: string; description?: string }) => string;
  deleteCustomCertificate: (id: string) => void;

  // Active Shared Certificate State
  activeWorkflow: CertificateWorkflow;
  conversationHistory: ChatMessage[];
  formAnalysis: FormExplanationResult | null;
  guidedPreparationProgress: {
    stepIndex: number;
    isReviewMode: boolean;
    answers: Record<string, string>;
  };
  documentChecklist: DocumentChecklistItem[];
  collectedAnswers: Record<string, string>;

  // Legacy & Direct Component Aliases
  checklistItems: DocumentChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  resetChecklist: () => void;

  guidedPrepState: GuidedPrepState;
  setGuidedAnswer: (questionId: string, answer: string) => void;
  setGuidedStepIndex: (idx: number) => void;
  setGuidedReviewMode: (isReview: boolean) => void;
  resetGuidedPrep: () => void;

  formExplainerState: FormExplainerState;
  setFormExplainerState: (state: Partial<FormExplainerState>, targetCertId?: string) => void;
  resetFormExplainer: () => void;
  setConversationFormContext: (context: FormExplanationResult | null) => void;

  // Conversations
  conversations: ConversationSession[];
  activeConversationId: string;
  activeConversation: ConversationSession;
  createNewConversation: (lang?: Language, initialTitle?: string) => string;
  switchConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearActiveConversation: () => void;
  addMessageToActiveConversation: (message: ChatMessage) => void;

  // Portal Search
  portalSearchQuery: string;
  setPortalSearchQuery: (query: string) => void;

  // Settings
  settings: SettingsState;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  setHighContrast: (enabled: boolean) => void;
  setSpeechSpeed: (speed: number) => void;

  // Activity Log
  recentActivities: RecentActivity[];
  logActivity: (type: RecentActivity['type'], title: string) => void;

  // Complete Reset
  clearAllLocalData: () => void;
}

const STORAGE_KEY = 'formsaathi_app_state_v4';

function createDefaultWelcomeMessage(certId: string, lang: Language, customRegistry?: Record<string, CertificateData>): ChatMessage {
  const all = { ...supportedCertificates, ...(customRegistry || {}) };
  const certTitle = all[certId]?.info.title[lang] || 'Certificate';
  const text = {
    mr: `नमस्कार! मी फॉर्मसाथी AI. तुम्ही सध्या "${certTitle}" साठी मदत घेत आहात. कागदपत्रे, सेतू केंद्रावरील प्रक्रिया किंवा अर्जातील रकान्यांबद्दल कोणताही प्रश्न विचारा.`,
    hi: `नमस्ते! मैं फॉर्मसाथी AI। आप वर्तमान में "${certTitle}" के लिए सहायता ले रहे हैं। आवश्यक दस्तावेज, प्रक्रिया या फॉर्म भरने के बारे में मुझसे कोई भी सवाल पूछें।`,
    en: `Hello! I am FormSaathi AI. You are currently preparing for "${certTitle}". Ask me any questions regarding required documents, Tahsil procedures, or form fields.`,
  }[lang];

  return {
    id: `msg_welcome_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    sender: 'bot',
    text,
    timestamp: Date.now(),
    language: lang,
  };
}

function initializeDefaultWorkflow(certId: string, state: string, district: string, lang: Language, customRegistry?: Record<string, CertificateData>): CertificateWorkflow {
  return {
    id: certId,
    state,
    district,
    conversationHistory: [createDefaultWelcomeMessage(certId, lang, customRegistry)],
    formAnalysis: null,
    formMetadata: null,
    formUserNote: '',
    guidedPreparationProgress: {
      stepIndex: 0,
      isReviewMode: false,
      answers: {},
    },
    documentChecklist: getChecklistForCertificate(certId, customRegistry),
    collectedAnswers: {},
    lastUpdated: Date.now(),
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const [selectedLanguage, setSelectedLanguageState] = useState<Language>('mr');
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardTab, setDashboardTabInternal] = useState<DashboardTab>('home');
  const [lastVisitedSection, setLastVisitedSection] = useState<DashboardTab>('home');

  const [selectedCertificate, setSelectedCertificateState] = useState<string>(defaultCertificateId);
  const [selectedState, setSelectedStateInternal] = useState<string>('Maharashtra (महाराष्ट्र)');
  const [selectedDistrict, setSelectedDistrictInternal] = useState<string>('Pune');
  const [recentCertificates, setRecentCertificates] = useState<string[]>([defaultCertificateId]);

  // Dynamic & Custom Certificates registry
  const [customCertificates, setCustomCertificates] = useState<Record<string, CertificateData>>({});

  // Combined certificates dictionary (built-in + user custom)
  const allCertificates = useMemo<Record<string, CertificateData>>(
    () => ({ ...supportedCertificates, ...customCertificates }),
    [customCertificates]
  );

  const [portalSearchQuery, setPortalSearchQuery] = useState<string>('');

  // Per-certificate workflows registry
  const [workflows, setWorkflows] = useState<Record<string, CertificateWorkflow>>(() => ({
    [defaultCertificateId]: initializeDefaultWorkflow(defaultCertificateId, 'Maharashtra (महाराष्ट्र)', 'Pune', 'mr'),
  }));

  const [settings, setSettings] = useState<SettingsState>({
    fontSize: 'normal',
    highContrast: false,
    speechSpeed: 1.0,
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: 'init_act',
      type: 'certificate_switch',
      title: 'FormSaathi AI session started',
      timestamp: Date.now(),
    },
  ]);

  // Tab navigation setter that also updates lastVisitedSection
  const setDashboardTab = (tab: DashboardTab) => {
    setDashboardTabInternal(tab);
    setLastVisitedSection(tab);
  };

  // Restore stored state once on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('formsaathi_app_state_v3');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.selectedLanguage && ['mr', 'hi', 'en'].includes(parsed.selectedLanguage)) {
          setSelectedLanguageState(parsed.selectedLanguage);
        }
        if (parsed.viewMode && ['landing', 'dashboard'].includes(parsed.viewMode)) {
          setViewMode(parsed.viewMode);
        }
        if (parsed.dashboardTab) {
          setDashboardTabInternal(parsed.dashboardTab);
          setLastVisitedSection(parsed.dashboardTab);
        }
        if (parsed.selectedCertificate) {
          setSelectedCertificateState(parsed.selectedCertificate);
        }
        if (parsed.selectedState) {
          setSelectedStateInternal(parsed.selectedState);
        }
        if (parsed.selectedDistrict) {
          setSelectedDistrictInternal(parsed.selectedDistrict);
        }
        if (Array.isArray(parsed.recentCertificates) && parsed.recentCertificates.length > 0) {
          setRecentCertificates(parsed.recentCertificates);
        }
        if (typeof parsed.portalSearchQuery === 'string') {
          setPortalSearchQuery(parsed.portalSearchQuery);
        }
        if (parsed.customCertificates && typeof parsed.customCertificates === 'object') {
          setCustomCertificates(parsed.customCertificates);
        }

        if (parsed.workflows && typeof parsed.workflows === 'object') {
          // Validate and restore workflows per certificate
          const restoredWorkflows: Record<string, CertificateWorkflow> = {};
          for (const [key, wf] of Object.entries(parsed.workflows as Record<string, any>)) {
            if (wf && typeof wf === 'object') {
              const baseChecklist = getChecklistForCertificate(key);
              const savedCheckedMap: Record<string, boolean> = {};
              if (Array.isArray(wf.documentChecklist)) {
                wf.documentChecklist.forEach((it: any) => {
                  if (it?.id) savedCheckedMap[it.id] = !!it.checked;
                });
              }

              restoredWorkflows[key] = {
                id: key,
                state: wf.state || parsed.selectedState || 'Maharashtra (महाराष्ट्र)',
                district: wf.district || parsed.selectedDistrict || 'Pune',
                conversationHistory: Array.isArray(wf.conversationHistory) && wf.conversationHistory.length > 0
                  ? wf.conversationHistory
                  : [createDefaultWelcomeMessage(key, parsed.selectedLanguage || 'mr')],
                formAnalysis: wf.formAnalysis || null,
                formMetadata: wf.formMetadata || null,
                formUserNote: wf.formUserNote || '',
                guidedPreparationProgress: {
                  stepIndex: typeof wf.guidedPreparationProgress?.stepIndex === 'number' ? wf.guidedPreparationProgress.stepIndex : 0,
                  isReviewMode: !!wf.guidedPreparationProgress?.isReviewMode,
                  answers: wf.guidedPreparationProgress?.answers || {},
                },
                documentChecklist: baseChecklist.map((item) => ({
                  ...item,
                  checked: savedCheckedMap[item.id] !== undefined ? savedCheckedMap[item.id] : item.checked,
                })),
                collectedAnswers: wf.collectedAnswers || wf.guidedPreparationProgress?.answers || {},
                lastUpdated: wf.lastUpdated || Date.now(),
              };
            }
          }

          if (Object.keys(restoredWorkflows).length > 0) {
            setWorkflows(restoredWorkflows);
          }
        } else if (parsed.guidedPrepState || parsed.checklistItems || parsed.conversations) {
          // Migration from v3 flat state to v4 per-certificate workflow
          const activeCert = parsed.selectedCertificate || defaultCertificateId;
          const baseChecklist = getChecklistForCertificate(activeCert);
          const savedCheckedMap: Record<string, boolean> = {};
          if (Array.isArray(parsed.checklistItems)) {
            parsed.checklistItems.forEach((it: any) => {
              if (it?.id) savedCheckedMap[it.id] = !!it.checked;
            });
          }

          const legacyMessages: ChatMessage[] = [];
          if (Array.isArray(parsed.conversations) && parsed.conversations[0]?.messages) {
            legacyMessages.push(...parsed.conversations[0].messages);
          }

          setWorkflows({
            [activeCert]: {
              id: activeCert,
              state: parsed.selectedState || 'Maharashtra (महाराष्ट्र)',
              district: parsed.selectedDistrict || 'Pune',
              conversationHistory: legacyMessages.length > 0 ? legacyMessages : [createDefaultWelcomeMessage(activeCert, parsed.selectedLanguage || 'mr')],
              formAnalysis: parsed.formExplainerState?.result || null,
              formMetadata: parsed.formExplainerState?.metadata || null,
              formUserNote: parsed.formExplainerState?.userNote || '',
              guidedPreparationProgress: {
                stepIndex: parsed.guidedPrepState?.stepIndex || 0,
                isReviewMode: !!parsed.guidedPrepState?.isReviewMode,
                answers: parsed.guidedPrepState?.answers || {},
              },
              documentChecklist: baseChecklist.map((item) => ({
                ...item,
                checked: savedCheckedMap[item.id] !== undefined ? savedCheckedMap[item.id] : item.checked,
              })),
              collectedAnswers: parsed.guidedPrepState?.answers || {},
              lastUpdated: Date.now(),
            },
          });
        }

        if (parsed.settings) {
          setSettings({
            fontSize: ['normal', 'large', 'xlarge'].includes(parsed.settings.fontSize)
              ? parsed.settings.fontSize
              : 'normal',
            highContrast: !!parsed.settings.highContrast,
            speechSpeed: typeof parsed.settings.speechSpeed === 'number' ? parsed.settings.speechSpeed : 1.0,
          });
        }

        if (Array.isArray(parsed.recentActivities)) {
          setRecentActivities(parsed.recentActivities.slice(0, 25));
        }
      }
    } catch (e) {
      console.warn('Could not restore stored FormSaathi state from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Debounced auto-save to localStorage
  const saveTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (!isInitialized) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        // Strip large data URLs if any before writing to localStorage
        const sanitizedWorkflows: Record<string, any> = {};
        for (const [k, wf] of Object.entries(workflows)) {
          sanitizedWorkflows[k] = {
            id: wf.id,
            state: wf.state,
            district: wf.district,
            conversationHistory: wf.conversationHistory.slice(-50),
            formAnalysis: wf.formAnalysis,
            formMetadata: wf.formMetadata ? {
              name: wf.formMetadata.name,
              size: wf.formMetadata.size,
              mimeType: wf.formMetadata.mimeType,
              analyzedAt: wf.formMetadata.analyzedAt,
              isSample: wf.formMetadata.isSample,
              sampleId: wf.formMetadata.sampleId,
            } : null,
            formUserNote: wf.formUserNote,
            guidedPreparationProgress: wf.guidedPreparationProgress,
            documentChecklist: wf.documentChecklist.map((it) => ({ id: it.id, checked: it.checked })),
            collectedAnswers: wf.collectedAnswers,
            lastUpdated: wf.lastUpdated,
          };
        }

        const stateToPersist = {
          selectedLanguage,
          viewMode,
          dashboardTab,
          lastVisitedSection,
          selectedCertificate,
          selectedState,
          selectedDistrict,
          recentCertificates,
          portalSearchQuery,
          customCertificates,
          workflows: sanitizedWorkflows,
          settings,
          recentActivities: recentActivities.slice(0, 25),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
      } catch (e) {
        console.warn('Failed to write FormSaathi state to localStorage:', e);
      }
    }, 250);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    isInitialized,
    selectedLanguage,
    viewMode,
    dashboardTab,
    lastVisitedSection,
    selectedCertificate,
    selectedState,
    selectedDistrict,
    recentCertificates,
    portalSearchQuery,
    customCertificates,
    workflows,
    settings,
    recentActivities,
  ]);

  // Active workflow getter
  const activeWorkflow: CertificateWorkflow =
    workflows[selectedCertificate] ||
    initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage, allCertificates);

  // Switch Certificate Handler: Preserves previous workflow and loads/initializes new one
  const setSelectedCertificate = (certId: string) => {
    if (!certId || certId === selectedCertificate) return;

    // Ensure target workflow exists in registry
    setWorkflows((prev) => {
      if (prev[certId]) {
        return prev;
      }
      return {
        ...prev,
        [certId]: initializeDefaultWorkflow(certId, selectedState, selectedDistrict, selectedLanguage, allCertificates),
      };
    });

    setSelectedCertificateState(certId);
    setRecentCertificates((prev) => {
      const filtered = prev.filter((c) => c !== certId);
      return [certId, ...filtered].slice(0, 8);
    });

    logActivity('certificate_switch', `Switched certificate to ${allCertificates[certId]?.info.title[selectedLanguage] || certId}`);
  };

  // Add Custom Requirement / Certificate
  const addCustomCertificate = (params: { name: string; department?: string; description?: string }): string => {
    const rawId = `custom_${Date.now()}_${params.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15)}`;
    const newCertData = createCustomCertificateData({
      id: rawId,
      name: params.name,
      department: params.department,
      description: params.description,
    });

    setCustomCertificates((prev) => ({
      ...prev,
      [rawId]: newCertData,
    }));

    const newWorkflow = initializeDefaultWorkflow(
      rawId,
      selectedState,
      selectedDistrict,
      selectedLanguage,
      { [rawId]: newCertData }
    );

    setWorkflows((prev) => ({
      ...prev,
      [rawId]: newWorkflow,
    }));

    setSelectedCertificateState(rawId);
    setRecentCertificates((prev) => [rawId, ...prev.filter((c) => c !== rawId)].slice(0, 8));

    logActivity('certificate_switch', `Added custom civic requirement: ${params.name}`);
    return rawId;
  };

  // Delete Custom Requirement
  const deleteCustomCertificate = (id: string) => {
    setCustomCertificates((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (selectedCertificate === id) {
      setSelectedCertificate(defaultCertificateId);
    }
  };

  const setSelectedState = (state: string) => {
    setSelectedStateInternal(state);
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, state, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          state,
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const setSelectedDistrict = (district: string) => {
    setSelectedDistrictInternal(district);
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, district, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          district,
          lastUpdated: Date.now(),
        },
      };
    });
  };

  // Change authoritative language across all workflows
  const setSelectedLanguage = (lang: Language) => {
    setSelectedLanguageState(lang);
  };

  // Log activity helper
  const logActivity = (type: RecentActivity['type'], title: string) => {
    const act: RecentActivity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      title,
      timestamp: Date.now(),
    };
    setRecentActivities((prev) => [act, ...prev.slice(0, 24)]);
  };

  // Document Checklist operations on active workflow
  const toggleChecklistItem = (id: string) => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      const updatedList = current.documentChecklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      const targetItem = updatedList.find((i) => i.id === id);
      logActivity(
        'checklist_toggle',
        `${targetItem?.checked ? 'Checked' : 'Unchecked'} ${targetItem?.title[selectedLanguage] || id}`
      );
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          documentChecklist: updatedList,
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const resetChecklist = () => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          documentChecklist: getChecklistForCertificate(selectedCertificate),
          lastUpdated: Date.now(),
        },
      };
    });
  };

  // Guided Prep operations on active workflow
  const setGuidedAnswer = (questionId: string, answer: string) => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      const updatedAnswers = {
        ...current.guidedPreparationProgress.answers,
        [questionId]: answer,
      };
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          guidedPreparationProgress: {
            ...current.guidedPreparationProgress,
            answers: updatedAnswers,
          },
          collectedAnswers: updatedAnswers,
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const setGuidedStepIndex = (stepIndex: number) => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          guidedPreparationProgress: {
            ...current.guidedPreparationProgress,
            stepIndex,
          },
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const setGuidedReviewMode = (isReviewMode: boolean) => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          guidedPreparationProgress: {
            ...current.guidedPreparationProgress,
            isReviewMode,
          },
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const resetGuidedPrep = () => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          guidedPreparationProgress: {
            stepIndex: 0,
            isReviewMode: false,
            answers: {},
          },
          collectedAnswers: {},
          lastUpdated: Date.now(),
        },
      };
    });
  };

  // Form Explainer operations on active workflow (or optionally explicit target certificate)
  const setFormExplainerState = (partial: Partial<FormExplainerState>, targetCertId?: string) => {
    const certKey = targetCertId || selectedCertificate;
    setWorkflows((prev) => {
      const current = prev[certKey] || initializeDefaultWorkflow(certKey, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [certKey]: {
          ...current,
          formAnalysis: partial.result !== undefined ? partial.result : current.formAnalysis,
          formMetadata: partial.metadata !== undefined ? partial.metadata : current.formMetadata,
          formUserNote: partial.userNote !== undefined ? partial.userNote : current.formUserNote,
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const resetFormExplainer = () => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          formAnalysis: null,
          formMetadata: null,
          formUserNote: '',
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const setConversationFormContext = (context: FormExplanationResult | null) => {
    setFormExplainerState({ result: context });
  };

  // Conversation history operations on active workflow
  const addMessageToActiveConversation = (message: ChatMessage) => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          conversationHistory: [...current.conversationHistory, message],
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const clearActiveConversation = () => {
    setWorkflows((prev) => {
      const current = prev[selectedCertificate] || initializeDefaultWorkflow(selectedCertificate, selectedState, selectedDistrict, selectedLanguage);
      return {
        ...prev,
        [selectedCertificate]: {
          ...current,
          conversationHistory: [createDefaultWelcomeMessage(selectedCertificate, selectedLanguage)],
          lastUpdated: Date.now(),
        },
      };
    });
  };

  // Multi-conversation compatibility layer
  const createNewConversation = (lang: Language = selectedLanguage, _initialTitle?: string): string => {
    clearActiveConversation();
    return `wf_conv_${selectedCertificate}_${Date.now()}`;
  };

  const switchConversation = (_id: string) => {
    // Already scoped to active workflow
  };

  const deleteConversation = (_id: string) => {
    clearActiveConversation();
  };

  const clearAllLocalData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('formsaathi_app_state_v3');
    setSelectedCertificateState(defaultCertificateId);
    setSelectedStateInternal('Maharashtra (महाराष्ट्र)');
    setSelectedDistrictInternal('Pune');
    setSelectedLanguageState('mr');
    setDashboardTabInternal('home');
    setLastVisitedSection('home');
    setWorkflows({
      [defaultCertificateId]: initializeDefaultWorkflow(defaultCertificateId, 'Maharashtra (महाराष्ट्र)', 'Pune', 'mr'),
    });
    setRecentActivities([
      {
        id: `act_${Date.now()}`,
        type: 'certificate_switch',
        title: 'All saved data cleared and reset',
        timestamp: Date.now(),
      },
    ]);
  };

  // Create virtual active ConversationSession for compatibility with VoiceAssistantView
  const activeConversation: ConversationSession = {
    id: `conv_${selectedCertificate}`,
    title: supportedCertificates[selectedCertificate]?.info.title[selectedLanguage] || 'Conversation',
    language: selectedLanguage,
    createdAt: activeWorkflow.lastUpdated,
    updatedAt: activeWorkflow.lastUpdated,
    messages: activeWorkflow.conversationHistory,
    formContext: activeWorkflow.formAnalysis,
    certificateId: selectedCertificate,
  };

  const conversations: ConversationSession[] = [activeConversation];

  const formExplainerState: FormExplainerState = {
    result: activeWorkflow.formAnalysis,
    metadata: activeWorkflow.formMetadata,
    userNote: activeWorkflow.formUserNote,
  };

  const guidedPrepState: GuidedPrepState = {
    answers: activeWorkflow.guidedPreparationProgress.answers,
    stepIndex: activeWorkflow.guidedPreparationProgress.stepIndex,
    isReviewMode: activeWorkflow.guidedPreparationProgress.isReviewMode,
    selectedCertificateType: selectedCertificate,
  };

  return (
    <AppContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        viewMode,
        setViewMode,
        dashboardTab,
        setDashboardTab,
        lastVisitedSection,
        selectedCertificate,
        setSelectedCertificate,
        selectedState,
        setSelectedState,
        selectedDistrict,
        setSelectedDistrict,
        activeWorkflowId: selectedCertificate,
        recentCertificates,
        customCertificates,
        allCertificates,
        addCustomCertificate,
        deleteCustomCertificate,
        activeWorkflow,
        conversationHistory: activeWorkflow.conversationHistory,
        formAnalysis: activeWorkflow.formAnalysis,
        guidedPreparationProgress: activeWorkflow.guidedPreparationProgress,
        documentChecklist: activeWorkflow.documentChecklist,
        collectedAnswers: activeWorkflow.collectedAnswers,
        checklistItems: activeWorkflow.documentChecklist,
        toggleChecklistItem,
        resetChecklist,
        guidedPrepState,
        setGuidedAnswer,
        setGuidedStepIndex,
        setGuidedReviewMode,
        resetGuidedPrep,
        formExplainerState,
        setFormExplainerState,
        resetFormExplainer,
        setConversationFormContext,
        conversations,
        activeConversationId: `conv_${selectedCertificate}`,
        activeConversation,
        createNewConversation,
        switchConversation,
        deleteConversation,
        clearActiveConversation,
        addMessageToActiveConversation,
        portalSearchQuery,
        setPortalSearchQuery,
        settings,
        setFontSize: (fontSize) => setSettings((s) => ({ ...s, fontSize })),
        setHighContrast: (highContrast) => setSettings((s) => ({ ...s, highContrast })),
        setSpeechSpeed: (speechSpeed) => setSettings((s) => ({ ...s, speechSpeed })),
        recentActivities,
        logActivity,
        clearAllLocalData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
