jQuery(function(e){var t=e("meta[name=csrf-token]").attr("content"),n=e("meta[name=csrf-param]").attr("content");e.fn.extend({triggerAndReturn:function(t,n){var r=new e.Event(t);return this.trigger(r,n),r.result!==!1},callRemote:function(){var t=this,n=t.attr("method")||t.attr("data-method")||"GET",r=t.attr("action")||t.attr("href"),i=t.attr("data-type")||"script";if(r===undefined)throw"No URL specified for remote call (action or href must be present).";if(t.triggerAndReturn("ajax:before")){var s=t.is("form")?t.serializeArray():[];e.ajax({url:r,data:s,dataType:i,type:n.toUpperCase(),beforeSend:function(e){t.trigger("ajax:loading",e)},success:function(e,n,r){t.trigger("ajax:success",[e,n,r])},complete:function(e){t.trigger("ajax:complete",e)},error:function(e,n,r){t.trigger("ajax:failure",[e,n,r])}})}t.trigger("ajax:after")}}),e("a[data-confirm],input[data-confirm]").live("click",function(){var t=e(this);if(t.triggerAndReturn("confirm")&&!confirm(t.attr("data-confirm")))return!1}),e("form[data-remote]").live("submit",function(t){e(this).callRemote(),t.preventDefault()}),e("a[data-remote],input[data-remote]").live("click",function(t){e(this).callRemote(),t.preventDefault()}),e("a[data-method]:not([data-remote])").live("click",function(r){var i=e(this),s=i.attr("href"),o=i.attr("data-method"),u=e('<form method="post" action="'+s+'"></form>'),a='<input name="_method" value="'+o+'" type="hidden" />';n!=null&&t!=null&&(a+='<input name="'+n+'" value="'+t+'" type="hidden" />'),u.hide().append(a).appendTo("body"),r.preventDefault(),u.submit()});var r="input[data-disable-with]",i="form[data-remote]:has("+r+")";e(i).live("ajax:before",function(){e(this).find(r).each(function(){var t=e(this);t.data("enable-with",t.val()).attr("value",t.attr("data-disable-with")).attr("disabled","disabled")})}),e(i).live("ajax:complete",function(){e(this).find(r).each(function(){var t=e(this);t.removeAttr("disabled").val(t.data("enable-with"))})})}),$(document).bind("mobileinit",function(){$.mobile.ajaxLinksEnabled=!1,$.mobile.ajaxFormsEnabled=!1}),$(document).ready(function(){$("a.jobpreview").live("click.preview",function(e){var t=$(this),n={url:"/jobs/preview",data:$(this).parents("form").serialize(),type:"post"},r=t.data("back"),i=t.data("transition");console.debug(n),$.mobile.changePage(n,undefined,undefined,!0),e.preventDefault()})});