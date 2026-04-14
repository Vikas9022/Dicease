// Medical Database - Disease Symptoms & Guidance
const MedicalDB = {
  diseases: [
    {
      id: 'covid19',
      name: 'COVID-19',
      category: 'Viral Infection',
      confidenceThreshold: 70,
      symptoms: {
        'fever': 0.95,
        'cough': 0.92,
        'shortness of breath': 0.88,
        'fatigue': 0.80,
        'sore throat': 0.65,
        'headache': 0.60,
        'loss of taste/smell': 1.0,
        'body aches': 0.70
      },
      severity: 'High',
      precautions: [
        'Isolate immediately',
        'Get tested (PCR/Antigen)',
        'Monitor oxygen levels',
        'Wear mask around others'
      ],
      treatment: [
        'Rest and hydration',
        'Paracetamol for fever',
        'Seek medical help if breathing difficulty',
        'Vaccination status check'
      ],
      whenToSeeDoctor: 'Difficulty breathing, chest pain, confusion'
    },
    {
      id: 'flu',
      name: 'Influenza (Flu)',
      category: 'Viral Infection',
      confidenceThreshold: 75,
      symptoms: {
        'fever': 0.90,
        'cough': 0.85,
        'sore throat': 0.80,
        'muscle aches': 0.88,
        'fatigue': 0.85,
        'headache': 0.75,
        'chills': 0.70
      },
      severity: 'Medium',
      precautions: [
        'Rest in bed',
        'Stay hydrated',
        'Avoid contact with others',
        'Frequent hand washing'
      ],
      treatment: [
        'OTC pain relievers (Paracetamol/Ibuprofen)',
        'Antiviral meds if early (within 48hrs)',
        'Honey for cough'
      ],
      whenToSeeDoctor: 'Symptoms >7 days, high fever >3 days'
    },
    {
      id: 'common_cold',
      name: 'Common Cold',
      category: 'Viral Infection',
      confidenceThreshold: 60,
      symptoms: {
        'sore throat': 0.85,
        'runny nose': 0.90,
        'sneezing': 0.88,
        'cough': 0.70,
        'mild fever': 0.40,
        'headache': 0.50
      },
      severity: 'Low',
      precautions: [
        'Frequent hand washing',
        'Avoid touching face',
        'Stay hydrated'
      ],
      treatment: [
        'Rest',
        'Saline nasal rinse',
        'OTC decongestants',
        'Honey/lemon for throat'
      ],
      whenToSeeDoctor: 'Symptoms persist >10 days'
    },
    {
      id: 'migraine',
      name: 'Migraine',
      category: 'Neurological',
      confidenceThreshold: 80,
      symptoms: {
        'headache': 0.98,
        'nausea': 0.85,
        'sensitivity to light': 0.90,
        'sensitivity to sound': 0.75,
        'visual aura': 0.60,
        'neck pain': 0.50
      },
      severity: 'Medium',
      precautions: [
        'Identify triggers (food/stress)',
        'Regular sleep schedule',
        'Avoid bright screens during attack'
      ],
      treatment: [
        'Dark quiet room',
        'OTC pain relief (Ibuprofen)',
        'Triptans if prescribed',
        'Hydration'
      ],
      whenToSeeDoctor: 'First time, sudden change in pattern'
    },
    {
      id: 'food_poisoning',
      name: 'Food Poisoning',
      category: 'Gastrointestinal',
      confidenceThreshold: 85,
      symptoms: {
        'nausea': 0.95,
        'vomiting': 0.92,
        'diarrhea': 0.90,
        'abdominal pain': 0.85,
        'fever': 0.60
      },
      severity: 'Medium',
      precautions: [
        'Avoid dairy/spicy food',
        'Hand hygiene',
        'Safe food handling'
      ],
      treatment: [
        'Oral rehydration salts',
        'BRAT diet (Banana, Rice, Apple, Toast)',
        'Rest'
      ],
      whenToSeeDoctor: 'Blood in stool, dehydration signs'
    },
    {
      id: 'gastritis',
      name: 'Gastritis',
      category: 'Gastrointestinal',
      confidenceThreshold: 75,
      symptoms: {
        'abdominal pain': 0.90,
        'nausea': 0.80,
        'vomiting': 0.70,
        'bloating': 0.75,
        'loss of appetite': 0.65
      },
      severity: 'Low',
      precautions: [
        'Avoid NSAIDs, alcohol, spicy foods',
        'Small frequent meals',
        'Stress management'
      ],
      treatment: [
        'Antacids',
        'PPI medications if prescribed',
        'Probiotics'
      ],
      whenToSeeDoctor: 'Persistent >2 weeks, weight loss'
    },
    {
      id: 'anemia',
      name: 'Iron Deficiency Anemia',
      category: 'Hematological',
      confidenceThreshold: 70,
      symptoms: {
        'fatigue': 0.95,
        'pale skin': 0.85,
        'shortness of breath': 0.75,
        'dizziness': 0.70,
        'cold hands/feet': 0.60
      },
      severity: 'Low',
      precautions: [
        'Iron-rich foods (spinach, red meat)',
        'Vitamin C with meals',
        'Avoid tea/coffee with meals'
      ],
      treatment: [
        'Iron supplements',
        'Dietary changes',
        'Treat underlying cause'
      ],
      whenToSeeDoctor: 'Always - requires blood tests'
    },
    {
      id: 'dehydration',
      name: 'Dehydration',
      category: 'Electrolyte Imbalance',
      confidenceThreshold: 80,
      symptoms: {
        'dry mouth': 0.90,
        'dark urine': 0.85,
        'fatigue': 0.75,
        'dizziness': 0.80,
        'headache': 0.70
      },
      severity: 'Medium',
      precautions: [
        'Drink 2-3L water daily',
        'Electrolyte drinks if exercising'
      ],
      treatment: [
        'Oral rehydration solution',
        'Rest in cool environment'
      ],
      whenToSeeDoctor: 'No urine >8hrs, confusion'
    }
  ],

  getPrediction(symptoms) {
    let scores = [];
    
    this.diseases.forEach(disease => {
      let score = 0;
      let symptomCount = 0;
      
      Object.keys(disease.symptoms).forEach(symptom => {
        if (symptoms.includes(symptom)) {
          score += disease.symptoms[symptom] * 100;
          symptomCount++;
        }
      });
      
      if (symptomCount > 0 && score / symptomCount >= disease.confidenceThreshold) {
        scores.push({
          ...disease,
          confidence: Math.round(score / symptomCount),
          matchingSymptoms: symptomCount
        });
      }
    });
    
    // Sort by confidence
    scores.sort((a, b) => b.confidence - a.confidence);
    return scores.slice(0, 3);
  }
};

export default MedicalDB;
