$(function(){
  function to_slug(Text)
  {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
  }
  var searching = false; // If app is retrieving the job data by ajax, it is true

  $('#order_by').on("change", function(){
    $('#search-form').submit();
  });

  $('.tech_tag').on("click", function(){
    $("#keyword"). val($(this).html());
    $('#search-form').submit();
  });

  $("#search-form input[type='checkbox']").on("click", function(){
    if (searching == true )
      return false;
    
    searching = true;

    $('#search-form').submit();
  })


  $("#search-form").on("ajax:success", function(e, data, status, xhr)
  {
    console.log(xhr.responseJSON);
    var job_list = xhr.responseJSON;

    $("#job-list").html("");
    for (var i = 0; i < job_list.length; i++)
    {
      job = job_list[i].job;
      template = $("#job-row-template").clone();
      template.attr("id", "job-" + job.id);

      if (job.highlighted1 == true || job.highlighted2 == true)
        template.addClass("highlighted");

      template.css("display", "block");
      
      // if job is posted 5 days ago, remove new tag.
      if (job.elapsed_date > 5)
        template.find("a#new-tag").css("display", "none");

      template.find("#title").html(job.title);
      template.find("#title").attr("href", "/jobs/" + to_slug(job.id + "-" + job.title + "-" + job.company_name));
      template.find("#elapsed").html(job.elapsed + " ago");
      template.find("#company_name").html(job.company_name);
      template.find("#location").html(job.location);
      template.find("#description").html(job.description);
      // Remove html tags
      template.find("#description").text(template.find("#description").text());

      var tags_element = template.find("#tags");
      var tags = job.tags.split(',');
      tags_element.html("");
      for (var j = 0; j < tags.length; j++)
      {
        tags_element.append("<li><a class='tech_tag' href='#'>" + tags[j] + "</a></li>");
      }

      $("#job-list").append(template);
      $("#job-list").append($("<hr>"));
    }

    searching = false;

  }).bind("ajax:error", function(e, xhr, status, error){
    var result = xhr.responseJSON;
    searching = false;
  });

  $("#keyword").on("keyup", function(){
    $('#search-form').submit();
  });
});