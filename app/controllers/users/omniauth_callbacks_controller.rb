# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
  # class Users::OmniauthCallbacksController < ApplicationController
  def google_oauth2
    @user = User.from_omniauth request.env["omniauth.auth"]
    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", kind: "Google"
      sign_in_and_redirect @user, event: :authentication
    else
      session["devise.google_data"] = request.env["omniauth.auth"].except :extra
      redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
    end
  end

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: "Facebook") if is_navigational_format?
    else
      redirect_to new_user_registration_url
    end
  end

  def twitter
    twitter_data = request.env["omniauth.auth"]
    @user = User.find_or_create_by uid: twitter_data.uid
    session["twitter_data"] = {
      uid: twitter_data.uid,
      app_id: twitter_data.extra.access_token.consumer.key,
      secret: twitter_data.extra.access_token.consumer.secret,
      access_token: twitter_data.extra.access_token.token,
      access_secret: twitter_data.extra.access_token.secret
    }

    if @user.persisted?
      sign_in :user, @user
      redirect_to root_path
    else
      redirect_to new_user_registration_url
    end
  end
end
