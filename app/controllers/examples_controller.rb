class ExamplesController < ApplicationController

  def index
    @scopes   = Scope.where(id: Example.all.map{|a| a.scope.id}.flatten.uniq)
    @tags     = Tag.where(id: Example.all.map{|a| a.tags.pluck(:id)}.flatten.uniq)
    @examples = Example.all
    respond_to do |format|
      format.html
    end
  end

  def show
    @example = Example.find(params[:id])

    tags = Tag.includes(:examples).where("examples.id" => @example.id)
    example_tags = []
    tags.each do |tag|
      example_tags.push(tag.name)
    end
    @tags_string = example_tags.join(", ")

    product_groups = ProductGroup.includes(:examples).where("examples.id" => @example.id)
    example_product_groups = []
    product_groups.each do |product_group|
      example_product_groups.push(product_group.name)
    end
    @product_groups_string = example_product_groups.join(", ")
  end

end
