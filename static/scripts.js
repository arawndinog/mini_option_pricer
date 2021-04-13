$(document).ready(function(){
    var spotprice;
    var volatility;
    var spotprice2;
    var volatility2;
    var interestrate;
    var reporate;
    var maturity;
    var strikeprice;
    var optionpremium;
    var observations;
    var montecarlopath;
    var correlation;
    $('.output-panel').click(function() {
        spotprice = $("#spotprice").val();
        volatility = $("#volatility").val();
        spotprice2 = $("#spotprice2").val();
        volatility2 = $("#volatility2").val();
        interestrate = $("#interestrate").val();
        reporate = $("#reporate").val();
        maturity = $("#maturity").val();
        strikeprice = $("#strikeprice").val();
        optionpremium = $("#optionpremium").val();
        observations = $("#observations").val();
        montecarlopath = $("#montecarlopath").val();
        correlation = $("#correlation").val();
    });
    // European options
    $('#european_call, #european_put').hover(
        function() {
            $("#spotprice-label, #volatility-label, #interestrate-label, #reporate-label, #maturity-label, #strikeprice-label").addClass("highlight");
        }, function() {
            $(".label").removeClass("highlight");
        }
    );
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
                $("#european_call .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
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
                $("#european_put .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    // Implied volatility
    $('#impliedvol_call, #impliedvol_put').hover(
        function() {
            $("#spotprice-label, #volatility-label, #interestrate-label, #reporate-label, #maturity-label, #strikeprice-label, #optionpremium-label").addClass("highlight");
        }, function() {
            $(".label").removeClass("highlight");
        }
    );
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
                $("#impliedvol_call .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
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
                $("#impliedvol_put .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    // American options
    $('#american_call, #american_put').hover(
        function() {
            $("#spotprice-label, #volatility-label, #interestrate-label, #maturity-label, #strikeprice-label, #observations-label").addClass("highlight");
        }, function() {
            $(".label").removeClass("highlight");
        }
    );
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
                $("#american_call .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
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
                $("#american_put .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    // Asian options
    $('#geo_asian_closed_form_call, #geo_asian_closed_form_put, #geo_asian_mc_call, #geo_asian_mc_put, #arithm_asian_mc_call, #arithm_asian_mc_put, #arithm_asian_cv_call, #arithm_asian_cv_put').hover(
        function() {
            $("#spotprice-label, #volatility-label, #interestrate-label, #maturity-label, #strikeprice-label, #observations-label, #montecarlopath-label").addClass("highlight");
        }, function() {
            $(".label").removeClass("highlight");
        }
    );
    $('#geo_asian_closed_form_call').click(function() {
        $("#geo_asian_closed_form_call .result").html('<p><span>Loading</span></p>');
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
                $("#geo_asian_closed_form_call .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_asian_closed_form_put').click(function() {
        $("#geo_asian_closed_form_put .result").html('<p><span>Loading</span></p>');
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
                $("#geo_asian_closed_form_put .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_asian_mc_call').click(function() {
        $("#geo_asian_mc_call .result").html('<p><span>Loading</span></p>');
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
                $("#geo_asian_mc_call .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_asian_mc_put').click(function() {
        $("#geo_asian_mc_put .result").html('<p><span>Loading</span></p>');
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
                $("#geo_asian_mc_put .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    $('#arithm_asian_mc_call').click(function() {
        $("#arithm_asian_mc_call .result").html('<p><span>Loading</span></p>');
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
                $("#arithm_asian_mc_call .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    $('#arithm_asian_mc_put').click(function() {
        $("#arithm_asian_mc_put .result").html('<p><span>Loading</span></p>');
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
                $("#arithm_asian_mc_put .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    $('#arithm_asian_cv_call').click(function() {
        $("#arithm_asian_cv_call .result").html('<p><span>Loading</span></p>');
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
                $("#arithm_asian_cv_call .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    $('#arithm_asian_cv_put').click(function() {
        $("#arithm_asian_cv_put .result").html('<p><span>Loading</span></p>');
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
                $("#arithm_asian_cv_put .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    // Basket options
    $('#geo_basket_call, #geo_basket_put, #arithm_basket_mc_call, #arithm_basket_mc_put, #arithm_basket_cv_call, #arithm_basket_cv_put').hover(
        function() {
            $("#spotprice-label, #volatility-label, #interestrate-label, #maturity-label, #strikeprice-label, #montecarlopath-label, #correlation-label").addClass("highlight");
        }, function() {
            $(".label").removeClass("highlight");
        }
    );
    $('#geo_basket_call').click(function() {
        $("#geo_basket_call .result").html('<p><span>Loading</span></p>');
        $.ajax({
            url: "/calculate_basket_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                spotprice2: spotprice2,
                volatility: volatility,
                volatility2: volatility2,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                // observations: observations,
                montecarlopath: montecarlopath,
                correlation: correlation,
                baskettype: "geo_mc",
                optiontype: "call"
            },
            success: function(response) {
                $("#geo_basket_call .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    $('#geo_basket_put').click(function() {
        $("#geo_basket_put .result").html('<p><span>Loading</span></p>');
        $.ajax({
            url: "/calculate_basket_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                spotprice2: spotprice2,
                volatility: volatility,
                volatility2: volatility2,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                // observations: observations,
                montecarlopath: montecarlopath,
                correlation: correlation,
                baskettype: "geo_mc",
                optiontype: "put"
            },
            success: function(response) {
                $("#geo_basket_put .result").html('<p><span>Result</span> '+response.result.toString()+'</p>');
            },
        });
    });
    $('#arithm_basket_mc_call').click(function() {
        $("#arithm_basket_mc_call .result").html('<p><span>Loading</span></p>');
        $.ajax({
            url: "/calculate_basket_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                spotprice2: spotprice2,
                volatility: volatility,
                volatility2: volatility2,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                // observations: observations,
                montecarlopath: montecarlopath,
                correlation: correlation,
                baskettype: "arithm_mc",
                optiontype: "call"
            },
            success: function(response) {
                $("#arithm_basket_mc_call .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    $('#arithm_basket_mc_put').click(function() {
        $("#arithm_basket_mc_put .result").html('<p><span>Loading</span></p>');
        $.ajax({
            url: "/calculate_basket_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                spotprice2: spotprice2,
                volatility: volatility,
                volatility2: volatility2,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                // observations: observations,
                montecarlopath: montecarlopath,
                correlation: correlation,
                baskettype: "arithm_mc",
                optiontype: "put"
            },
            success: function(response) {
                $("#arithm_basket_mc_put .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    $('#arithm_basket_cv_call').click(function() {
        $("#arithm_basket_cv_call .result").html('<p><span>Loading</span></p>');
        $.ajax({
            url: "/calculate_basket_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                spotprice2: spotprice2,
                volatility: volatility,
                volatility2: volatility2,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                // observations: observations,
                montecarlopath: montecarlopath,
                correlation: correlation,
                baskettype: "arithm_cv",
                optiontype: "call"
            },
            success: function(response) {
                $("#arithm_basket_cv_call .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
    $('#arithm_basket_cv_put').click(function() {
        $("#arithm_basket_cv_put .result").html('<p><span>Loading</span></p>');
        $.ajax({
            url: "/calculate_basket_option_value",
            type: "get",
            data: {
                spotprice: spotprice,
                spotprice2: spotprice2,
                volatility: volatility,
                volatility2: volatility2,
                interestrate: interestrate,
                maturity: maturity,
                strikeprice: strikeprice,
                // observations: observations,
                montecarlopath: montecarlopath,
                correlation: correlation,
                baskettype: "arithm_cv",
                optiontype: "put"
            },
            success: function(response) {
                $("#arithm_basket_cv_put .result").html('<span>Result</span> '+response.result.toString()+'<br/><span>95% conf. interval</span> '+response.confmc.toString());
            },
        });
    });
});