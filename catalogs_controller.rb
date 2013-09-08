class CatalogsController < ApplicationController
  respond_to :json

  def index
    if params[:product_id]
      product = Product.find_by_id(params[:product_id])
      @catalogs = product.category.catalogs
    else
      @catalogs = Catalog.all
    end
    render :json => @catalogs.collect {|catalog| {:id => catalog.id, :name => catalog.attr_name} }
  end
end
