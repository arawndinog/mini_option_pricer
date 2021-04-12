import numpy as np
from scipy.stats import norm
import math
from multiprocessing import Process, Manager

class AsianOptionCal:
    def __init__(self,sigma,N,S,K,T,r,M,option):
        self.sigma = sigma
        self.N = N
        self.S = S
        self.K = K
        self.T = T
        self.r = r
        self.M = M
        self.option = option
        self.sigmahat = sigma * math.sqrt((N+1)*(2*N+1)/(6*N*N))
        self.muhat = (r-0.5*sigma*sigma) * (N+1)/(2*N) + 0.5 * self.sigmahat * self.sigmahat
        self.d1hat = (math.log(S/K) + (self.muhat + 0.5*self.sigmahat*self.sigmahat)*T ) / (self.sigmahat *math.sqrt(T))
        self.d2hat = self.d1hat - self.sigmahat * math.sqrt(T)
        self.discount = np.exp(-r*T)
        
    def arithmeticMath(self,s):
        return np.mean(s)

    def geometricMath(self,s):
        return np.exp(np.mean(np.log(s)))
    
    def geometricClosedForm(self):
        if self.option == "call":
            callV = np.exp(-self.r*self.T) * (self.S*np.exp(self.muhat*self.T)*norm.cdf(self.d1hat) - self.K*norm.cdf(self.d2hat))
            return callV
        if self.option == "put":
            putV = np.exp(-self.r*self.T) * (self.K*norm.cdf(-self.d2hat) - self.S*np.exp(self.muhat*self.T)*norm.cdf(-self.d1hat))
            return putV
    
    def randomPriceSample(self):
        Z = np.random.standard_normal(1)
        growFactor = np.exp((self.r-0.5*self.sigma*self.sigma)*self.T/self.N) * np.exp(self.sigma * math.sqrt(self.T/self.N) * Z)
        spathArray=[self.S*growFactor]
        for i in range(1,self.N): # checkbug
            Z = np.random.standard_normal(1)
            growFactor = np.exp((self.r-0.5*self.sigma*self.sigma)*self.T/self.N) * np.exp(self.sigma * math.sqrt(self.T/self.N) * Z)
            newPrice = spathArray[i-1] * growFactor
            spathArray.append(newPrice)     
        return spathArray
    
    def arithmeticPayoff(self):
        np.random.seed(3)
        arithPayoffArray = []
        for i in range(self.M):
            spathArray = self.randomPriceSample()
            spathMean = self.arithmeticMath(spathArray)
            if self.option == "call":
                arithPayoffArray.append(max(spathMean - self.K, 0))
            if self.option == "put":
                arithPayoffArray.append(max(self.K - spathMean, 0))
            
        return arithPayoffArray

    def arithmeticPayoff_process(self, i, arithPayoffArray_main, sub_M):
        arithPayoffArray = []
        np.random.seed(i)
        for i in range(sub_M):
            spathArray = self.randomPriceSample()
            spathMean = self.arithmeticMath(spathArray)
            if self.option == "call":
                arithPayoffArray.append(max(spathMean - self.K, 0))
            if self.option == "put":
                arithPayoffArray.append(max(self.K - spathMean, 0))

        arithPayoffArray_main += arithPayoffArray

    def arithmeticPayoff_mp(self):
        manager = Manager()
        arithPayoffArray_main = manager.list()
        n_process = 4
        process_list = []
        for i in range(n_process-1):
            process = Process(target=self.arithmeticPayoff_process, args=(i, arithPayoffArray_main, self.M//n_process))
            process.start()
            process_list.append(process)
        process = Process(target=self.arithmeticPayoff_process, args=(n_process, arithPayoffArray_main, self.M-(n_process-1)*self.M//n_process))
        process.start()
        process_list.append(process)
        for p in process_list:
            p.join()
            
        arithPayoffArray = list(arithPayoffArray_main)
        return arithPayoffArray

    def geometricPayoff(self):
        np.random.seed(3)
        geoPayoffArray = []
        for i in range(self.M):
            spathArray = self.randomPriceSample()
            spathMean = self.geometricMath(spathArray)
            if self.option == "call":
                geoPayoffArray.append(max(spathMean - self.K, 0))
            if self.option == "put":
                geoPayoffArray.append(max(self.K - spathMean, 0))
        return geoPayoffArray
    
    def arithmeticStandardMC(self):
        arithPayoffArray = self.arithmeticPayoff()
        vArith = self.discount * self.arithmeticMath(arithPayoffArray)
        Pmean = vArith
        discounted_payoff = np.array(arithPayoffArray)*self.discount
        Pstd = np.std(discounted_payoff)
        confmc = [Pmean - 1.96*Pstd/self.M**0.5, Pmean + 1.96*Pstd/self.M**0.5]
        return vArith, confmc
    
    def geometricStandardMC(self):
        geoPayoffArray = self.geometricPayoff()
        vGeo = self.discount * self.arithmeticMath(geoPayoffArray)
        return vGeo
    
    def arithmeticStandardMCWithCV(self):
        arithPayoffArray = self.arithmeticPayoff()
        geoPayoffArray = self.geometricPayoff()
        vArith = self.discount * self.arithmeticMath(arithPayoffArray)
        VCgeo = self.geometricClosedForm()
        VGeo = self.geometricStandardMC()
        covXY = np.cov(arithPayoffArray,geoPayoffArray)[0][1]
        theta = covXY/np.var(geoPayoffArray)
        Z = np.array(arithPayoffArray) + theta * (VGeo - np.array(geoPayoffArray))
        Zmean = np.mean(Z)
        Zstd = np.std(Z)
        return vArith + theta * (VCgeo - VGeo), [Zmean - 1.96 * Zstd/self.M**0.5, Zmean + 1.96*Zstd/self.M**0.5]
