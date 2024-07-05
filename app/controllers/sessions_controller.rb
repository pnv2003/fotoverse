class SessionsController < ApplicationController
  skip_before_action :authorized, only: [:welcome, :new, :create]

  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])

      session[:user_id] = @user.id

      if @user.admin
        redirect_to admin_photos_path, flash: { notice: "Login successful as admin." }
      else
        redirect_to feeds_path, flash: { notice: "Login successful." }
      end

    else
      redirect_to login_path, flash: { error: "Login failed. Please try again." }
    end
  end

  def welcome
    if session[:user_id]
      @user = User.find_by(id: session[:user_id])
      if @user.admin
        redirect_to admin_photos_path
      else
        redirect_to feeds_path
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to welcome_path, flash: { notice: "Logout successful."}
  end
end
