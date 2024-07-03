class UsersController < ApplicationController
  skip_before_action :authorized, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.create({**user_params, admin: false, active: true})
    session[:user_id] = @user.id
    redirect_to "/welcome", flash: { notice: "You have become a member!" }
  end

  private
  def user_params
    params.require(:user).permit(:fname, :lname, :email, :password, :password_confirmation)
  end
end
