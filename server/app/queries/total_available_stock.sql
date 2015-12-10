select
{{ locales.bobDb }}_ae.catalog_config.sku as SKU,
{{ locales.bobDb }}_ae.catalog_simple.sku as Individual_SKUs,
sum({{ locales.cerberus }}.stock_summary.quantity) as Available_Stock

from  {{ locales.bobDb }}_ae.catalog_simple     
left join {{ locales.bobDb }}_ae.catalog_config
          on {{ locales.bobDb }}_ae.catalog_simple.fk_catalog_config = {{ locales.bobDb }}_ae.catalog_config.id_catalog_config

left join {{ locales.cerberus }}.stock_summary
      on {{ locales.cerberus }}.stock_summary.simple_sku = {{ locales.bobDb }}_ae.catalog_simple.sku
where {{ locales.bobDb }}_ae.catalog_config.sku  IN ({% bind variables.skus %})

group by {{ locales.bobDb }}_ae.catalog_config.sku