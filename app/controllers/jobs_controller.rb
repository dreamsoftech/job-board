# -*- encoding : utf-8 -*-
class JobsController < ApplicationController

  # before_filter :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_filter :find_my_job, only: [:edit, :update, :destroy, :open, :close, :restart]

  def index
    job_types = Array.new [0..2]
    
    recover_session

    if !params[:full_time].nil? && params[:full_time] == "1"
      job_types.push 0 
      session[:full_time] = 1
    else
      session[:full_time] = 0
    end

    if !params[:part_time].nil? && params[:part_time] == "1"
      job_types.push 1
      session[:part_time] = 1
    else
      session[:part_time] = 0
    end


    if !params[:app_project].nil? && params[:app_project] == "1"
      job_types.push 2 
      session[:app_project] = 1
    else
      session[:app_project] = 0
    end

    if params[:sortby]
      session[:sortby] = params[:sortby]
      case params[:sortby]
      when "0"
        order_by = "id DESC"
      when "1"
        order_by = "company_name ASC"
      else
        order_by = "title ASC"
      end
    end

    if params[:keyword]
      session[:keyword] = params[:keyword]
      @jobs = Job.order(order_by).search(params[:keyword])
    elsif session[:keyword]
      @jobs = Job.order(order_by).search(session[:keyword])
    else
      @jobs = Job.order(order_by)
    end
    @jobs = @jobs.select { |job| job_types.include? job.job_type.to_i }

  end

  def show
    @job = Job.find(params[:id])

    set_page_title "#{@job.title} | #{@job.company_name} is hiring!"
    set_page_description @job.description
  end

  def new
    @job = Job.new
    # @job.deadline = Time.zone.now + 90.days
  end

  def create
    @job = Job.new(params[:job])
    payment(params[:stripe_token])

    puts "--------------------------------"
    puts @payment
    if @job.save
      redirect_to job_path(@job)
    else
      render :new
    end
  end

  def edit
  end

  # def preview
  #   @job = current_user.jobs.build(params[:job])
  #   @job.created_at = Time.now
  #   @job.valid?

  #   render layout: false
  # end

  def update
    if @job.update_attributes(params[:job])
      flash[:notice] = "Job information is successfully updated."
    else
      flash[:alert] = "Failed to update the job information."
    end
    redirect_to "/admin"
  end

  def restart
    @job.updated_at = Time.now
    @job.save

    redirect_to "/admin"
  end

  def destroy
    @job.destroy

    redirect_to "/admin"
  end

  def open
    @job.open
    @job.save!

    redirect_to job_path(@job)
  end

  def close
    @job.close
    @job.save!

    redirect_to job_path(@job)
  end

  protected

  def find_my_job
    @job = Job.find(params[:id])
  end

  def payment(token)
    @transcation = Stripe::Charge.create(
      :amount => 40000, # 40$
      :currency => "usd",
      :card => token,
      :description => "Charge for apptopia job posting"
    )
  end

  def recover_session
    if params[:sortby].nil?
      params[:sortby] = session[:sortby]
      
      if !session[:full_time].nil?
        params[:full_time] = session[:full_time].to_s
      end

      if !session[:part_time].nil?
        params[:part_time] = session[:part_time].to_s
      end

      if !session[:app_project].nil?
        params[:app_project] = session[:app_project].to_s
      end
    end

  end

end