class Admin::ExampleImagesController < Admin::BaseController
    before_action :set_example

  def create
    add_more_images(images_params[:example_images])
    flash[:error] = "Failed uploading images" unless @example.save
    redirect_to :back
  end

  def destroy
    remove_image_at_index(params[:id].to_i)
    flash[:error] = "Failed deleting image" unless @example.save
    redirect_to :back
  end

  private

  def set_example
    @example = Example.find(params[:example_id])
  end

  def add_more_images(new_images)
    images = @example.example_images
    images += new_images
    @example.example_images = images
  end

  def remove_image_at_index(index)
    remain_images = @example.example_images # copy the array
    deleted_image = remain_images.delete_at(index) # delete the target image
    deleted_image.try(:remove!) # delete image from S3
    @example.example_images = remain_images # re-assign back
  end

  def images_params
    params.require(:example).permit({example_images: []}) # allow nested params as array
  end

end

