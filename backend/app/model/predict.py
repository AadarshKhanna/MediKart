import sys
import json
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

# Load model and labels
model = load_model("app/model/skin_model.h5")
with open("app/model/labels.json", "r") as f:
    labels = json.load(f)

# Get image path from command line
image_path = sys.argv[1]

# Preprocess image
img = load_img(image_path, target_size=(224, 224))
img = img_to_array(img)
img = np.expand_dims(img, axis=0)
img = img / 255.0

# Predict
preds = model.predict(img)[0]
predicted_index = np.argmax(preds)
confidence = float(preds[predicted_index])
label = list(labels.keys())[list(labels.values()).index(predicted_index)]

# Medicine/Doctor suggestion logic
suggestions = {
    "vitiligo skin disease": "Consult a dermatologist. Topical corticosteroids may help.",
    "melanoma skin disease": "Urgent dermatologist consultation recommended.",
    "ringworm skin infection": "Use antifungal creams like clotrimazole.",
    "chickenpox skin": "Antihistamines and calamine lotion. Consult a doctor.",
    "eczema skin": "Moisturizers and hydrocortisone cream. Dermatologist recommended.",
    "psoriasis skin": "Topical corticosteroids or phototherapy. See a specialist.",
    "warts skin": "Salicylic acid or cryotherapy. Consult a doctor.",
    "monkeypox skin": "Isolate and consult a healthcare provider immediately."
}

result = {
    "disease": label,
    "confidence": confidence,
    "suggestion": suggestions.get(label)
}

print(json.dumps(result))
