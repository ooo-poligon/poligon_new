class Admin::ExamplesController < Admin::BaseController

  def index
    @scopes   = Scope.all
    @examples = Example.all

    respond_to do |format|
      format.html
    end
  end

  def show
    @tags = Tag.all
  end

  def new
    @example = Example.new
  end

  def create
    @example = Example.new example_params

    respond_to do |format|
      if @example.save
        add_tags_to_example params.require(:example).permit(:tags)["tags"]
        add_product_groups_to_example params.require(:example).permit(:product_groups)["product_groups"]
        format.html { redirect_to admin_examples_path }
      else
        format.html { render action: new }
      end
    end
  end

  def edit
    @example = Example.find params[:id]

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

  def update
    @example = Example.find params[:id]

    respond_to do |format|
      if @example.update_attributes example_params
        add_tags_to_example params.require(:example).permit(:tags)["tags"]
        add_product_groups_to_example params.require(:example).permit(:product_groups)["product_groups"]
        format.html { redirect_to admin_examples_path }
      else
        format.html { render action: edit }
      end
    end
  end

  def destroy
    Example.find(params[:id]).destroy
    respond_to do |format|
      format.html { redirect_to admin_examples_path }
      format.json { head :no_content }
      format.js   { render :layout => false }
    end
  end

  private

  def example_params
    params.require(:example).permit :title, :issue, :solution, :scope_id, :product_id, {example_images: []}
  end

  def add_tags_to_example params_tags
    example_tags = []
    params_tags.split(',').each do |tag|
      if Tag.find_by(name: tag.strip)
        t = Tag.find_by(name: tag.strip)
      else
        t = Tag.new name: tag.strip
      end
      t.save
      example_tags.push t
      @example.tags.clear
    end
    @example.tags << example_tags
  end

  def add_product_groups_to_example params_product_groups
    example_product_groups = []
    params_product_groups.split(',').each do |product_group|
      if ProductGroup.find_by(name: product_group.strip)
        t = ProductGroup.find_by(name: product_group.strip)
      else
        t = ProductGroup.new name: product_group.strip
      end
      t.save
      example_product_groups.push t
      @example.product_groups.clear
    end
    @example.product_groups << example_product_groups
  end

end
