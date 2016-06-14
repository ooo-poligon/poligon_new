desc 'Checks all certificates for expiration date and send notification email to manager.'
task check_certificates_expiration: :environment do
  user    = 'kruten@poligon.info'
  subject = 'Срок действия сертификата истекает'
  certificate = Certificate.where(expiration_date: (Time.now + 2592000).strftime("%Y-%m-%d")) # за 30 дней
  certificate = Certificate.where(expiration_date: (Time.now + 1209600).strftime("%Y-%m-%d")) # за 14 дней
  certificate = Certificate.where(expiration_date: (Time.now +  604800).strftime("%Y-%m-%d")) # за 7 дней
  certificate = Certificate.where(expiration_date: (Time.now +   86400).strftime("%Y-%m-%d")) # за 1 день
  UserMailer.certificate_expiration_email(user, subject, certificate).deliver! if !certificate.empty?
end
