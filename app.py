from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # CORS desteği ekle

# Modeli yükle
model = joblib.load("best_model_pipeline.pkl")

# Ana sayfa
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

# Sütun isimlerini model formatına çevir
def map_column_names(data):
    """Frontend'den gelen sütun isimlerini model formatına çevirir"""
    column_mapping = {
        'gender': 'gender',
        'seniorCitizen': 'SeniorCitizen',
        'partner': 'Partner',
        'dependents': 'Dependents',
        'tenure': 'tenure',
        'phoneService': 'PhoneService',
        'multipleLines': 'MultipleLines',
        'internetService': 'InternetService',
        'onlineSecurity': 'OnlineSecurity',
        'onlineBackup': 'OnlineBackup',
        'deviceProtection': 'DeviceProtection',
        'techSupport': 'TechSupport',
        'streamingTV': 'StreamingTV',
        'streamingMovies': 'StreamingMovies',
        'contract': 'Contract',
        'paperlessBilling': 'PaperlessBilling',
        'paymentMethod': 'PaymentMethod',
        'monthlyCharges': 'MonthlyCharges',
        'totalCharges': 'TotalCharges'
    }
    
    mapped_data = {}
    for frontend_key, model_key in column_mapping.items():
        if frontend_key in data:
            mapped_data[model_key] = data[frontend_key]
    
    return mapped_data

# Tahmin endpoint
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()  # JSON al
        if not data:
            return jsonify({"error": "Veri gönderilmedi"}), 400

        # Sütun isimlerini model formatına çevir
        mapped_data = map_column_names(data)
        
        # Debug: Gelen veriyi ve çevrilen veriyi yazdır
        print(f"Gelen veri: {data}")
        print(f"Çevrilen veri: {mapped_data}")
        
        df = pd.DataFrame([mapped_data])
        print(f"DataFrame sütunları: {df.columns.tolist()}")
        
        prediction = int(model.predict(df)[0])

        proba = None
        if hasattr(model, "predict_proba"):
            proba = float(model.predict_proba(df)[:, 1][0])  # class=1 ihtimali
        
        return jsonify({
            "prediction": prediction,
            "probability_class_1": proba
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
