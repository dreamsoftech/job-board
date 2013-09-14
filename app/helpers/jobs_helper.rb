# -*- encoding : utf-8 -*-
module JobsHelper
	require 'uri'

	def show_tags(job)
		tags_html = ""
		unless job.tags.nil?
			tags = job.tags.split(',')
			
			tags.each do |t|
				tags_html += "<li><a href='#'>#{t}</a></li>"
			end

		end
		return tags_html.html_safe
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
end