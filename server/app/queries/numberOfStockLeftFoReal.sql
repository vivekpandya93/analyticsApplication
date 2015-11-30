select
   size as Size,{{ bobDb }}_ae.catalog_simple.sku as Individual_SKUs,
     {{ cerberus }}.stock_summary.quantity as Available_Stock
      from {{ namdexDb }}.sales_order_item
     inner join {{ cerberus }}_ae.stock_summary
      on {{ cerberus }}_ae.stock_summary.simple_sku = {{namdexDb}}.sales_order_item.sku
     where {{ namdexDb }}.sales_order_item.product_brand = "{{name}}"
     and {{ namdexDb }}.sales_order_item.status_waterfall = 1
   and status_name <> 'canceled'
     and sku_config = "{{sku}}"
     group by Individual_SKUs
