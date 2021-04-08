export interface Survey {
  id?: string;
  country: Country;
  agreedConsentTerms: boolean;
  agreedPolicyTerms: boolean;
  testTaken: TestType;
  pcrTestDate?: Date;
  pcrTestResult?: TestResult;
  antigenTestDate?: Date;
  antigenTestResult?: TestResult;
  ageGroup: AgeGroup;
  gender: Gender;
  biologicalSex: Gender;
  smokeLastSixMonths: boolean;
  currentSymptoms?: Symptom;
  symptomsStartedDate?: Date;
  currentRespiratoryCondition?: RespiratoryCondition;
  currentMedicalCondition?: MedicalCondition;
  otherSymptoms?: string;
  otherRespiratoryConditions?: string;
  otherMedicalConditions?: string;
  voiceRecordedUrl?: string;
  coughRecordedUrl?: string;
  files?: FileItem[];
  validateHashString?: string;
}

export interface FileItem {
  content: any;
  filename: string;
  contentType: string;
  encoding: string;
  fieldname: string;
}

export enum Country {
  'Brasil' = 'Brasil',
  'Peru' = 'Peru',
}

export enum TestResult {
  'Postivie' = 'Postivie',
  'Negative' = 'Negative',
  'None' = 'None',
}

export enum TestType {
  'PCR-based test (e.g. nose or mouth swab)' = 'PCR-based test (e.g. nose or mouth swab)',
  'Antigen test (e.g. nose or mouth swab)' = 'Antigen test (e.g. nose or mouth swab)',
  'Neither' = 'Neither',
}

export enum Gender {
  'Male' = 'Male',
  'Female' = 'Female',
  'Prefer not to say' = 'Prefer not to say',
  'Prefer to self describe' = 'Prefer to self describe',
}

export enum AgeGroup {
  '18 - 20' = '18 - 20',
  '21 - 29' = '21 - 29',
  '30 - 39' = '30 - 39',
  '40 - 49' = '40 - 49',
  '50 - 59' = '50 - 59',
  '60 - 69' = '60 - 69',
  '70 - 79' = '70 - 79',
  '80+' = '80+',
}

export enum Symptom {
  'Body aches' = 'Body aches',
  'Cough (dry)' = 'Cough (dry)',
  'Cough (wet, with mucus)' = 'Cough (wet, with mucus)',
  'Fever, chills, or sweating' = 'Fever, chills, or sweating',
  'Headaches' = 'Headaches',
  'Loss of taste and/or smell' = 'Loss of taste and/or smell',
  'New or worsening cough' = 'New or worsening cough',
  'Shortness of breath' = 'Shortness of breath',
  'Sore throat' = 'Sore throat',
  'Tightness in chest' = 'Tightness in chest',
  'Vomiting and diarrhea' = 'Vomiting and diarrhea',
  'None' = 'None',
}

export enum RespiratoryCondition {
  'Asthma' = 'Asthma',
  'Bronchitis' = 'Bronchitis',
  'COPD/emphysema' = 'COPD/emphysema',
  'Other chronic lung disease' = 'Other chronic lung disease',
  'Pneumonia' = 'Pneumonia',
  'Tuberculosis' = 'Tuberculosis',
  'None' = 'None',
}

export enum MedicalCondition {
  'Chronic lung disease' = 'Chronic lung disease',
  'Congestive heart failure' = 'Congestive heart failure',
  'Cough from other medical conditions' = 'Cough from other medical conditions',
  'Extreme obesity' = 'Extreme obesity',
  'HIV, AIDS, or impaired immune system' = 'HIV, AIDS, or impaired immune system',
  'Pulmonary fibrosis' = 'Pulmonary fibrosis',
  'Pregnancy' = 'Pregnancy',
  'Valvular heart disease' = 'Valvular heart disease',
  'None' = 'None',
}

export enum Language {
  'English' = 'English',
  'Spanish' = 'Spanish',
  'Portuguese' = 'Portuguese',
  'Japanese' = 'Japanese',
  'French' = 'French',
  'Hindi' = 'Hindi',
}
