# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/ban
  def ban
    UserMailer.ban
  end

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/unban
  def unban
    UserMailer.unban
  end

end
