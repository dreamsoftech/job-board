# -*- encoding : utf-8 -*-
class JobsController < ApplicationController

  # before_filter :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  before_filter :find_my_job, only: [:preview, :publish, :edit, :update, :destroy, :open, :close, :restart]

  def index
    
    recover_session

    extract_queries

    if params[:order_by]
      session[:order_by] = params[:order_by]
      case params[:order_by]
      when "0"
        order_by = "jobs.id DESC"
      when "1"
        order_by = "jobs.company_name"
      when "2"
        order_by = "jobs.title"
      end
    else
      order_by = "id DESC"
    end

    if params[:keyword]
      session[:keyword] = params[:keyword]
      @jobs = Job.search(params[:keyword], nil, {order: order_by})
    elsif session[:keyword]
      @jobs = Job.search(session[:keyword], nil, {order: order_by})
    else
      @jobs = Job.order(order_by)
    end
    unless @job_types.empty?
      @jobs = @jobs.select { |job| @job_types.include? job.job_type.to_i }
    end

    respond_to do |format|
      format.json { render json: @jobs }
      format.html
      format.rss { render :layout => false } #index.rss.builder
    end
  end

  def show
    @job = Job.find(params[:id])

    set_page_title "#{@job.title} | #{@job.company_name} is hiring!"
    set_page_description @job.description
  end

  def new
    @job = Job.new
  end

  def create
    @job = Job.new(params[:job])
    puts @job.errors.inspect
    if @job.save
      redirect_to preview_job_path(@job)
    else
      render :new
    end
  end

  def edit
  end

  def preview
  end

  def publish
  end

  def payment
    # transcation(params[:stripe_token])
    redirect_to jobs_path
  end

  def update
    if @job.update_attributes(params[:job])
      redirect_to preview_job_path(@job)
    else
      render :edit
    end
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

  def transcation(token)
    @transcation = Stripe::Charge.create(
      :amount => 40000, # 40$
      :currency => "usd",
      :card => token,
      :description => "Charge for apptopia job posting"
    )
  end

  def recover_session
    if params[:order_by].nil?
      params[:order_by] = session[:order_by]
      
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

  def extract_queries
    @job_types = Array.new

    if !params[:full_time].nil?
      @job_types.push 0
    end

    if !params[:part_time].nil?
      @job_types.push 1
    end

    if !params[:app_project].nil?
      @job_types.push 2 
    end
  
    session[:full_time] = params[:full_time]
    session[:part_time] = params[:part_time]
    session[:app_project] = params[:app_project]
  end

end