import os
import numpy as np
import pandas as pd
from functools import wraps
from dotenv import load_dotenv # dotenvをインポート
from flask import Flask, render_template, request, session, redirect, url_for
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import csv
from datetime import datetime
import pytz

load_dotenv() # .envファイルを読み込む

app = Flask(__name__)
# 環境変数からSECRET_KEYを読み込む
app.secret_key = os.environ.get('SECRET_KEY')

# --- 質問を保存するCSVファイル ---
LOG_FILE = 'logged_questions.csv'

# --- AIモデルとデータの読み込み（サーバー起動時に一度だけ実行）---
try:
    # モデルの読み込み
    model = SentenceTransformer('stsb-xlm-r-multilingual')
    # ベクトルデータの読み込み
    question_vectors = np.load('question_vectors.npy')
    # Q&Aデータの読み込み
    qa_df = pd.read_csv('qa_data.csv')
    print("モデルとデータの読み込みに成功しました。")
except Exception as e:
    print(f"モデルまたはデータの読み込みに失敗しました: {e}")
    model = None

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

@app.route('/ask', methods=['GET', 'POST'])
@login_required
def ask():
    answer = None
    question = ""
    error = None

    if model is None:
        error = "AIモデルの読み込みに失敗したため、現在この機能を使用できません。"
        return render_template('ask.html', error=error)
    
    if request.method == 'POST':
        question = request.form['question']
        if question:
            # --- ここから質問を保存する処理 ---
            try:
                # 日本時間を取得
                jst = pytz.timezone('Asia/Tokyo')
                timestamp = datetime.now(jst).strftime('%Y-%m-%d %H:%M:%S')
                
                # ファイルが空かどうかの確認
                file_exists = os.path.isfile(LOG_FILE) and os.path.getsize(LOG_FILE) > 0

                # ファイルに追記モードで書き込み
                with open(LOG_FILE, 'a', newline='', encoding='utf-8') as f:
                    writer = csv.writer(f)
                    # ファイルが空の場合、ヘッダーを書き込む
                    if not file_exists:
                        writer.writerow(['timestamp', 'question'])
                    writer.writerow([timestamp, question])
            except Exception as e:
                print(f"質問の保存中にエラーが発生しました: {e}")
            # --- ここまで ---

            # 1. ユーザーの質問をベクトル化
            user_vector = model.encode([question], convert_to_numpy=True)
            
            # 2. コサイン類似度を計算
            similarities = cosine_similarity(user_vector, question_vectors)
            
            # 3. 最も類似度が高い質問のインデックスを取得
            most_similar_index = np.argmax(similarities)
            
            # 4. 対応する答えを取得
            answer = qa_df.iloc[most_similar_index]['answer']

    return render_template('ask.html', question=question, answer=answer)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')