class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :authorize_user
  before_action :flash_message
  around_action :switch_locale

  def authorize_user
    if user_signed_in?
      if !current_user.active
        redirect_to welcome_path, flash: { error: "You have been banned. Please ask the system admin to regain access." }
      end
    end
  end

  def authorize_admin
    unless user_signed_in? && current_user.admin
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

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def default_url_options
    { locale: I18n.locale }
  end
end
