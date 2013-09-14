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

	$('#new_job').validate({
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

				$("#step-title").html("Step2: Preview your Ad");
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
				
				var tags = new Array();
				var tag_captions = "";
				$("li.search-choice").each(function( index ) 
				{
					tags.push($(this).text());
				});

				for (var i = 0; i < tags.length; i++)
				{
					var tag_captions = tag_captions + "<li><a>"+tags[i]+"</a></li>";
				}
				$('#job_tags').val(tags.join(','));
				$('#tags')	.html(tag_captions);
				$('.wizard-actions').removeClass('hide');
			}

			if (info.step == 2)
			{
				$("#step-title").html("Step3: Publish your Ad");
				$("a.btn-next").html("Place Order and Publish your Ad");
				$("a.btn-prev").removeClass("hide");
				$('.wizard-actions').addClass('hide');
			}
		}
		else if (info.direction == "previous")
		{
			if (info.step == 3)
			{
				$("#step-title").html("Step2: Publish your Ad");
				$("a.btn-next").html("Continue to Step 3 to publish your ad");
				$('.wizard-actions').removeClass('hide');
			}
			else if (info.step == 2)
			{
				$("#step-title").html("Step1: Create your Job");
				$("a.btn-next").html("Continue to Step 2 to preview your ad");
				$("a.btn-prev").addClass("hide");
				$(".wizard-actions").addClass("hide");
			}
		}
	}).on('finished', function(e) {
		
	}).on('stepclick', function(e, info){
		console.log(info);
		if (info.step == 1)
		{
			$("#step-title").html("Step1: Create your Job");
			$("a.btn-next").html("Continue to Step 2 to preview your Ad");
			$("a.btn-prev").addClass("hide");
			$(".wizard-actions").addClass("hide");
		}
		else if (info.step == 2)
		{
			$("#step-title").html("Step2: Preview your Ad");
			$("a.btn-next").html("Continue to Step 3 to publish your Ad");
			$("a.btn-prev").removeClass("hide");			
			$(".wizard-actions").removeClass("hide");
		}
	});
	$('#job_company_logo').on('change', function(input){
		$("#logo").val($(this).val());
		
		evt = input.target;
		if (evt.files && evt.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#img-logo')
              .attr('src', e.target.result)
              .width(150);
      };

      reader.readAsDataURL(evt.files[0]);
  	}
	});

});