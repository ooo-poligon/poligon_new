module Utils
  class Course
    def getCourse
      require 'net/http'
      url = URI.parse('http://www.poligon.info/upload/course.euro')
      req = Net::HTTP::Get.new(url.to_s)
      res = Net::HTTP.start(url.host, url.port) {|http|
        http.request(req)
      }
      @courseEuro = res.body.to_s.to_f
    end
  end
end
