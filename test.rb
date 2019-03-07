require 'mechanize'
require 'pry'

@agent = Mechanize.new
@counter = 0
File.open("redirect_list.csv").each do |line|

  begin
    puts @counter +=1
    @url = line.delete("\n").split(",")

    @page = @agent.get("https://poligon-production.ml"+@url[0])
    @expected = @url[1]

    
    if @page.uri.to_s.include?(@expected)
      file = File.join(File.dirname(__FILE__), 'good.txt')
      File.open(file, 'a') { |f| f.puts "[BAD] URL: #{@page.uri} EXP: #{@expected} FROM: #{@url[0]}" }
    else
      file = File.join(File.dirname(__FILE__), 'bad.txt')
      File.open(file, 'a') { |f| f.puts "[BAD] URL: #{@page.uri} EXP: #{@expected} FROM: #{@url[0]}" }
    end
  rescue Exception => e
    file = File.join(File.dirname(__FILE__), 'bad.txt')
    File.open(file, 'a') { |f| f.puts "[BAD] ERROR: #{e} EXP: #{@expected} FROM: #{@url[0]}" }
  end
end