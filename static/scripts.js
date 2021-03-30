$(document).ready(function(){
    $('#european_call').click(function() {
        var spotprice = $("#spotprice").val();
        var volatility = $("#volatility").val();
        var interestrate = $("#interestrate").val();
        var reporate = $("#reporate").val();
        var maturity = $("#maturity").val();
        var strikeprice = $("#strikeprice").val();
        $.ajax({
            url: "/calculate_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                reporate: reporate,
                maturity: maturity,
                strikeprice: strikeprice,
                optiontype: "call"
            },
            success: function(response) {
                $("#european_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#european_put').click(function() {
        var spotprice = $("#spotprice").val();
        var volatility = $("#volatility").val();
        var interestrate = $("#interestrate").val();
        var reporate = $("#reporate").val();
        var maturity = $("#maturity").val();
        var strikeprice = $("#strikeprice").val();
        $.ajax({
            url: "/calculate_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                reporate: reporate,
                maturity: maturity,
                strikeprice: strikeprice,
                optiontype: "put"
            },
            success: function(response) {
                $("#european_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#impliedvol_call').click(function() {
        var spotprice = $("#spotprice").val();
        var volatility = $("#volatility").val();
        var interestrate = $("#interestrate").val();
        var reporate = $("#reporate").val();
        var maturity = $("#maturity").val();
        var strikeprice = $("#strikeprice").val();
        var optionpremium = $("#optionpremium").val();
        $.ajax({
            url: "/calculate_implied_vol",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                reporate: reporate,
                maturity: maturity,
                strikeprice: strikeprice,
                optionpremium: optionpremium,
                optiontype: "call"
            },
            success: function(response) {
                $("#impliedvol_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#impliedvol_put').click(function() {
        var spotprice = $("#spotprice").val();
        var volatility = $("#volatility").val();
        var interestrate = $("#interestrate").val();
        var reporate = $("#reporate").val();
        var maturity = $("#maturity").val();
        var strikeprice = $("#strikeprice").val();
        var optionpremium = $("#optionpremium").val();
        $.ajax({
            url: "/calculate_implied_vol",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                reporate: reporate,
                maturity: maturity,
                strikeprice: strikeprice,
                optionpremium: optionpremium,
                optiontype: "put"
            },
            success: function(response) {
                $("#impliedvol_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
});