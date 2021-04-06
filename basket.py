import math
import numpy as np
from numpy.random import standard_normal as StdNormal
from scipy.stats import norm

class basketGeo:

    def __init__(self, s0_1 = None, s0_2 = None, sigma_1 = None, sigma_2 = None, 
                 r = 0, T = 0, K = None, rho = None, option_type = None):

        self.s0_1 = s0_1
        self.s0_2 = s0_2
        self.sigma_1 = sigma_1
        self.sigma_2 = sigma_2
        self.r = r
        self.T = T
        self.K = K
        self.rho = rho
        self.option_type = option_type

    def CallGeoBasket(self, t = 0):
        
        s0_1, s0_2, sigma_1, sigma_2, r, T, K, rho = self.s0_1, self.s0_2, self.sigma_1, self.sigma_2, self.r, self.T, self.K, self.rho
        
        C11, C12, C22 = 1, rho, 1 
        sigma_B = math.sqrt((sigma_1**2)*C11 + 2*sigma_1*sigma_2*C12 + sigma_2**2*C22)/2
        mu = r - (1/2)*((sigma_1**2 + sigma_2**2)/2) + (1/2)*sigma_B**2
        
        Bg = math.sqrt(s0_1*s0_2)
        d1 = (math.log(Bg/K) + (mu + (1/2)*sigma_B**2)*T)/(sigma_B*math.sqrt(T))
        d2 = d1 - sigma_B*math.sqrt(T)
        
        N_d1_P = norm.cdf(d1)
        N_d2_P = norm.cdf(d2)
        
        Call = math.e**(-(r*T))*(Bg*math.e**(mu*T)*N_d1_P - K*N_d2_P)
        
        return Call
    
    def PutGeoBasket(self, t = 0):
        
        s0_1, s0_2, sigma_1, sigma_2, r, T, K, rho = self.s0_1, self.s0_2, self.sigma_1, self.sigma_2, self.r, self.T, self.K, self.rho
        
        C11, C12, C22 = 1, rho, 1 
        sigma_B = math.sqrt((sigma_1**2)*C11 + 2*sigma_1*sigma_2*C12 + sigma_2**2*C22)/2
        mu = r - (1/2)*((sigma_1**2 + sigma_2**2)/2) + (1/2)*sigma_B**2
        
        Bg = math.sqrt(s0_1*s0_2)
        d1 = (math.log(Bg/K) + (mu + (1/2)*sigma_B**2)*T)/(sigma_B*math.sqrt(T))
        d2 = d1 - sigma_B*math.sqrt(T)
        
        N_d1_N = norm.cdf(-d1)
        N_d2_N = norm.cdf(-d2)
        
        Put = math.e**(-(r*T))*(K*N_d2_N - Bg*math.e**(mu*T)*N_d1_N)
        
        return Put


class basketArith(basketGeo):

    def __init__(self, s0_1=None, s0_2=None, sigma_1=None, sigma_2=None,
                 r=0, T=0, K=None, rho=None, option_type=None, m=100000,
                 ctrl_var=False):

        basketGeo.__init__(self, s0_1, s0_2, sigma_1, sigma_2, r, T,
                                    K, rho, option_type)
        self.m = m
        self.ctrl_var = ctrl_var

    def pricing(self, num_randoms=100):

        n = 2
        m = self.m
        dt = self.T / num_randoms
        sigsqT = (self.sigma_1**2+2*self.sigma_1*self.sigma_2*self.rho+self.sigma_2**2)/(n**2)
        muT = (self.r - 0.5*((self.sigma_1**2+self.sigma_2**2)/n) + 0.5*sigsqT)*self.T

        Bg = [0] * m
        Ba = [0] * m
        Bg0 = np.sqrt(self.s0_1 * self.s0_2)

        d1 = (np.log(Bg0/self.K) + (muT + 0.5*sigsqT*self.T))/(np.sqrt(sigsqT)*np.sqrt(self.T))
        d2 = d1 - np.sqrt(sigsqT)*np.sqrt(self.T)

        N1 = norm.cdf(d1)
        N2 = norm.cdf(d2)

        N1_ = norm.cdf(-d1)
        N2_ = norm.cdf(-d2)

        drift_1 = np.exp((self.r - 0.5 * self.sigma_1 ** 2) * self.T)
        drift_2 = np.exp((self.r - 0.5 * self.sigma_2 ** 2) * self.T)

        arithPayoff = [0] * m
        geoPayoff_call = [0] * m
        geoPayoff_put = [0] * m

        for i in range(m):

            s = i + 2*i
            np.random.seed(s)
            Z_1 = np.random.normal(0, 1, 1)
            Z_2 = self.rho*Z_1+np.sqrt(1-self.rho**2)*np.random.normal(0, 1, 1)
            S_1 = self.s0_1*drift_1 * np.exp(self.sigma_1 * np.sqrt(self.T) * Z_1)
            S_2 = self.s0_2*drift_2 * np.exp(self.sigma_2 * np.sqrt(self.T) * Z_2)
            
            Ba[i] = (1/n)*(S_1 + S_2)
            geoMean = np.exp((1/n) * (np.log(S_1) + np.log(S_2)))
            geoPayoff_call[i] = np.exp(-self.r*self.T)*max(geoMean-self.K, 0)
            geoPayoff_put[i] = np.exp(-self.r*self.T)*max(self.K-geoMean, 0)

            if i % 50 == 0:
                 
            if self.option_type == "call":
                
                arithPayoff[i] = Ba[i] - self.K
                if arithPayoff[i] > 0:
                    arithPayoff[i] = np.exp(-self.r*self.T)*arithPayoff[i]
                else:
                    arithPayoff[i] = 0

            elif self.option_type == "put":

                arithPayoff[i] = self.K - Ba[i]
                if arithPayoff[i] > 0:
                    arithPayoff[i] = np.exp(-self.r*self.T)*arithPayoff[i]
                else:
                    arithPayoff[i] = 0
                
        Pmean = float(np.mean(arithPayoff))
        Pstd = np.std(arithPayoff)
        confmc = (Pmean-1.96*Pstd/np.sqrt(m), Pmean+1.96*Pstd/np.sqrt(m))

        if not self.ctrl_var:
            return Pmean, confmc
        else:
            conXY_call = np.mean(np.multiply(arithPayoff, geoPayoff_call)) - (np.mean(arithPayoff) * np.mean(geoPayoff_call))
            theta_call = conXY_call / np.var(geoPayoff_call)
            conXY_put = np.mean(np.multiply(arithPayoff, geoPayoff_put)) - (np.mean(arithPayoff) * np.mean(geoPayoff_put))
            theta_put = conXY_put / np.var(geoPayoff_put)

            if self.option_type == 'call':
                geo_call = np.exp(-self.r * self.T) * (Bg0 * np.exp(muT) * N1 - self.K * N2)
                Z = arithPayoff + theta_call * (geo_call - geoPayoff_call)

            elif self.option_type == 'put':
                geo_put = np.exp(-self.r * self.T) * (self.K * N2_ - Bg0 * np.exp(muT) * N1_)
                Z = arithPayoff + theta_put * (geo_put - geoPayoff_put)

            Zmean = np.mean(Z)
            Zstd = np.std(Z)
            confmc = (Zmean-1.96 * Zstd / np.sqrt(m), Zmean+1.96*Zstd/np.sqrt(m))
            return Zmean, confmc