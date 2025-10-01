// Churn Prediction App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const resultContainer = document.getElementById('resultContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitBtn = document.getElementById('submitBtn');

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Show loading state
        showLoading();
        
        try {
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Convert form data to object
            for (let [key, value] of formData.entries()) {
                // Convert numeric fields
                if (['tenure', 'seniorCitizen', 'monthlyCharges', 'totalCharges'].includes(key)) {
                    data[key] = parseFloat(value);
                } else {
                    data[key] = value;
                }
            }

            // Make API request
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showResult(result);
            } else {
                showError(result.error || 'Bir hata oluştu');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Bağlantı hatası: ' + error.message);
        } finally {
            hideLoading();
        }
    });

    // Show loading state
    function showLoading() {
        loadingSpinner.classList.remove('d-none');
        resultContainer.classList.add('d-none');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>İşleniyor...';
        form.classList.add('form-submitting');
    }

    // Hide loading state
    function hideLoading() {
        loadingSpinner.classList.add('d-none');
        resultContainer.classList.remove('d-none');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-magic me-2"></i>Tahmin Yap';
        form.classList.remove('form-submitting');
    }

    // Show prediction result
    function showResult(result) {
        const prediction = result.prediction;
        const probability = result.probability_class_1;
        
        const isChurn = prediction === 1;
        const predictionText = isChurn ? 'Churn Riski Yüksek' : 'Churn Riski Düşük';
        const predictionClass = isChurn ? 'prediction-churn' : 'prediction-no-churn';
        const icon = isChurn ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
        
        // Calculate probability percentage
        const probabilityPercent = probability ? (probability * 100).toFixed(1) : 'N/A';
        
        // Determine probability level for styling
        let probabilityLevel = 'low';
        if (probability > 0.7) probabilityLevel = 'high';
        else if (probability > 0.4) probabilityLevel = 'medium';
        
        resultContainer.innerHTML = `
            <div class="result-card">
                <div class="text-center">
                    <i class="${icon} fa-3x mb-3 ${isChurn ? 'text-danger' : 'text-success'}"></i>
                    <h3 class="mb-3">Tahmin Sonucu</h3>
                    <div class="prediction-badge ${predictionClass}">
                        ${predictionText}
                    </div>
                    
                    ${probability ? `
                        <div class="mt-4">
                            <h5 class="mb-3">Churn Olasılığı: ${probabilityPercent}%</h5>
                            <div class="probability-bar">
                                <div class="probability-fill probability-${probabilityLevel}" 
                                     style="width: ${probabilityPercent}%"></div>
                            </div>
                            <small class="text-muted">
                                ${probabilityLevel === 'high' ? 'Yüksek risk' : 
                                  probabilityLevel === 'medium' ? 'Orta risk' : 'Düşük risk'}
                            </small>
                        </div>
                    ` : ''}
                    
                    <div class="mt-4">
                        <h6 class="text-muted mb-3">Ham Sonuçlar:</h6>
                        <div class="row">
                            <div class="col-6">
                                <div class="alert alert-light">
                                    <strong>Tahmin:</strong> ${prediction}
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="alert alert-light">
                                    <strong>Olasılık:</strong> ${probability ? probability.toFixed(4) : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-3">
                        <button class="btn btn-outline-primary" onclick="resetForm()">
                            <i class="fas fa-redo me-2"></i>Yeni Tahmin
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Show error message
    function showError(message) {
        resultContainer.innerHTML = `
            <div class="result-card">
                <div class="text-center">
                    <i class="fas fa-exclamation-circle fa-3x text-danger mb-3"></i>
                    <h4 class="text-danger mb-3">Hata Oluştu</h4>
                    <div class="alert alert-danger">
                        <i class="fas fa-bug me-2"></i>
                        ${message}
                    </div>
                    <button class="btn btn-outline-danger" onclick="resetForm()">
                        <i class="fas fa-redo me-2"></i>Tekrar Dene
                    </button>
                </div>
            </div>
        `;
    }

    // Reset form function (global scope)
    window.resetForm = function() {
        form.reset();
        form.classList.remove('was-validated');
        resultContainer.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>
                Lütfen formu doldurup "Tahmin Yap" butonuna tıklayın.
            </div>
        `;
    };

    // Auto-fill sample data for testing
    window.fillSampleData = function() {
        const sampleData = {
            gender: 'Male',
            seniorCitizen: '0',
            partner: 'Yes',
            dependents: 'No',
            tenure: '12',
            phoneService: 'Yes',
            multipleLines: 'No',
            internetService: 'DSL',
            onlineSecurity: 'No',
            onlineBackup: 'Yes',
            deviceProtection: 'No',
            techSupport: 'No',
            streamingTV: 'No',
            streamingMovies: 'No',
            contract: 'Month-to-month',
            paperlessBilling: 'Yes',
            paymentMethod: 'Electronic check',
            monthlyCharges: '53.85',
            totalCharges: '646.2'
        };

        Object.keys(sampleData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = sampleData[key];
            }
        });
    };

    // Add sample data button for testing
    const sampleButton = document.createElement('button');
    sampleButton.type = 'button';
    sampleButton.className = 'btn btn-outline-light btn-sm mt-2';
    sampleButton.innerHTML = '<i class="fas fa-flask me-2"></i>Örnek Veri Doldur';
    sampleButton.onclick = fillSampleData;
    
    const formContainer = document.querySelector('.col-md-10');
    if (formContainer) {
        formContainer.appendChild(sampleButton);
    }

    // Real-time form validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });

    // Prevent form submission on Enter key in number inputs
    const numberInputs = form.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
});
