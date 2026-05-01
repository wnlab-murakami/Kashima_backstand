import os
from dotenv import load_dotenv
from flask import Flask, render_template
import csv
from datetime import datetime
import pytz
load_dotenv()

app = Flask(__name__)

# --- 質問を保存するCSVファイル ---
LOG_FILE = 'logged_questions.csv'

@app.route('/')
def home():
    phone_number = os.environ.get('PHONE_NUMBER')
    return render_template('index.html', phone_number=phone_number)

@app.route('/documents')
def documents():
    uploads_dir = os.path.join(app.static_folder, 'uploads')
    files = []

    # ▼▼▼ 1. ここに「一覧に出したくないファイル名」を書きます ▼▼▼
    excluded_files = ['Entrance_backstand.png', 'Inside_backstand.png']

    if os.path.exists(uploads_dir):
        supportted_extensions = {'.pdf', '.png'}

        # ▼▼▼ 2. 「除外リストに含まれていない(not in)」という条件を追加しました ▼▼▼
        files = [
            f for f in os.listdir(uploads_dir)
            if os.path.splitext(f)[1].lower() in supportted_extensions
            and f not in excluded_files
        ]

    return render_template('documents.html', files=files)

@app.route('/backstand_entrance')
def backstand_entrance():
    return render_template('backstand_entrance.html')

@app.route('/backstand_inside')
def backstand_inside():
    return render_template('backstand_inside.html')

@app.route('/sofa-seat')
def third_floor_seats():
    return render_template('sofa-seat.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
