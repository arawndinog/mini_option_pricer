from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
import numpy as np
import black_scholes
import american_option
import asian_option
import basket_option

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/calculate_european_option_value')
def calculate_european_option_value():
    S = float(request.args.get('spotprice'))
    sigma = float(request.args.get('volatility'))
    r = float(request.args.get('interestrate'))
    q = float(request.args.get('reporate'))
    T = float(request.args.get('maturity'))
    K = float(request.args.get('strikeprice'))
    option_type = request.args.get('optiontype')
    try:
        result = black_scholes.option_value(S, K, T, sigma, r, q, option_type)
    except Exception as e:
        return jsonify({"result":str(e)})
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
    try:
        result = black_scholes.newtons_method(C_true, S, K, T, r, q, option_type)
    except Exception as e:
        return jsonify({"result":str(e)})
    return jsonify({"result":result})

@app.route('/calculate_american_option_value')
def calculate_american_option_value():
    S = float(request.args.get('spotprice'))
    sigma = float(request.args.get('volatility'))
    r = float(request.args.get('interestrate'))
    T = float(request.args.get('maturity'))
    K = float(request.args.get('strikeprice'))
    N = int(request.args.get('observations'))
    option_type = request.args.get('optiontype')
    try:
        result = american_option.binomial_tree(S, K, T, sigma, r, N, option_type)
    except Exception as e:
        return jsonify({"result":str(e)})
    return jsonify({"result":result})

@app.route('/calculate_asian_option_value')
def calculate_asian_option_value():
    S = float(request.args.get('spotprice'))
    sigma = float(request.args.get('volatility'))
    r = float(request.args.get('interestrate'))
    T = float(request.args.get('maturity'))
    K = float(request.args.get('strikeprice'))
    option_type = request.args.get('optiontype')

    asian_type = request.args.get('asiantype')
    N = int(request.args.get('observations'))
    M = int(request.args.get('montecarlopath'))

    result = None
    confmc = None
    try:
        asian_option_model = asian_option.AsianOptionCal(sigma=sigma,N=N,S=S,K=K,T=T,r=r,M=M,option=option_type)
        if asian_type == "geo_bs":
            result = asian_option_model.geometricClosedForm()
        elif  asian_type == "geo_mc":
            result = asian_option_model.geometricStandardMC()
        elif asian_type == "arithm_mc":
            results = asian_option_model.arithmeticStandardMC()
            result = str(float(results[0]))
            confmc = str([np.around(results[1][0], 5), np.around(results[1][1], 5)])
        elif asian_type == "arithm_cv":
            results = asian_option_model.arithmeticStandardMCWithCV()
            result = str(float(results[0]))
            confmc = str([np.around(results[1][0], 5), np.around(results[1][1], 5)])
    except Exception as e:
        return jsonify({"result":str(e)})

    return jsonify({"result":result, "confmc":confmc})

@app.route('/calculate_basket_option_value')
def calculate_basket_option_value():
    s0_1 = float(request.args.get('spotprice'))
    s0_2 = float(request.args.get('spotprice2'))
    sigma_1 = float(request.args.get('volatility'))
    sigma_2 = float(request.args.get('volatility2'))
    r = float(request.args.get('interestrate'))
    T = float(request.args.get('maturity'))
    K = float(request.args.get('strikeprice'))
    option_type = request.args.get('optiontype')

    rho = float(request.args.get('correlation'))
    M = int(request.args.get('montecarlopath'))
    basket_type = request.args.get('baskettype')

    result = None
    confmc = None
    try:
        if basket_type == "geo_mc":
            basket_option_model = basket_option.basketGeo(s0_1, s0_2, sigma_1, sigma_2, r, T, K, rho, option_type)
            result = basket_option_model.basketGeoPrice()
        elif basket_type == "arithm_mc":
            basket_option_model = basket_option.basketArith(s0_1, s0_2, sigma_1, sigma_2, r, T, K, rho, option_type, M, False)
            results = basket_option_model.pricing()
            result = str(float(results[0]))
            confmc = str([np.around(results[1][0][0], 5), np.around(results[1][1][0], 5)])
        elif basket_type == "arithm_cv":
            basket_option_model = basket_option.basketArith(s0_1, s0_2, sigma_1, sigma_2, r, T, K, rho, option_type, M, True)
            results = basket_option_model.pricing()
            result = str(float(results[0]))
            confmc = str([np.around(results[1][0][0], 5), np.around(results[1][1][0], 5)])
    except Exception as e:
        return jsonify({"result":str(e)})

    return jsonify({"result":result, "confmc":confmc})

if __name__ == "__main__":
    app.run(port=5600, debug = True)