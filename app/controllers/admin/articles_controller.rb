class Admin::ArticlesController < Admin::BaseController

  def index
    @articles = Article.all.order('created_at DESC')
    scope = Article.publication_types[params[:scope]] if params[:scope]
    @articles = Article.where(publication_type: scope).order('created_at DESC') if params[:scope]
  end

  def new
    @article = Article.new
  end

  def edit
    @article = Article.friendly.find params[:id]
  end

  def create
    @article = Article.new articles_params
    if @article.save
      flash[:success] = "Публикация создана"
      redirect_to admin_articles_path
    else
      flash[:success] = "Ошибка создания"
      redirect_to admin_articles_path
    end
  end

  def destroy
    @article = Article.friendly.find params[:id]
    if @article.destroy
      flash[:success] = "Публикация удалена"
      redirect_to admin_articles_path
    else
      flash[:success] = "Ошибка удаления"
      redirect_to admin_articles_path
    end
  end

  def update
    @article = Article.friendly.find params[:id]
    if @article.update_attributes articles_params
      flash[:success] = "Публикация отредактирована"
      redirect_to admin_articles_path
    else
      flash[:success] = "Ошибка отредактирования"
      redirect_to admin_articles_path
    end
  end

  private

  def articles_params
    params.require(:article).permit(:title, :content, :image, :slug, :image_alt, :position, :main_page, :publication_type)
  end

end

