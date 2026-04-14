# Disease Prediction Algorithm Enhancement - TODO

## Plan:
**Information Gathered:**
- Current predict.html: Symptom chat, grid selection, demo random predictions w/ results
- Needs: Real ML-like algorithm, medical guidance/precautions, database storage

**Detailed Plan:**
1. **Enhanced Algorithm (JS)**: Rule-based + symptom matrix → accurate predictions (Flu/COVID/Diabetes etc.)
2. **Medical Database**: JSON w/ diseases, symptoms, confidence, precautions, treatments
3. **Results**: Severity-ranked cards w/ guidance (Do's/Don'ts, when to see doctor)
4. **Database**: LocalStorage + IndexedDB for user predictions history (name/email → predictions array)
5. **Auth Integration**: Store user predictions linked to login/signup

**Files:**
- `js/medical-db.js` - Diseases + symptoms matrix
- `js/predict-algo.js` - ML-like prediction engine
- Update `predict.html` - Enhanced UI + database save
- `js/database.js` - Local storage engine

**Followup:** Test predictions, verify accuracy, check storage

Ready to implement?
