import os
from flask import Flask, render_template, request, session, redirect, url_for
from functools import wraps
from dotenv import load_dotenv # dotenvをインポート

load_dotenv() # .envファイルを読み込む

app = Flask(__name__)
# 環境変数からSECRET_KEYを読み込む
app.secret_key = os.environ.get('SECRET_KEY')

def login_required(f):
    @wraps(f)
    def decorated_view(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_view

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # 環境変数からパスワードを読み込む
        if request.form['password'] == os.environ.get('SITE_PASSWORD'):
            session['logged_in'] = True
            return redirect(url_for('home'))
        else:
            return "パスワードが違います"
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

@app.route('/')
@login_required
def home():
    return render_template('index.html')

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

@app.route('/third_floor_seats')
@login_required
def third_floor_seats():
    return render_template('third_floor_seats.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')