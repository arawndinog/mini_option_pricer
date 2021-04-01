from numpy import testing
import black_scholes
import asian_option

print("Testing implied volatility...")
testing.assert_approx_equal(black_scholes.newtons_method(0.48413599739115154, 2, 2, 3, 0.03, 0, "call"), 0.299999991906, 4)
print("Testing Asian options...")
asian_option_model = asian_option.AsianOptionCal(sigma=0.3,N=50,S=100,K=100,T=3,r=0.05,M=100000,option="Call")
testing.assert_approx_equal(asian_option_model.geometricClosedForm(), 13.256, 4)
testing.assert_approx_equal(asian_option_model.geometricStandardMC(), 13.286, 4)
testing.assert_approx_equal(asian_option_model.arithmetricStandardMC(), 14.767, 4)
testing.assert_approx_equal(asian_option_model.arithmetricStandardMCWithCV(), 14.738, 4)

print("Testing completed.")