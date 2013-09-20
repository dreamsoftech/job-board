# -*- encoding : utf-8 -*-
module JobsHelper
	require 'uri'

	def show_tags(job)
		tags_html = ""
		unless job.tags.nil?
			tags = job.tags.split(',')
			
			tags.each do |t|
				tags_html += "<li><a href='#' class='tech_tag'>#{t}</a></li>"
			end

		end
		return tags_html.html_safe
	end
# p[images][]=https://s3.amazonaws.com/apptopia.com/uploads/app/icon/37129/iD0ars9VZxyYmgb5k3nBCU0ZYNFApC4YC5FneKX8VX983e8nNAehH3ks3fBJ_csVLKs.png
	def link_to_facebook(job)
		# <a href="http://www.facebook.com/sharer.php?&amp;p[summary]=Want to acquire an app? (i.e. ownership, users, IP, etc) you should check out Outlook Web Mobile (OWA Email) via @apptopia!&amp;p[title]=Outlook Web Mobile (OWA Email) is on sale&amp;p[url]=http://www.apptopia.com/listings/outlook-web-mobile-owa-email&amp;s=100" class="fb" target="_blank">Share on Facebook</a>
		address_facebook = "https://www.facebook.com/sharer/sharer.php?"
		
		summary = "&p%5Bsummary%5D=#{job.description}"
		url = "&p%5Burl%5D=#{request.original_url}"
		title = job.title + " - " + job.company_name
		title = "p%5Btitle%5D=#{title}"
		param_str = title + summary + url
		# param_str = param_str.gsub("[", "").gsub("]", "%5D").gsub("\ ", "+")
		facebook = content_tag :a, "<img src='/assets/social/facebook.png'>Share this job on facebook".html_safe, 
			:href => address_facebook + param_str, :target => '_blank'
	end
	def link_to_linkedin(job)
		address_linkedin = "http://www.linkedin.com/shareArticle?"
		summary = "&summary=#{u job.description}"
		url = "&url=#{u request.original_url}"
		source = "&source=Apptopia"
		title= job.title + " - " + job.company_name
		title = "&title=#{title}"
		mini = "mini=true"
		param_str = mini + source + title + summary + url
		
		linked_in = content_tag :a, "<img src='/assets/social/linkedin.png'>Share this job on linkedin".html_safe, 
			:href => address_linkedin + param_str, :target => '_blank'
	end

	def link_to_twitter(job)
		address_twitter = "https://twitter.com/share?"
		text = "&text=#{job.company_name} is hiring a #{job.title} at #{request.original_url}"
		url = "url=#{request.original_url}"
		related = "&related=Apptopia"
		mini = "&mini=true"
		param_str = url + text + related + mini
		linked_in = content_tag :a, "<img src='/assets/social/twitter.png'>Tweet this".html_safe, 
			:href => address_twitter + param_str, :target => '_blank'
	end

	def mail_to(job)
		subject = "subject=#{job.company_name} is hiring a #{job.title}"
		body = "&body=#{job.company_name} is hiring a #{job.title} at #{request.original_url}"
		mail_addr = content_tag :a, "<img src='/assets/social/message.png'>Tell a friend".html_safe, 
			:href => "mailto:?#{subject}&#{body}", :target => '_blank'
	end

	def job_checked(job_type)
		return true if job_type == "1"
		return false
	end

	def job_index_page
		return true if controller.controller_name == "jobs" and params[:action] == "index"
	end
end