import { DocumentChecklistItem } from '../types';
import { supportedCertificates, defaultCertificateId, CertificateData } from './certificateData';

export const verifiedChecklistItems: DocumentChecklistItem[] =
  supportedCertificates[defaultCertificateId].checklist;

export function getChecklistForCertificate(certId: string, customRegistry?: Record<string, CertificateData>): DocumentChecklistItem[] {
  const all = { ...supportedCertificates, ...(customRegistry || {}) };
  const data = all[certId] || supportedCertificates[defaultCertificateId];
  // Return deep clone of default checklist for this certificate so modifications don't mutate template
  return JSON.parse(JSON.stringify(data.checklist));
}

