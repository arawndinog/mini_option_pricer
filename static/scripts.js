$(document).ready(function(){
    var spotprice;
    var volatility;
    var interestrate;
    var reporate;
    var maturity;
    var strikeprice;
    var optionpremium;
    var observations;
    var montecarlopath;
    $('.output-panel').click(function() {
        spotprice = $("#spotprice").val();
        volatility = $("#volatility").val();
        interestrate = $("#interestrate").val();
        reporate = $("#reporate").val();
        maturity = $("#maturity").val();
        strikeprice = $("#strikeprice").val();
        optionpremium = $("#optionpremium").val();
        observations = $("#observations").val();
        montecarlopath = $("#montecarlopath").val();
    });
    // European options
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
    // Implied volatility
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
    // American options
    $('#american_call').click(function() {
        $.ajax({
            url: "/calculate_american_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                optiontype: "call"
            },
            success: function(response) {
                $("#american_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#american_put').click(function() {
        $.ajax({
            url: "/calculate_american_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                optiontype: "put"
            },
            success: function(response) {
                $("#american_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    // Asian options
    $('#geo_asian_closed_form_call').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "geo_bs",
                optiontype: "call"
            },
            success: function(response) {
                $("#geo_asian_closed_form_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_asian_closed_form_put').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "geo_bs",
                optiontype: "put"
            },
            success: function(response) {
                $("#geo_asian_closed_form_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_asian_mc_call').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "geo_mc",
                optiontype: "call"
            },
            success: function(response) {
                $("#geo_asian_mc_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_asian_mc_put').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "geo_mc",
                optiontype: "put"
            },
            success: function(response) {
                $("#geo_asian_mc_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#arithm_asian_mc_call').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "arithm_mc",
                optiontype: "call"
            },
            success: function(response) {
                $("#arithm_asian_mc_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#arithm_asian_mc_put').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "arithm_mc",
                optiontype: "put"
            },
            success: function(response) {
                $("#arithm_asian_mc_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#arithm_asian_cv_call').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "arithm_cv",
                optiontype: "call"
            },
            success: function(response) {
                $("#arithm_asian_cv_call .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
    $('#arithm_asian_cv_put').click(function() {
        $.ajax({
            url: "/calculate_asian_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                volatility: volatility,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                observations: observations,
                montecarlopath: montecarlopath,
                asiantype: "arithm_cv",
                optiontype: "put"
            },
            success: function(response) {
                $("#arithm_asian_cv_put .result").html('<p>Result: '+response.result.toString()+'</p>');
            },
        });
    });
});