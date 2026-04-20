from flask import Flask, render_template, request, jsonify, session
from functools import wraps
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-this')

# ✅ 여기서 PIN 번호를 변경하세요
PORTFOLIO_PIN = os.environ.get('PORTFOLIO_PIN', '1234')

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('authenticated'):
            return render_template('lock.html')
        return f(*args, **kwargs)
    return decorated

@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/verify-pin', methods=['POST'])
def verify_pin():
    data = request.get_json()
    pin = data.get('pin', '')
    if pin == PORTFOLIO_PIN:
        session['authenticated'] = True
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': '잘못된 PIN입니다.'})

@app.route('/logout')
def logout():
    session.clear()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
