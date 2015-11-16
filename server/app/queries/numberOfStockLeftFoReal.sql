select 
          namshi_dev_ae.catalog_simple.sku as Individual_SKUs,
       namshi_dev_ae.catalog_stock.quantity as Available_Stock
          from namdex_dev.sales_order_item
       right join namshi_dev_ae.catalog_simple 
       on namdex_dev.sales_order_item.sku = namshi_dev_ae.catalog_simple.sku
       right join namshi_dev_ae.catalog_source 
       on namshi_dev_ae.catalog_source.fk_catalog_simple = namshi_dev_ae.catalog_simple.id_catalog_simple
       right join namshi_dev_ae.catalog_stock
       on namshi_dev_ae.catalog_stock.fk_catalog_source = namshi_dev_ae.catalog_source.id_catalog_source
       where namdex_dev.sales_order_item.product_brand = ?
       and namdex_dev.sales_order_item.status_waterfall = 1
          and status_name <> 'canceled'
       and sku_config =  ?
       group by Individual_SKUs
       order by Available_Stock desc;