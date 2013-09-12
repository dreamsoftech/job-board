# -*- encoding : utf-8 -*-
module JobsHelper
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
end
