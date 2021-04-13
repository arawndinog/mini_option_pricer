import numpy as np
from scipy.stats import norm
import math

def black_scholes_d(S, K, T, sigma, r, q, d=1):
    # d1: d=1
    # d2: d=-1
    return (np.log(S/K) + (r-q)*T)/(sigma*np.sqrt(T)) + d * (0.5*sigma*np.sqrt(T))

def option_value(S, K, T, sigma, r, q, option_type):
    d1 = black_scholes_d(S, K, T, sigma, r, q, 1)
    d2 = black_scholes_d(S, K, T, sigma, r, q, -1)
    if option_type == "call":
        option_mul = 1
    elif option_type == "put":
        option_mul = -1
    return option_mul * S * np.exp(-q * T) * norm.cdf(option_mul * d1, 0, 1) - option_mul * K * np.exp(-r * T) * norm.cdf(option_mul * d2, 0, 1)

def vega(S, K, T, sigma, r, q):
    d1 = black_scholes_d(S, K, T, sigma, r, q, 1)
    normhat = (1/np.sqrt(2*math.pi)) * np.exp(0.5*(-1)*d1*(sigma**2))
    result = S * np.exp(-q * T) * np.sqrt(T) * normhat
    return result

def newtons_method(C_true, S, K, T, r, q, option_type):
    sigmahat = np.sqrt(2*abs((np.log(S/K) + (r-q)*T)/T))
    tol = 1e-10; nmax = 1000
    sigmadiff = 1
    n = 1
    sigma = sigmahat
    while (sigmadiff >= tol and n < nmax):
        C = option_value(S, K, T, sigma, r, q, option_type)
        Cvega = vega(S, K, T, sigma, r, q)
        increment = (C - C_true) / Cvega
        sigma = sigma - increment
        n = n+1
        sigmadiff = abs(increment)
        if sigma < 0:
            # vol cannot be negative
            return "Volatility yielded negative"
    return sigma