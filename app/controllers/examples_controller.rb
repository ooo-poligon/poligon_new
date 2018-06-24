class ExamplesController < ApplicationController

  def index
    @scopes   = Scope.all
    @tags     = Tag.all
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
  end

end
