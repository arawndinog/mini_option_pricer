from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import numpy as np
import black_scholes

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/calculate_option_value')
def calculate_option_value():
    S = float(request.args.get('spotprice'))
    sigma = float(request.args.get('volatility'))
    r = float(request.args.get('interestrate'))
    q = float(request.args.get('reporate'))
    T = float(request.args.get('maturity'))
    K = float(request.args.get('strikeprice'))
    option_type = request.args.get('optiontype')
    result = black_scholes.option_value(S, K, T, sigma, r, q, option_type)
    return jsonify({"result":result})

@app.route('/calculate_implied_vol')
def calculate_implied_vol():
    S = float(request.args.get('spotprice'))
    sigma = float(request.args.get('volatility'))
    r = float(request.args.get('interestrate'))
    q = float(request.args.get('reporate'))
    T = float(request.args.get('maturity'))
    K = float(request.args.get('strikeprice'))
    C_true = float(request.args.get('optionpremium'))
    option_type = request.args.get('optiontype')
    result = black_scholes.newtons_method(C_true, S, K, T, r, q, option_type)
    return jsonify({"result":result})

if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=5600, debug = True)