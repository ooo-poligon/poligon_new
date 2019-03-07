#!/usr/bin/env ruby

# Simple 404 finder

require 'rubygems'
require 'anemone'

#

Anemone.crawl("https://poligon-production.ml") do |anemone|
  anemone.on_every_page do |page|
    if !page.code.nil? and page.code > 302 and !page.url.to_s.include?('%23')
      puts "[#{page.code}] Ссылка: #{page.url} - Страница: #{page.referer}"
    end
  end
end