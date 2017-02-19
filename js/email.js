'use strict';

(function($){
    var API_SERVER = "//api.serverchef.io/";

    $(document).ready(function(){

        //override email collection form submit
        $("#emailCollectionForm").on('submit',function(e){
            e.preventDefault();
            $("#submit-button").text("Processing..").prop('disabled', true);

            var data = $(this).serializeArray();

            var email = data.find(function(x) {return x.name == "email";}).value;

            $.ajax({
                type: 'POST',
                url: API_SERVER,
                data: JSON.stringify({email: email}),
                contentType: 'application/json',
                success: function (data) {
                    $("#emailFormError").html("");

                    $("#emailFormSuccess").show();

                    $("#emailCollectionForm").hide();
                },
                error: function(xhr, type){
                    var errorMessage = "Something went terribly wrong. Please try again later.";
                    if (xhr.status == 400){
                        var response = JSON.parse(xhr.response);
                        errorMessage = response.message;

                    } else {
                        errorMessage = "Couldn\'t reach server. Are you sure you are connected?";
                        $("#submit-button").text("Try Again").prop('disabled', false);
                    }

                    $("#emailFormError").html(errorMessage);
                    $("#submit-button").text("Notify Me").prop('disabled', false);
                }
            });
        });

    });

})(Zepto);
