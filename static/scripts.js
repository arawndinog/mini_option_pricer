$(document).ready(function(){
    var spotprice;
    var volatility;
    var interestrate;
    var reporate;
    var maturity;
    var strikeprice;
    var optionpremium;
    $('.output-panel').click(function() {
        spotprice = $("#spotprice").val();
        volatility = $("#volatility").val();
        interestrate = $("#interestrate").val();
        reporate = $("#reporate").val();
        maturity = $("#maturity").val();
        strikeprice = $("#strikeprice").val();
        optionpremium = $("#optionpremium").val();
    });
    
    $('#european_call').click(function() {
        $.ajax({
            url: "/calculate_european_option_value",
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
        $.ajax({
            url: "/calculate_european_option_value",
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