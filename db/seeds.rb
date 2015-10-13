# -*- encoding : utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# http://media.pragprog.com/titles/rails4/code/depot_b/db/seeds.rb

#---
# Excerpted from "Agile Web Development with Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/rails4 for more book information.
#---
#---
# Excerpted from "Agile Web Development with Rails, 4rd Ed.",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/rails4 for more book information.
#---
# encoding: utf-8
Product.delete_all

Product.create(:title => 'G4PM690VSYL20',
               :short_description =>
                   %{<p>
        Реле контроля фаз для трехфазных сетей, Многофункциональное,
        Контроль напряжения на понижение, Контроль напряжения в заданном диапазоне,
        Напряжение контролируемой сети Un=690/400VAC, Контроль чередования (последовательности) фаз,
        Контроль фаз на обрыв, Подключаемый контроль асимметрии фаз,
        Необязательное подключение нейтрального проводника (N), Определение обрыва нейтрали (N),
        Напряжение питания определяется модулем питания TR3, 2 перекидных контакта (2CO)
      </p>},
               :image_url =>   'catalog/TELE/devices/G4PM690VSYL20_device.jpg',
               :retail_price => 14381.00)
