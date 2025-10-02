import pandas as pd
from sentence_transformers import SentenceTransformer
import numpy as np

# 1. モデルの読み込み（日本語に強いモデルを選択）
model = SentenceTransformer('stsb-xlm-r-multilingual')

# 2. Q&Aデータの読み込み
df = pd.read_csv('qa_data.csv')
questions = df['question'].tolist()

# 3. 質問文をベクトルに変換
print("質問文のベクトル化を開始します...")
question_vectors = model.encode(questions, convert_to_numpy=True)
print("ベクトル化が完了しました。")

# 4. ベクトルデータをファイルに保存
np.save('question_vectors.npy', question_vectors)

print("ベクトルデータを'question_vectors.npy'として保存しました。")