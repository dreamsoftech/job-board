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
	
	$(".job-form").on("submit", function(){
		var tags = new Array();
		$("li.search-choice").each(function( index ) 
		{
			tags.push($(this).text());
		});
		$('#job_tags').val(tags.join(','));
		$('#job_description').val($('#input-description-div').html());
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