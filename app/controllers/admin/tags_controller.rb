class Admin::TagsController < Admin::BaseController

  def index
    @tags = Tag.all.to_a
    @tags.sort! { |a,b| a.name.downcase <=> b.name.downcase }
  end

  def show
    @tag = Tag.find(params[:id])
    @examples = Example.includes(:tags).where('tags.id' => @tag.id)
  end

end
