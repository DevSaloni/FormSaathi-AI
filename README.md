# FormSaathi AI — Your Voice Guide to Forms (फॉर्मसाथी AI)

FormSaathi AI is an accessible, multilingual civic technology application designed to help citizens, rural residents, students, and seniors understand complex application forms, prepare verified supporting documents, and navigate official government procedures in **Marathi (मराठी)**, **Hindi (हिंदी)**, and **simple English**.

---

## 🌟 Key Features

1. **AI Form Photo Explainer (Multimodal Vision)**
   - Upload any photograph, scan, or screenshot of an application form (PNG, JPEG, WebP up to 10 MB).
   - Powered by **Google Gemini 3.8 Flash** with structured schema extraction.
   - Field-by-field breakdown: original label, plain-language translation, clear fictional example, common pitfalls/cautions, and required status.
   - Built-in "Read Aloud" audio synthesis and follow-up query action.
   - Pre-loaded with verified sample forms (Revenue Income Certificate, National Scholarship Portal, Ration Card family member addition).

2. **Multilingual Voice Assistant**
   - Natural spoken interaction in Marathi, Hindi, and English using Web Speech recognition with typed keyboard fallback.
   - Direct voice answers to common questions regarding certificates, fees, and procedures.
   - High-fidelity speech playback prioritizing **Gemini 3.8 Flash Lite TTS** with automatic browser speech synthesis fallback.

3. **Guided Form Preparation Wizard**
   - One-question-at-a-time interactive flow minimizing cognitive overload and paperwork anxiety.
   - Speech-to-text voice input for answers.
   - Review and editing summary screen before submission.
   - Export and print a clean preparation sheet to take to administrative service centers (Setu / CSC / Tahsil).

4. **Verified Document Checklist**
   - Pre-configured checklist for citizen applications (Income Certificate, Domicile, Scholarships).
   - Clear distinction between **Officially Verified Requirements** and **Items to Confirm Locally**.
   - Interactive progress meter, check-off indicators, and printable checklist format.

5. **Official Next Steps & Government Portal Directory**
   - Curated directory of genuine government portals (Aaple Sarkar, ServicePlus, National Scholarship Portal, DigiLocker, PM-Kisan).
   - Direct, secure links (`rel="noopener noreferrer"`) to prevent users from falling victim to middleman fee fraud or unofficial spoof domains.

6. **Accessibility & Privacy First**
   - Large touch targets (48px+), high-contrast visual mode toggle, and adjustable typography scale (Standard, Large, Extra Large).
   - Anonymous-first architecture: no forced accounts or collection of Aadhaar numbers, OTPs, or financial secrets.
   - One-click local session data wipe.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons.
- **Backend:** Node.js Express server (`server.ts`) with Vite integration.
- **AI Models:**
  - `gemini-3.8-flash`: Multimodal form analysis, field extraction, and conversational reasoning.
  - `gemini-3.8-flash-lite-tts`: Natural speech generation for Marathi, Hindi, and English.
- **SDK:** `@google/genai` (official Google GenAI TypeScript SDK).
- **Speech APIs:** Browser Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with server-side TTS bridging.

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js (version 20 or higher recommended)
- A Gemini API Key from Google AI Studio

### Installation

1. Clone or open the project workspace:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API Key in `.env`:
   ```env
   GEMINI_API_KEY="your_actual_api_key_here"
   PORT=3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. Build and run production server:
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Security & Civic Responsibility

- **Independent Tool:** FormSaathi AI is an independent educational and civic assistance application. It does not issue certificates, approve applications, or submit forms directly to government databases.
- **Untrusted Input Handling:** Text inside uploaded documents is treated strictly as untrusted input data rather than prompt instructions.
- **Zero Sensitive Credential Storage:** The application intentionally avoids storing Aadhaar numbers, PAN numbers, bank passwords, or OTPs.

---

## 📄 License
Apache-2.0
