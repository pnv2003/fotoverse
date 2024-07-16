class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]

  def welcome
    if user_signed_in?
      if current_user.admin
        redirect_to admin_photos_path
      else
        redirect_to feeds_path
      end
    end

    if params[:notice]
      render json: { status_code: 200, message: params[:notice] }, status: :ok
    end
  end
end
