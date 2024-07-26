# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  layout 'user', only: [:edit]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    params[:user][:admin] = false
    params[:user][:active] = true
    super
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  def update_resource(resource, params)
    if current_user.provider.present?
      params.delete('current_password')
      resource.update_without_password(params)
    else
      resource.update_with_password
    end
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:fname, :lname, :admin, :active, :provider, :uid])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:avatar, :fname, :lname, :active])
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    # if Rails.env.development?
    #   '/letter_opener'
    # else
      super(resource)
    # end
  end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    # if Rails.env.development?
    #   '/letter_opener'
    # else
      super(resource)
    # end
  end

  def after_update_path_for(resource)
    user_path(resource)
  end

  def after_destroy_path_for(resource)
    if (current_user.admin?)
      admin_users_path
    else
      root_path
    end
  end
end
