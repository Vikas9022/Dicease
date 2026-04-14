// Advanced Disease Prediction Algorithm
import MedicalDB from './medical-db.js';

class PredictAlgo {
  constructor() {
    this.symptomSynonyms = {
      'fever': ['high temperature', 'hot', 'chills'],
      'cough': ['dry cough', 'productive cough', 'hacking cough'],
      'headache': ['migraine', 'throbbing head', 'pounding head'],
      'fatigue': ['tiredness', 'exhaustion', 'weakness'],
      'shortness of breath': ['difficulty breathing', 'breathless', 'gasping'],
      'sore throat': ['scratchy throat', 'painful swallow'],
      'nausea': ['queasy', 'sick to stomach'],
      'diarrhea': ['loose stools', 'frequent bowel movements'],
      'abdominal pain': ['stomach ache', 'belly pain', 'cramping'],
      'chest pain': ['tight chest', 'heart pain']
    };
  }

  normalizeSymptoms(inputSymptoms) {
    const normalized = inputSymptoms.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);

    // Add synonyms
    const expanded = [...normalized];
    normalized.forEach(symptom => {
      if (this.symptomSynonyms[symptom]) {
        expanded.push(...this.symptomSynonyms[symptom]);
      }
    });

    return [...new Set(expanded)];
  }

  predict(symptomsText, selectedSymptoms = []) {
    const allSymptoms = [...new Set([...this.normalizeSymptoms(symptomsText), ...selectedSymptoms])];
    
    // Get predictions from medical DB
    const predictions = MedicalDB.getPrediction(allSymptoms);
    
    // Enhance with additional scoring
    const enhancedPredictions = predictions.map(pred => {
      let bonusScore = 0;
      
      // Multi-symptom bonus
      if (allSymptoms.filter(s => pred.symptoms[s]).length > 2) {
        bonusScore += 5;
      }
      
      // Age/gender simulation bonus (demo)
      bonusScore += Math.random() * 3;
      
      return {
        ...pred,
        confidence: Math.min(98, pred.confidence + bonusScore),
        symptomsMatched: allSymptoms.filter(s => pred.symptoms[s]),
        totalSymptoms: allSymptoms.length
      };
    });

    return enhancedPredictions.slice(0, 4);
  }

  generateDetailedReport(prediction) {
    return {
      disease: prediction.name,
      confidence: prediction.confidence,
      risk: prediction.severity,
      immediateActions: prediction.precautions.slice(0, 3),
      homeTreatment: prediction.treatment,
      doctorWhen: prediction.whenToSeeDoctor,
      prevention: prediction.precautions.slice(3),
      category: prediction.category
    };
  }

  savePrediction(userData, symptoms, predictions) {
    const predictionRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      userId: userData?.id || 'anonymous',
      symptoms: symptoms,
      predictions: predictions.map(p => this.generateDetailedReport(p)),
      sessionId: crypto.randomUUID()
    };

    // Store in database
    Database.savePrediction(predictionRecord);
    return predictionRecord;
  }
}

export default new PredictAlgo();
