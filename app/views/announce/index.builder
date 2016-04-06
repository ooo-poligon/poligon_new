xml.instruct!
xml.rss version: '2.0', 'xmlns:atom' => 'http://www.w3.org/2005/Atom' do

  xml.channel do
    xml.title 'Сайт компании ПОЛИГОН'
    xml.description 'Компания ПОЛИГОН специализируется в оптовой торговле электронными компонентами и электротехническими изделиями.'
    xml.link root_url
    xml.language 'ru'
    xml.tag! 'atom:link', rel: 'self', type: 'application/rss+xml', href: 'feeds'

    for news_item in @news_items
      xml.item do
        xml.title news_item.title
        xml.link news_item_url(news_item)
        xml.pubDate(news_item.created_at.rfc2822)
        xml.guid news_item_url(news_item)
        xml.description(h(news_item.content))
      end
    end

  end

end
