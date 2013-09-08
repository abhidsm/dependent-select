ActiveAdmin.register CatalogsProduct do
  form do |f|
    f.inputs "Details" do
      f.input :product, :as => :select, :collection => Product.all.collect {|product| [product.name, product.id] }
      f.input :catalog, :as => :select, :input_html => {'data-option-dependent' => true, 'data-option-url' => '/products/:catalogs_product_product_id/catalogs', 'data-option-observed' => 'catalogs_product_product_id'}, :collection => (resource.product ? resource.product.category.catalogs.collect {|catalog| [catalog.attr_name, catalog.id]} : []) 
    end
    f.actions
  end
end
