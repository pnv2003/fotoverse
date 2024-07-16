class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :flash_message
  # helper_method :current_user
  # helper_method :logged_in?

  # def current_user
  #   User.find_by(id: session[:user_id])
  # end

  # def logged_in?
  #   !current_user.nil?
  # end

  def authorized
    if logged_in?
      if !current_user.active
        redirect_to welcome_path, flash: { error: "You have been banned. Please ask the system admin to regain access." }
      end
    else
      redirect_to "/welcome", flash: { error: "Please login to gain access to this page"}
    end
  end

  def authorized_as_admin
    unless logged_in? && current_user.admin
      redirect_to welcome_path, flash: { error: "Access denied" }
    end
  end

  def flash_message
    if params[:error]
      flash[:error] = params[:error]
    elsif params[:success]
      flash[:success] = params[:success]
    elsif params[:notice]
      flash[:notice] = params[:notice]
    end
  end
end
