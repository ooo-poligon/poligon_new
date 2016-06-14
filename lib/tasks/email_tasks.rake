desc 'Checks all certificates for expiration date and send notification email to manager.'
task check_certificates_expiration: :environment do
  user    = 'klekotnev@gmail.com'
  subject = 'Срок действия сертификата истекает'
  certificate = Sertificate.first
  UserMailer.certificate_expiration_email(user, subject, certificate).deliver!
end
