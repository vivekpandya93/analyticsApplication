select
   	 {{ locales.namdexDB }}.sales_order_item.size as Size, 
   	 {{ locales.namdexDB }}.sales_order_item.sku as Individual_SKUs,
     {{ locales.cerberus }}.stock_summary.quantity as Available_Stock
from {{ locales.namdexDB }}.sales_order_item
     left join {{ locales.cerberus }}.stock_summary
		 on {{ locales.cerberus }}.stock_summary.simple_sku = {{ locales.namdexDB }}.sales_order_item.sku
     where {{ locales.namdexDB }}.sales_order_item.status_waterfall = 1
     and {{ locales.namdexDB }}.sales_order_item.status_name <> 'canceled'
     and {{ locales.namdexDB }}.sales_order_item.sku_config = {% bind variables.sku %}
     group by Individual_SKUs
