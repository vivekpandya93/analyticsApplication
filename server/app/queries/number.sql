select
   	 {{ namdexDb }}.sales_order_item.size as Size, 
   	 {{ namdexDb }}.sales_order_item.sku as Individual_SKUs,
     {{ cerberus }}.stock_summary.quantity as Available_Stock
from {{ namdexDb }}.sales_order_item
     inner join {{ cerberus }}.stock_summary
		 on {{ cerberus }}.stock_summary.simple_sku = {{ namdexDb }}.sales_order_item.sku
     where {{ namdexDb }}.sales_order_item.product_brand = "{{name}}"
     and {{ namdexDb }}.sales_order_item.status_waterfall = 1
     and {{ namdexDb }}.sales_order_item.status_name <> 'canceled'
     and {{ namdexDb }}.sales_order_item.sku_config = "{{sku}}"
     group by Individual_SKUs