class UsersController < ApplicationController
  skip_before_action :authorized, only: [:new, :create]
  layout "user", only: [:show, :edit]

  def new
    @user = User.new
  end

  def create
    @user = User.new({**user_params, admin: false, active: true})
    if @user.save
      session[:user_id] = @user.id
      redirect_to "/welcome", flash: { notice: "You have become a member!" }
    else
      redirect_to "/signup", flash: { error: "Failed to sign you up. Please try again."}
    end
  end

  def show
  end

  def edit
  end

  def update
  end

  private
  def user_params
    params.require(:user).permit(:fname, :lname, :email, :password, :password_confirmation)
  end
end
