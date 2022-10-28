type HospitalData = {
  value: string;
  label: string;
};

export const hospitalIdData: CommonJSON<HospitalData[]> = {
  Colombia: [
    { value: 'IDIME-BOGOTA-LAGO', label: 'IDIME-BOGOTA-LAGO' },
    { value: 'IDIME-BOGOTA-TOBERÍN', label: 'IDIME-BOGOTA-TOBERÍN' },
    { value: 'IDIME-BOGOTA-OCCIDENTE', label: 'IDIME-BOGOTA-OCCIDENTE' },
    { value: 'IDIME-BOGOTA- LABMÓVIL', label: 'IDIME-BOGOTA- LABMÓVIL' },
    { value: 'IDIME-CALI-CNC', label: 'IDIME-CALI-CNC' },
    { value: 'IDIME-CALI-CNRUU', label: 'IDIME-CALI-CNRUU' },
    { value: 'IDIME-CALI-CDESA', label: 'IDIME-CALI-CDESA' },
  ],
  Pakistan: [
    { value: 'indus-hospital', label: 'Indus Hospital' },
  ],
  Japan: [
    { value: 'PCRNOW-AKASAKA', label: 'PCRNOW-AKASAKA' },
  ],
};

export function getHospitalIdFor(country: string) {
  return hospitalIdData[country] || null;
}
