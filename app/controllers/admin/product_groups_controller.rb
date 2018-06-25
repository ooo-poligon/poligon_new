class Admin::ProductGroupsController < Admin::BaseController
  def index
    @product_groups = ProductGroup.all.to_a
    @product_groups.sort! { |a,b| a.name.downcase <=> b.name.downcase }
  end

  def show
    @product_group = ProductGroup.find(params[:id])
    @examples = Example.includes(:product_groups).where('product_groups.id' => @product_group.id)
  end
end
