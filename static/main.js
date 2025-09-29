// static/main.js
document.addEventListener('DOMContentLoaded', function() {
    // アニメーションさせたい要素を全て取得
    const fadeInElements = document.querySelectorAll('.fade-in-element');

    // 取得した各要素に is-visible クラスを追加
    fadeInElements.forEach(element => {
        element.classList.add('is-visible');
    });
});

// Q&Aのアコーディオン機能
document.querySelectorAll('.qa-question').forEach(question => {
    question.addEventListener('click', () => {
        // クリックされた質問に対応する答えを取得
        const answer = question.nextElementSibling;
        
        // 答えの表示・非表示を切り替える
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            question.classList.remove('active');
        } else {
            answer.style.display = 'block';
            question.classList.add('active');
        }
    });
});