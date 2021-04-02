from numpy import testing
import black_scholes
import asian_option

print("Testing European options...")
testing.assert_approx_equal(black_scholes.option_value(50, 50, 0.5, 0.2, 0.01, 0, "call"), 2.9380121169138036, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 0.5, 0.2, 0.01, 0, "put"), 2.6886360765479225, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 60, 0.5, 0.2, 0.01, 0, "call"), 0.38706940285778746, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 60, 0.5, 0.2, 0.01, 0, "put"), 10.087818154418727, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 1, 0.2, 0.01, 0, "call"), 4.216659345054804, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 1, 0.2, 0.01, 0, "put"), 3.7191510325132064, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 0.5, 0.3, 0.01, 0, "call"), 4.338822781168002, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 0.5, 0.3, 0.01, 0, "put"), 4.089446740802121, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 0.5, 0.2, 0.02, 0, "call"), 3.060327056727921, 4)
testing.assert_approx_equal(black_scholes.option_value(50, 50, 0.5, 0.2, 0.02, 0, "put"), 2.5628187441863233, 4)
print("Testing implied volatility...")
testing.assert_approx_equal(black_scholes.newtons_method(0.48413599739115154, 2, 2, 3, 0.03, 0, "call"), 0.299999991906, 4)
print("Testing Asian options...")
asian_option_model = asian_option.AsianOptionCal(sigma=0.3,N=50,S=100,K=100,T=3,r=0.05,M=100000,option="call")
testing.assert_approx_equal(asian_option_model.geometricClosedForm(), 13.256, 4)
testing.assert_approx_equal(asian_option_model.geometricStandardMC(), 13.286, 4)
testing.assert_approx_equal(asian_option_model.arithmetricStandardMC(), 14.767, 4)
testing.assert_approx_equal(asian_option_model.arithmetricStandardMCWithCV(), 14.738, 4)

print("Testing completed.")