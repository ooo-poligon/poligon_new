desc 'Get exchange rates from CBR'
task update_exchange_rate: :environment do
  date = Date.today.strftime("%d/%m/%Y")
  url = URI.parse("http://cbr.ru/scripts/XML_daily.asp?date_req=#{date}")
  req = Net::HTTP::Get.new(url.to_s)
  begin
    res = Net::HTTP.start(url.host, url.port) {|http| 
        http.request(req)
    }
    doc = Nokogiri::XML(res.body)

    eur_rate = doc.xpath("//Valute[@ID='R01239']//Value").children.first.text.gsub(",",".")
    usd_rate = doc.xpath("//Valute[@ID='R01235']//Value").children.first.text.gsub(",",".")

    if eur_rate.to_i > 1 && usd_rate.to_i > 1
      @result = ExchangeRate.create(eur_rate: eur_rate, usd_rate: usd_rate)
    end

  rescue
  end

end
