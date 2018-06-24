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
  end

  def update
    @example = Example.find params[:id]

    respond_to do |format|
      if @example.update_attributes example_params
        add_tags_to_example params.require(:example).permit(:tags)["tags"]
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

end
