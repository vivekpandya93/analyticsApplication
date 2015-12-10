select
		 {{ locales.namdexDb }}.sales_order_item.size as Size,
	   {{ locales.bobDb }}_ae.catalog_config.sku as SKU,
     {{ locales.bobDb }}_ae.catalog_simple.sku as Individual_SKUs,
     {{ locales.cerberus }}.stock_summary.quantity as Available_Stock
	
	    from  {{ locales.bobDb }}_ae.catalog_simple     
     left join {{ locales.bobDb }}_ae.catalog_config
			on {{ locales.bobDb }}_ae.catalog_simple.fk_catalog_config = {{ locales.bobDb }}_ae.catalog_config.id_catalog_config

     left join {{ locales.cerberus }}.stock_summary
		 on {{ locales.cerberus }}.stock_summary.simple_sku = {{ locales.bobDb }}_ae.catalog_simple.sku

		 left join {{ locales.namdexDb }}.sales_order_item 
		 on {{ locales.namdexDb }}.sales_order_item.sku = {{ locales.bobDb }}_ae.catalog_simple.sku

     where {{ locales.bobDb }}_ae.catalog_config.sku = {% bind variables %}
     group by Individual_SKUs