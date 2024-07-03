class SessionsController < ApplicationController
  skip_before_action :authorized, only: [:welcome, :new]

  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])

      session[:user_id] = @user.id
      redirect_to "/welcome", flash: { notice: "Login successful." }
    else
      redirect_to "/login", flash: { error: "Login failed. Please try again." }
    end
  end

  def welcome
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/welcome", flash: { notice: "Logout successful."}
  end
end
