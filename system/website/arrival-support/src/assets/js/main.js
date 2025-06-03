// SmartArrival Support - メインJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // フェードインアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animateElements = document.querySelectorAll('.service-card, .feature, .form-container');
    animateElements.forEach(el => observer.observe(el));

    // フォームバリデーション
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });

    // 予約フォームの日付制限
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        // 今日以降の日付のみ選択可能
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
    });

    // 電話番号フォーマット
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // 数字とハイフンのみ許可
            this.value = this.value.replace(/[^\d-]/g, '');
        });
    });

    // サービス選択時の価格表示
    const serviceSelects = document.querySelectorAll('select[name="service"]');
    serviceSelects.forEach(select => {
        select.addEventListener('change', function() {
            updatePrice(this.value);
        });
    });
});

// フォームバリデーション関数
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'この項目は必須です');
            isValid = false;
        } else {
            clearError(field);
        }
    });

    // メールアドレスの形式チェック
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showError(field, '正しいメールアドレスを入力してください');
            isValid = false;
        }
    });

    // 電話番号の形式チェック
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            showError(field, '正しい電話番号を入力してください');
            isValid = false;
        }
    });

    return isValid;
}

// エラー表示
function showError(field, message) {
    clearError(field);
    field.style.borderColor = '#ff6b6b';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// エラークリア
function clearError(field) {
    field.style.borderColor = '#e0e0e0';
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// メールアドレス形式チェック
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 電話番号形式チェック
function isValidPhone(phone) {
    const phoneRegex = /^[\d-]{10,15}$/;
    return phoneRegex.test(phone);
}

// 価格表示更新
function updatePrice(serviceType) {
    const priceDisplay = document.getElementById('price-display');
    if (!priceDisplay) return;

    const prices = {
        'basic': '1,500 THB',
        'advanced': '2,000 THB',
        'full': '3,000 THB',
        'custom': '要相談'
    };

    priceDisplay.textContent = prices[serviceType] || '要相談';
}

// 予約確認モーダル
function showBookingConfirmation(formData) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
    `;

    modalContent.innerHTML = `
        <h3>予約内容をご確認ください</h3>
        <div style="margin: 1.5rem 0; text-align: left;">
            <p><strong>サービス:</strong> ${formData.service}</p>
            <p><strong>到着日:</strong> ${formData.date}</p>
            <p><strong>便名:</strong> ${formData.flight}</p>
            <p><strong>お名前:</strong> ${formData.name}</p>
            <p><strong>連絡先:</strong> ${formData.contact}</p>
        </div>
        <button onclick="this.closest('.modal').remove()" style="
            background: #667eea;
            color: white;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            margin: 0 0.5rem;
        ">確認</button>
        <button onclick="this.closest('.modal').remove()" style="
            background: #ccc;
            color: #333;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            margin: 0 0.5rem;
        ">閉じる</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // モーダル外クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ローディング表示
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
    `;
    
    loading.innerHTML = `
        <div style="text-align: center;">
            <div style="
                border: 4px solid #f3f3f3;
                border-top: 4px solid #667eea;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            "></div>
            <p>処理中...</p>
        </div>
    `;
    
    // スピンアニメーション
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
} 