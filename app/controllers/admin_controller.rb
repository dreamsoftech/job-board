class AdminController < ApplicationController
	before_filter :authenticate_user!

	def index
		@jobs = Job.all
	end
	
	def dashboard
		@jobs = Job.all
	end

	private

	def admin_user
		authorize! :index, @user, :message => 'Not authorized as an administrator.'
	end
end