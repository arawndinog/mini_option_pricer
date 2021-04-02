import numpy as np

def binomial_tree(S, K, T, sigma, r, N, option_type):
    dt = T/N 
    u = np.exp(sigma * np.sqrt(dt))
    d = 1/u
    p = (np.exp(r * dt) - d) / (u - d)

    # tree as arr
    price_arr_shape = ((N+1, N+1))
    price_arr = np.zeros(price_arr_shape, dtype=np.float32)

    # fill tree/arr with stock price S(T) using u
    for i in range(price_arr_shape[0]):
        for j in range(price_arr_shape[1]):
            price_arr[i, j] = S * (u**(j - i))

    # set default option value to terminal option value (only terminal is usable)
    if option_type =="call":
        value_arr = np.maximum(price_arr-K, 0)
    elif option_type =="put":
        value_arr = np.maximum(K-price_arr, 0)
    
    # calculate values of remaining nodes by looping backwards
    for i in range(N-1, -1, -1):
        # avoid working on values outside the tree
        for j in range(N-1-i, -1, -1):
            f_u = value_arr[i, j+1]
            f_d = value_arr[i+1, j]
            if option_type =="call":
                value_arr[i, j] = np.maximum(value_arr[i, j], np.exp(-r * dt) * (p * f_u + (1-p) * f_d))
            elif option_type =="put":
                value_arr[i, j] = np.maximum(value_arr[i, j], np.exp(-r * dt) * (p * f_u + (1-p) * f_d))

    return float(value_arr[0,0])