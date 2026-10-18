import React from 'react';
import { X, ShieldAlert, FileText, Lock, Mail, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface ModalProps {
  type: 'about' | 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
  language: Language;
}

export const FooterModals: React.FC<ModalProps> = ({ type, onClose, language }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#E2EAE3] shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E2EAE3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F8F2] flex items-center justify-center text-[#16834A]">
              {type === 'about' && <FileText className="w-5 h-5" />}
              {type === 'privacy' && <Lock className="w-5 h-5" />}
              {type === 'terms' && <ShieldAlert className="w-5 h-5" />}
              {type === 'contact' && <Mail className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#17231C]">
                {type === 'about' && 'About FormSaathi AI'}
                {type === 'privacy' && 'Privacy Policy & Data Ethics'}
                {type === 'terms' && 'Terms of Service & Civic Disclaimer'}
                {type === 'contact' && 'Civic Support & Contact'}
              </h3>
              <p className="text-xs text-[#68756C]">
                Your Voice Guide to Forms • Independent Citizen Assistance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#68756C] hover:text-[#17231C] hover:bg-[#F0F8F2] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 text-sm text-[#17231C] leading-relaxed">
          {type === 'about' && (
            <>
              <p className="font-semibold text-base text-[#105C38]">
                Empowering every citizen to understand bureaucratic paperwork with confidence.
              </p>
              <p>
                Millions of hardworking citizens, students, and seniors across India face severe anxiety when applying for basic certificates like Income Certificates, Caste Certificates, Ration Cards, and Scholarships because government application forms are filled with legalistic English jargon and complex instructions.
              </p>
              <p>
                <strong>FormSaathi AI</strong> bridges this digital divide. Built with multimodal Google Gemini technology and multilingual speech capabilities, FormSaathi translates confusing fields into clear, simple Marathi, Hindi, and everyday English, giving citizens the power to prepare documents correctly before visiting local administrative offices.
              </p>
              <div className="bg-[#F0F8F2] p-4 rounded-2xl border border-[#16834A]/20 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#105C38]">
                  Core Principles
                </h4>
                <ul className="space-y-1.5 text-xs text-[#17231C]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#16834A] shrink-0" />
                    Plain language explanations instead of bureaucratic jargon.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#16834A] shrink-0" />
                    Voice-first assistance for rural citizens and low-literacy users.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#16834A] shrink-0" />
                    Strict privacy: no sensitive personal identification stored.
                  </li>
                </ul>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                <strong>FormSaathi AI adheres to strict data privacy principles:</strong>
              </p>
              <ul className="space-y-2.5 list-disc pl-5">
                <li>
                  <strong>No Account Required:</strong> You can explain forms, ask questions, and prepare checklists completely anonymously without creating an account or logging in.
                </li>
                <li>
                  <strong>No Unnecessary Sensitive Data:</strong> FormSaathi AI never asks for or stores sensitive identifiers such as Aadhaar numbers, PAN numbers, bank passwords, or OTPs.
                </li>
                <li>
                  <strong>Local Session Storage:</strong> Your form analysis and guided preparation summaries reside in your browser's local memory for your session only.
                </li>
                <li>
                  <strong>Document Safety:</strong> Form images uploaded for analysis are processed securely via ephemeral multimodal server-side requests and are not retained as permanent training datasets.
                </li>
              </ul>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                <strong>Safety Reminder:</strong> Never upload unredacted banking passwords or confidential credentials to any public web app.
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <div className="p-4 bg-[#F0F8F2] border border-[#16834A]/30 rounded-2xl text-xs text-[#105C38] font-medium leading-relaxed">
                <strong>CRITICAL CIVIC DISCLAIMER:</strong> FormSaathi AI is an independent educational and civic assistance application. It is NOT affiliated with, authorized by, or endorsed by any government department or official ministry. FormSaathi AI DOES NOT issue certificates, approve applications, or directly submit documents to government servers.
              </div>
              <p>
                1. <strong>Verification Required:</strong> All requirements, fees, processing timelines, and checklist items must be officially verified with the competent administrative authority (e.g. your local Tahsildar Office, Setu Suvidha Kendra, Common Service Center, or official state portal).
              </p>
              <p>
                2. <strong>Fictional Examples:</strong> All sample data, name examples, and address templates presented in this application are strictly fictional and intended exclusively for educational clarity.
              </p>
              <p>
                3. <strong>Official Submissions:</strong> To submit your official application, navigate to the verified government portal links provided in the "Official Portals" section (such as Aaple Sarkar, ServicePlus, or National Scholarship Portal).
              </p>
            </>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p>
                Have feedback, feature suggestions, or need assistance understanding a specific civic form template? We would love to hear from you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl border border-[#E2EAE3] bg-[#FAFCFA]">
                  <span className="text-xs font-bold text-[#68756C] uppercase">Feedback & Suggestions</span>
                  <p className="font-semibold text-sm text-[#16834A] mt-1">support@formsaathi.org</p>
                  <p className="text-xs text-[#68756C] mt-1">Civic technology feedback</p>
                </div>
                <div className="p-4 rounded-2xl border border-[#E2EAE3] bg-[#FAFCFA]">
                  <span className="text-xs font-bold text-[#68756C] uppercase">Official Helpline Directory</span>
                  <p className="font-semibold text-sm text-[#105C38] mt-1">1800 120 8040 (Aaple Sarkar)</p>
                  <p className="text-xs text-[#68756C] mt-1">State citizen call center</p>
                </div>
              </div>
              <p className="text-xs text-[#68756C]">
                For actual application tracking status, please contact your local Setu Suvidha Kendra or check your application acknowledgment number on the state portal.
              </p>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="pt-4 border-t border-[#E2EAE3] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#16834A] hover:bg-[#105C38] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
