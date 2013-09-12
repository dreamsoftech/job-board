$(function(){
	$('input.customCheck').prettyCheckable();
	
	$('.selectpicker').selectpicker({
      'selectedText': 'cat'
  });
  
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

	$('#job_company_logo').on('change', function(evt){
		$("#logo").val($(this).val());
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
		messages: {
			email: {
				required: "Please provide a valid email.",
				email: "Please provide a valid email."
			},
			password: {
				required: "Please specify a password.",
				minlength: "Please specify a secure password."
			},
			subscription: "Please choose at least one option",
			gender: "Please choose gender",
			agree: "Please accept our policy"
		},

		invalidHandler: function (event, validator) { //display error alert on form submit   
			$('.alert-error', $('.login-form')).show();
		},

		highlight: function (e) {
			//$(e).closest('.control-group').removeClass('info').addClass('error');
		},

		success: function (e) {
			$(e).closest('.control-group').removeClass('error').addClass('info');
			$(e).remove();
		},

		errorPlacement: function (error, element) {
			
		},

		invalidHandler: function (form) {
		}
	});