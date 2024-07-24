# Preview all emails at http://localhost:3000/rails/mailers/access_mailer
class AccessMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/access_mailer/notify
  def notify
    AccessMailer.notify
  end

end
