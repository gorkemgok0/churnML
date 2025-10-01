# Churn Prediction API

Bu proje, Colab'de eğitilmiş bir makine öğrenmesi modelini Flask REST API olarak sunan ve modern bir web arayüzü ile test edilebilen bir uygulamadır.

## 🚀 Özellikler

- **Flask REST API**: Model tahminleri için RESTful endpoint'ler
- **Modern Web Arayüzü**: Bootstrap 5 ile responsive tasarım
- **CORS Desteği**: Frontend-backend iletişimi için
- **Gerçek Zamanlı Validasyon**: Form doğrulama ve kullanıcı geri bildirimi
- **Görsel Sonuçlar**: Tahmin sonuçları ve olasılık grafikleri

## 📁 Proje Yapısı

```
churn/
├── app.py                      # Flask backend uygulaması
├── best_model_pipeline.pkl     # Eğitilmiş ML modeli
├── requirements.txt            # Python bağımlılıkları
├── templates/
│   └── index.html             # Web arayüzü
├── static/
│   ├── style.css              # CSS stilleri
│   └── script.js              # JavaScript kodu
└── README.md                  # Bu dosya
```

## 🛠️ Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Model dosyasını kontrol edin:**
   - `best_model_pipeline.pkl` dosyasının proje klasöründe olduğundan emin olun

3. **Uygulamayı çalıştırın:**
   ```bash
   python app.py
   ```

4. **Tarayıcıda açın:**
   - http://127.0.0.1:5000 adresine gidin

## 📊 API Endpoints

### GET /
Ana sayfa - Web arayüzünü döndürür.

### POST /predict
Model tahmini yapar.

**Request Body (JSON):**
```json
{
    "gender": "Male",
    "seniorCitizen": 0,
    "partner": "Yes",
    "dependents": "No",
    "tenure": 12,
    "phoneService": "Yes",
    "multipleLines": "No",
    "internetService": "DSL",
    "onlineSecurity": "No",
    "onlineBackup": "Yes",
    "deviceProtection": "No",
    "techSupport": "No",
    "streamingTV": "No",
    "streamingMovies": "No",
    "contract": "Month-to-month",
    "paperlessBilling": "Yes",
    "paymentMethod": "Electronic check",
    "monthlyCharges": 53.85,
    "totalCharges": 646.2
}
```

**Response (JSON):**
```json
{
    "prediction": 0,
    "probability_class_1": 0.1234
}
```

## 🎨 Web Arayüzü Özellikleri

- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Form Validasyonu**: Gerçek zamanlı doğrulama
- **Loading States**: Kullanıcı deneyimi için yükleme göstergeleri
- **Görsel Sonuçlar**: Tahmin sonuçları ve olasılık çubukları
- **Örnek Veri**: Test için örnek veri doldurma butonu

## 🔧 Teknolojiler

- **Backend**: Flask, Pandas, Scikit-learn, Joblib
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6

## 📝 Kullanım

1. Web arayüzünde müşteri bilgilerini doldurun
2. "Tahmin Yap" butonuna tıklayın
3. Sonuçları görüntüleyin:
   - Churn riski (Yüksek/Düşük)
   - Olasılık yüzdesi
   - Görsel olasılık çubuğu
   - Ham model çıktıları

## 🧪 Test

Örnek veri ile test yapmak için:
1. "Örnek Veri Doldur" butonuna tıklayın
2. Form otomatik olarak doldurulacak
3. "Tahmin Yap" butonuna tıklayın

## ⚠️ Notlar

- Model dosyası (`best_model_pipeline.pkl`) proje klasöründe bulunmalıdır
- Model, scikit-learn pipeline formatında olmalıdır
- CORS desteği aktif olduğu için farklı portlardan erişim mümkündür

## 🐛 Sorun Giderme

**Model yüklenemiyor:**
- `best_model_pipeline.pkl` dosyasının varlığını kontrol edin
- Model dosyasının bozuk olmadığından emin olun

**CORS hatası:**
- `flask-cors` paketinin yüklü olduğundan emin olun
- Tarayıcı konsolunda hata mesajlarını kontrol edin

**Form gönderilmiyor:**
- Tüm zorunlu alanların doldurulduğundan emin olun
- Tarayıcı konsolunda JavaScript hatalarını kontrol edin
