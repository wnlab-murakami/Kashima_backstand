// static/main.js
document.addEventListener('DOMContentLoaded', function() {
    // アニメーションさせたい要素を全て取得
    const fadeInElements = document.querySelectorAll('.fade-in-element');

    // 取得した各要素に is-visible クラスを追加
    fadeInElements.forEach(element => {
        element.classList.add('is-visible');
    });
});