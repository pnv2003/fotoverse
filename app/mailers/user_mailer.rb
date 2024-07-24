class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.ban.subject
  #
  def ban(user, admin)
    @user = user
    @admin = admin
    mail to: user.email, subject: "You have been banned from Fotoverse"
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.unban.subject
  #
  def unban(user, admin)
    @user = user
    @admin = admin
    mail to: user.email, subject: "You have been unbanned, welcome back to Fotoverse"
  end
end
