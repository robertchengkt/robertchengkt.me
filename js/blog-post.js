(function($){

	"use strict";

	$(document).ready(function() {

		//	FastClick	

	    FastClick.attach(document.body);

		//	Smooth scroll

		try {
	        $.browserSelector();
	          if($("html").hasClass("chrome" || "opera")) {
	            $.smoothScroll();
	          }
	    } catch(err) {}

	    //	Text rotator

	    $(".occupation").Morphext({
		    animation: "fadeIn",
		    separator: ",",
		    speed: 2500
		});

		// Preloader

      	$(window).load(function() {
      		$(".preloader").fadeOut("slow", function(){
      			$(".preloader-left").addClass("slide-left");
      			$(".preloader-right").addClass("slide-right");
      			$("#blog-post").addClass("full-blog");
      		});
		});

		//	Like function

		$(".like").on("click", function() {
			$(this).toggleClass("like-it");
		});

		// Ajax comment function

		$(":input[placeholder]").each(function () {
		    var input = $(this);
		    input.addClass("placeholder");
		    input.val(input.attr("placeholder"));
		 
		    $(this).focus(function() {
		      	var input = $(this);
		      	if (input.val() == input.attr("placeholder")) {
		        	input.val("");
		        	input.removeClass("placeholder");
		      	}
		    });

		    $(this).blur(function() {
		      	var input = $(this);
		      	if (input.val() == "" || input.val() == input.attr("placeholder")) {
			        input.addClass("placeholder");
			        input.val(input.attr("placeholder"));
		      	}
		    })
		});

		// placeholder snippet for older browsers [end]
		  
		// custom validation methods [start]
		
		$.validator.addMethod(
		    "notplaceholder", 
		    function(value, element){
		        return ($(element).attr("placeholder") != value);
			}, 
			"Please enter a value"
		);

		// custom validation methods [end]
		  
		// jquery validate initialisation

		$("#comment-form").validate({
		    rules: {
			    name : {
			        required    : true,
			        notplaceholder  : true
		      	},
		      	comment : {
			        required   : true,
			        notplaceholder  : true
		      	}
		    },
		    errorPlacement: function(error, element) {
		      	$(element).addClass("error");
		    },
		    submitHandler: function(form){
		    	console.log("Done!");
		    	// Put your ajax comment here
		    }
		});

		//	Mailchimp Newsletter function

        var $form = $("#subscribe");
    
        $(".subcribe-submit").on("click", function(event) {
            if(event)
              event.preventDefault();
              subscribe($form);
        });
    
        function subscribe($form) {
            $.ajax({
                type: $form.attr("method"),
                url: $form.attr("action"),
                data: $form.serialize(),
                cache: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                error: function(err) {
                    $(".subscribe-notification").html("Could not connect to server. Please try again later.").addClass("success");
                
                },
                success: function(data) {
                    
                    if (data.result != "success") {
                        var message = data.msg.substring(4);
                        $(".subscribe-notification").html(message).addClass("success");
                    
                    } else {
                        $(".subscribe-notification").html("We've sent you a confirmation email!").addClass("success");
                    
                    }
                }
            });
        }


	});

})(jQuery);