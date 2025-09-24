import os
from flask import Flask, render_template, request, session, redirect, url_for
from functools import wraps

app = Flask(__name__)
# 必ず自分だけの秘密のキーに変更してください
app.secret_key = 'your_very_secret_key_here'

# ログインを要求するデコレータ
def login_required(f):
    @wraps(f)
    def decorated_view(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_view

# ログインページの処理
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # メンバーに共有するパスワードをここで設定
        if request.form['password'] == 'kashima': 
            session['logged_in'] = True
            return redirect(url_for('home'))
        else:
            return "パスワードが違います"
    return render_template('login.html')

# ログアウトの処理
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

# ホームページ
@app.route('/')
@login_required
def home():
    return render_template('index.html')

# 資料一覧ページ
@app.route('/documents')
@login_required
def documents():
    uploads_dir = os.path.join(app.static_folder, 'uploads')
    files = []
    if os.path.exists(uploads_dir):
        files = os.listdir(uploads_dir)
    return render_template('documents.html', files=files)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')