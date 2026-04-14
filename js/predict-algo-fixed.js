// Fixed Disease Prediction Algorithm - Fully Working
const MedicalDB = {
  diseases: [
    {
      id: 'covid19',
      name: 'COVID-19',
      category: 'Viral Infection',
      severity: 'High',
      confidence: 92,
      symptoms: ['fever', 'cough', 'shortness of breath', 'fatigue', 'sore throat', 'headache'],
      precautions: ['Isolate immediately', 'Get tested immediately', 'Monitor oxygen', 'Wear mask', 'Stay hydrated'],
      treatment: ['Rest', 'Paracetamol', 'Oxygen if needed'],
      whenToSeeDoctor: 'Difficulty breathing, chest pain, blue lips'
    },
    {
      id: 'flu',
      name: 'Influenza (Flu)',
      category: 'Viral Infection',
      severity: 'Medium',
      confidence: 87,
      symptoms: ['fever', 'cough', 'sore throat', 'muscle aches', 'fatigue', 'headache'],
      precautions: ['Rest', 'Hydration', 'Fever management', 'Isolation'],
      treatment: ['Paracetamol/Ibuprofen', 'Rest', 'Fluids'],
      whenToSeeDoctor: 'Fever >3 days, breathing difficulty'
    },
    {
      id: 'cold',
      name: 'Common Cold',
      category: 'Viral Infection',
      severity: 'Low',
      confidence: 78,
      symptoms: ['sore throat', 'runny nose', 'cough', 'sneezing', 'mild fever'],
      precautions: ['Hand washing', 'Rest', 'Hydration'],
      treatment: ['Rest', 'Honey for cough', 'Saline rinse'],
      whenToSeeDoctor: 'Symptoms >10 days'
    },
    {
      id: 'migraine',
      name: 'Migraine',
      category: 'Neurological',
      severity: 'Medium',
      confidence: 89,
      symptoms: ['headache', 'nausea', 'light sensitivity', 'sound sensitivity'],
      precautions: ['Dark room', 'Avoid triggers', 'Hydration'],
      treatment: ['Rest', 'Ibuprofen', 'Dark quiet room'],
      whenToSeeDoctor: 'Worst headache ever, neurological symptoms'
    },
    {
      id: 'food_poisoning',
      name: 'Food Poisoning',
      category: 'Gastrointestinal',
      severity: 'High',
      confidence: 91,
      symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'],
      precautions: ['Rehydration', 'BRAT diet', 'Rest'],
      treatment: ['ORS solution', 'Electrolytes', 'Rest'],
      whenToSeeDoctor: 'Dehydration, blood in stool'
    }
  ]
};

class PredictAlgo {
  constructor() {
    this.symptomSynonyms = {
      'fever': ['high temperature', 'hot', 'chills', 'temperature'],
      'cough': ['dry cough', 'wet cough', 'hacking cough'],
      'headache': ['pain in head', 'throbbing head', 'migraine'],
      'fatigue': ['tired', 'exhausted', 'weak', 'lethargy'],
      'sore throat': ['painful throat', 'scratchy throat'],
      'nausea': ['feeling sick', 'queasy', 'want to vomit'],
      'diarrhea': ['loose stool', 'frequent bathroom'],
      'shortness of breath': ['hard to breathe', 'breathless'],
      'abdominal pain': ['stomach ache', 'belly pain']
    };
  }

  normalizeSymptoms(input) {
    const symptoms = input.toLowerCase().split(/[\s,;.]+/).filter(s => s.length > 2);
    const normalized = [];
    
    symptoms.forEach(symptom => {
      // Exact match
      normalized.push(symptom);
      // Synonyms
      if (this.symptomSynonyms[symptom]) {
        normalized.push(...this.symptomSynonyms[symptom].slice(0, 1)); // Use main synonym
      }
    });
    
    return [...new Set(normalized)];
  }

  calculateScore(diseaseSymptoms, userSymptoms) {
    let score = 0;
    let matched = 0;
    
    userSymptoms.forEach(symptom => {
      if (diseaseSymptoms.includes(symptom)) {
        score += 25; // Base score per symptom
        matched++;
      }
    });
    
    if (matched > 2) score += 15; // Multi-symptom bonus
    if (matched === diseaseSymptoms.length) score += 20; // Perfect match bonus
    
    return Math.min(score, 95);
  }

  predict(symptomsText, selectedSymptoms = []) {
    const allSymptoms = [...new Set([
      ...this.normalizeSymptoms(symptomsText),
      ...selectedSymptoms
    ])];
    
    if (allSymptoms.length === 0) return [];

    const predictions = MedicalDB.diseases.map(disease => {
      const score = this.calculateScore(disease.symptoms, allSymptoms);
      if (score > 60) { // Minimum threshold
        return {
          name: disease.name,
          category: disease.category,
          confidence: score,
          severity: disease.severity,
          symptomsMatched: allSymptoms.filter(s => disease.symptoms.includes(s)),
          precautions: disease.precautions,
          treatment: disease.treatment,
          whenToSeeDoctor: disease.whenToSeeDoctor
        };
      }
    }).filter(Boolean);

    // Sort by confidence
    return predictions.sort((a, b) => b.confidence - a.confidence).slice(0, 4);
  }

  generateDetailedReport(prediction) {
    return {
      disease: prediction.name,
      confidence: prediction.confidence,
      risk: prediction.severity,
      immediateActions: prediction.precautions.slice(0, 3),
      homeTreatment: prediction.treatment || ['Rest', 'Hydration'],
      doctorWhen: prediction.whenToSeeDoctor,
      prevention: prediction.precautions.slice(3),
      category: prediction.category
    };
  }
}

export default new PredictAlgo();
