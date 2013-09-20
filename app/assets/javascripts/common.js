$(function(){
	$('input.customCheck').prettyCheckable();
	
	$('.selectpicker').selectpicker({
      'selectedText': 'cat'
  });

	$("#tech_skills").attr('multiple', '');
	$("#tech_skills").addClass('chzn-select');
	$("#tech_skills").css({"width": "500px"});
	$("#job_job_type").addClass('selectpicker');
	$("#job_job_type").css({"width": "500px"});
  $(".chzn-select").chosen({no_results_text: "Oops, nothing found!", max_selected_options: 5, placeholder:"c#, java, c++,..."}); 

	$('#input-description-div').css({'height':'200px'}).ace_wysiwyg({
		toolbar_place: function(toolbar) {
			return $(this).closest('.widget-box').find('.widget-header').prepend(toolbar);
		},
		toolbar:
		[
			'bold',
			{name:'italic'},
			'strikethrough',
			'underline',
			null,
			'insertunorderedlist',
			'insertorderedlist',
			null,
			'justifyleft',
			'justifycenter',
			'justifyright'
		],
		speech_button:false
	});

	$('.job-form').validate({
		errorElement: 'span',
		errorClass: 'help-inline',
		focusInvalid: true,
		rules: {
			'job[title]': {
				required: true,
			},
			"job[location]": {
				required: true,
			},
			"job[url]": {
				required: true,
				url: true
			},
			"job[company_name]": {
				required: true
			},
			"job[description]": {
				required: true
			},
			"job[apply_information]": {
				required: true
			}
		},

		highlight: function (e) {
			$(e).focus();
		}
	});

/**
Wizard
*/


$('[data-rel=tooltip]').tooltip();

	$('#fuelux-wizard').ace_wizard().on('change' , function(e, info){
	
		if (info.direction =="next")
		{
			if (info.step == 1)
			{
				if(!$('#new_job').valid()) return false;

				$("#step-title").html("Step 2: Preview your Ad");
				$("a.btn-next").html("Continue to Step 3 to publish your ad");
				$("a.btn-prev").removeClass("hide");

				$('#title')				.html($('#job_title').val());
				$('#company_name').html($('#job_company_name').val());
				$('#location')		.html($('#job_location').val());
				$('#url')					.html($('#job_url').val());
				$('#url')					.attr("href", $('#job_url').val());
				$('#description')	.html($('#input-description-div').html());
				$('#apply_information')	.html($('#job_apply_information').val());
				$('#job_description').val($('#input-description-div').html());
				
				// add tags in preview page
				var tags = new Array();
				var tag_captions = "";
				$("li.search-choice").each(function( index ) 
				{
					tags.push($(this).text());
				});

				for (var i = 0; i < tags.length; i++)
				{
					var tag_captions = tag_captions + "<li>"+tags[i]+"</li>";
				}
				$('#job_tags').val(tags.join(','));
				$('#tags')	.html(tag_captions);

				var total = 250;

				if ($('#job_highlighted1').is(':checked'))
					total += 50;
				if ($('#job_highlighted2').is(':checked'))
					total += 30;

				$('#total').html(total);

				$('.wizard-actions').removeClass('hide');

				// hide job post guide section
				$(".post-job-guide").addClass("hide");
				$("#new-job-div").removeClass("left-main-div"); // stretch the main div
			}

			if (info.step == 2)
			{
				$("#step-title").html("Step 3: Publish Your Job");
				$("a.btn-next").html("Place Order and Publish your Ad");
				$("a.btn-prev").removeClass("hide");
				$('.wizard-actions').addClass('hide');
			}
		}
		else if (info.direction == "previous")
		{
			if (info.step == 3)
			{
				$("#step-title").html("Step 2: Publish Your Job");
				$("a.btn-next").html("Continue to Step 3 to publish your ad");
				$('.wizard-actions').removeClass('hide');
			}
			else if (info.step == 2)
			{
				$("#step-title").html("Step 1: Create Your Job");
				$("a.btn-next").html("Continue to Step 2 to preview your ad");
				$("a.btn-prev").addClass("hide");
				$(".wizard-actions").addClass("hide");
				// hide job post guide section
				$(".post-job-guide").removeClass("hide");
				$("#new-job-div").addClass("left-main-div"); // stretch the content div
			}
		}
	}).on('finished', function(e) {
		
	}).on('stepclick', function(e, info){
		if (info.step == 1)
		{
			$("#step-title").html("Step 1: Create Your Job");
			$("a.btn-next").html("Continue to Step 2 to preview your Ad");
			$("a.btn-prev").addClass("hide");
			$(".wizard-actions").addClass("hide");
			// hide job post guide section
			$(".post-job-guide").removeClass("hide");
			$("#new-job-div").addClass("left-main-div"); // stretch the main div
		}
		else if (info.step == 2)
		{
			$("#step-title").html("Step 2: Preview Your Ad");
			$("a.btn-next").html("Continue to Step 3 to publish your Ad");
			$("a.btn-prev").removeClass("hide");			
			$(".wizard-actions").removeClass("hide");

			// hide job post guide section
			$(".post-job-guide").addClass("hide");
			$("#new-job-div").removeClass("left-main-div"); // stretch the main div
		}
	});

	$('#job_company_logo').on('change', function(input){
	
		evt = input.target;
		if (evt.files && evt.files[0]) {
			var file = evt.files[0];
			if(typeof file === "string") {//files is just a file name here (in browsers that don't support FileReader API)
				if(! (/\.(jpe?g|png|gif)$/i).test(file) ) 
				{
					$("#file-load-result").html("Wrong file format!");
      		$("#file-load-result").css("color", "red");
					$("#file-load-result").fadeIn("fast");
					return false;
				}
			}
			else {//file is a File object
				var type = $.trim(file.type);
				if( ( type.length > 0 && ! (/^image\/(jpe?g|png|gif)$/i).test(type) )
						|| ( type.length == 0 && ! (/\.(jpe?g|png|gif)$/i).test(file.name) )//for android default browser!
					) 
				{
					$("#file-load-result").html("Wrong file format!");
      		$("#file-load-result").css("color", "red");
					$("#file-load-result").fadeIn("fast");
					return false;
				}

				// if( file.size > 110000 ) {//~100Kb
				// 	$("#file-load-error").show("slow");
				// 	return false;
				// }

	      var reader = new FileReader();

	      reader.onload = function (e) {
	          $('#img-logo')
	              .attr('src', e.target.result)
	              .width(150);
	      };
	      $("#logo").val(file.name);
	      console.log(file.name);

	      $("#file-load-result").html("Success");
	      $("#file-load-result").css("color", "green");
				$("#file-load-result").fadeIn("fast");
	      reader.readAsDataURL(evt.files[0]);
      	return true;
			}
  	}
	});

});