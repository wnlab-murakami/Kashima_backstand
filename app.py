import os
from functools import wraps
from dotenv import load_dotenv # dotenvをインポート
from flask import Flask, render_template, request, session, redirect, url_for
import csv
from datetime import datetime
import pytz
load_dotenv() # .envファイルを読み込む

app = Flask(__name__)
# 環境変数からSECRET_KEYを読み込む
app.secret_key = os.environ.get('SECRET_KEY')

# --- 質問を保存するCSVファイル ---
LOG_FILE = 'logged_questions.csv'

def login_required(f):
    @wraps(f)
    def decorated_view(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_view

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        # 環境変数からパスワードを読み込む
        if request.form['password'] == os.environ.get('SITE_PASSWORD'):
            session['logged_in'] = True
            return redirect(url_for('home'))
        else:
            error = 'パスワードが正しくありません'
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

@app.route('/')
@login_required
def home():
    phone_number = os.environ.get('PHONE_NUMBER')
    return render_template('index.html', phone_number=phone_number)

@app.route('/documents')
@login_required
def documents():
    uploads_dir = os.path.join(app.static_folder, 'uploads')
    files = []
    if os.path.exists(uploads_dir):
        supportted_extensions = {'.pdf', '.png'}
        files = [f for f in os.listdir(uploads_dir) if os.path.splitext(f)[1].lower() in supportted_extensions]
    return render_template('documents.html', files=files)

# 新しく追加するルート
@app.route('/backstand_entrance')
@login_required
def backstand_entrance():
    return render_template('backstand_entrance.html')

@app.route('/backstand_inside')
@login_required
def backstand_inside():
    return render_template('backstand_inside.html')

@app.route('/sofa-seat')
@login_required
def third_floor_seats():
    return render_template('sofa-seat.html')

@app.route('/faq')
@login_required
def faq():
    return render_template('faq.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')