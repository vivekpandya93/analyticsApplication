select 
     size as Size,{{ bobDb }}_ae.catalog_simple.sku as Individual_SKUs,
       {{ bobDb }}_ae.catalog_stock.quantity as Available_Stock
     from {{ namdexDb }}.sales_order_item
       right join {{ bobDb }}_ae.catalog_simple 
       on {{ namdexDb }}.sales_order_item.sku = {{ bobDb }}_ae.catalog_simple.sku
       right join {{ bobDb }}_ae.catalog_source 
       on {{ bobDb }}_ae.catalog_source.fk_catalog_simple = {{ bobDb }}_ae.catalog_simple.id_catalog_simple
       right join {{ bobDb }}_ae.catalog_stock
       on {{ bobDb }}_ae.catalog_stock.fk_catalog_source = {{ bobDb }}_ae.catalog_source.id_catalog_source
       where {{ namdexDb }}.sales_order_item.product_brand = ?
       and {{ namdexDb }}.sales_order_item.status_waterfall = 1
     and status_name <> 'canceled'
       and sku_config = ?
       group by Individual_SKUs
