# -*- encoding : utf-8 -*-
module ApplicationHelper
  def quantity_image_for product_id
    unless Quantity.find_by(product_id: product_id).nil?
      if (Quantity.find_by(product_id: product_id).stock - Quantity.find_by(product_id: product_id).reserved).to_i > 0
        "/assets/green.gif"
      else
        "/assets/grey.gif"
      end
    else
      "/assets/grey.gif"
    end
  end

  def cart_quantity_text number
    if [11, 12, 13, 14].include?(number % 100)
      ('<span></span> '+ (number.to_s) +' <i>товаров</i>').html_safe
    elsif number % 10 == 1
      ('<span></span> '+ (number.to_s) +' <i>товар</i>').html_safe
    elsif [2, 3, 4].include?(number % 10)
      ('<span></span> '+ (number.to_s) +' <i>товара</i>').html_safe
    else
      ('<span></span> '+ (number.to_s) +' <i>товаров</i>').html_safe
    end
  end

  def cart_total_amount cart
    total_amount = 0
    line_items = cart.line_items
    line_items.each do |line_item|
      total_amount += line_item.price * line_item.quantity
    end

    total_amount
  end

  def meta_tags(opts = {})
    opts = normalize_meta_hash(opts)

    default   = {
      :charset           => "utf-8", 
      :"X-UA-Compatible" => "IE=edge,chrome=1", 
      :viewport          => "width=device-width",
      :"og:url"          => "#{request.url}", 
      :"og:type"         => "article",
      :"og:title"        => opts[:title],
      :"og:description"  => opts[:description],
      :"keywords"        => opts[:keywords],
      :"author"          => "Igor Klekotnev",
      :"og:image"        => opts[:"og:image"],
      :"csrf-param"      => request_forgery_protection_token,
      :"csrf-token"      => form_authenticity_token
    }

    override_hash = controller.instance_variable_get("@_meta_tags_hash") || {}
    meta_hash = default.deep_merge(opts).deep_merge(override_hash)

    html = ""
    html << "<title>#{ h(meta_hash.delete(:title)) }</title>\n"
    meta_hash.each {|k,value_or_array|
      values = value_or_array.is_a?(Array) ? value_or_array : [value_or_array]
      values.each { |v|
        if k.to_s =~ /[a-zA-Z_][-a-zA-Z0-9_.]\:/
          html << "<meta property=\"#{h(k)}\" content=\"#{h(v)}\" />\n"
        else
          html << "<meta name=\"#{h(k)}\" content=\"#{h(v)}\" />\n"
        end
      }
    }
    html.html_safe
  end

  private

  def normalize_meta_hash(hash)
    normalized = {}
    normalize_meta_hash_walker(hash, normalized)
    normalized
  end

  def normalize_meta_hash_walker(hash, normalized, current = nil)
    hash.each do |k, v|
      thisPath = current ? current.dup : []
      thisPath << k.to_s

      if v.is_a?(Hash)
        normalize_meta_hash_walker(v, normalized, thisPath)
      elsif v
        key = thisPath.join ":"
        normalized[:"#{key}"] = v
      end
    end
  end
end
