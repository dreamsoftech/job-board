$(function(){
  function to_slug(Text)
  {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
  }

  function elapsed_time(updated_at)
  {
    var prevTime = new Date(Date.parse(updated_at));
    var thisTime = new Date();              // now
    var diff = thisTime.getTime() - prevTime.getTime();
    var days = parseInt(diff / (1000*60*60*24));
    if (days > 0)
      return days + " days";

    var hours = parseInt(diff / (1000*3600));
    if (hours > 0)
      return hours + " hours";

    var mins = parseInt(diff / (1000 * 60));
    return mins + " mins"
  }

  var searching = false; // If app is retrieving the job data by ajax, it is true

  $('#order_by').on("change", function(){
    $('#search-form').submit();
  });

  $('#job-list').on("click", ".tech_tag", function(){
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
    var job_list = xhr.responseJSON;

    $("#job-list").html("");
    $("#jobs-count").html(job_list.length + " Jobs for developers");
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
      template.find("#elapsed").html(elapsed_time(job.updated_at) + " ago");
      template.find("#company_name").html(job.company_name);
      template.find("#location").html(job.location);
      template.find("#description").html(job.description);
      // Remove html tags
      template.find("#description").text(template.find("#description").text());
      
      var tags_element = template.find("#tags");
      var JOB_TYPE = ['Full-time', 'Part-time', 'App project'];

      tags_element.html("");
      tags_element.append("<li><a class='tech_tag' href='#'>" + JOB_TYPE[parseInt(job.job_type)] + "</a></li>");

      if (job.tags != null)
      {
        var tags = job.tags.split(',');
        for (var j = 0; j < tags.length; j++)
        {
          tags_element.append("<li><a class='tech_tag' href='#'>" + tags[j] + "</a></li>");
        }
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