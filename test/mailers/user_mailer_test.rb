require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "ban" do
    mail = UserMailer.ban
    assert_equal "Ban", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "unban" do
    mail = UserMailer.unban
    assert_equal "Unban", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
