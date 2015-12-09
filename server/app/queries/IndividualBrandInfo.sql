select  {{ locales.namdexDb }}.sales_order_item.product_name as Name,
				{{ locales.namdexDb }}.sales_order_item.sku_config as SKU,
				sum({{ locales.namdexDb }}.sales_order_item.paid_price) as Revenue,
  			count(*) as UnitsSold
from {{ locales.namdexDb }}.sales_order_item

left join {{ locales.bobDb }}_ae.catalog_config
on {{ locales.namdexDb }}.sales_order_item.sku_config = {{ locales.bobDb }}_ae.catalog_config.sku

left join {{ locales.bobDb }}_ae.catalog_attribute_option_global_department
on {{ locales.bobDb }}_ae.catalog_attribute_option_global_department.id_catalog_attribute_option_global_department = {{ locales.bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_department

left join {{ locales.bobDb }}_ae.catalog_attribute_option_global_gender_new
on {{ locales.bobDb }}_ae.catalog_attribute_option_global_gender_new.id_catalog_attribute_option_global_gender_new = {{ locales.bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_gender_new

left join {{ locales.bobDb }}_ae.catalog_attribute_option_global_category
on {{ locales.bobDb }}_ae.catalog_attribute_option_global_category.id_catalog_attribute_option_global_category = {{ locales.bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_category

WHERE {{ locales.namdexDb }}.sales_order_item.ordered_at between {% bind variables.from %} and {% bind variables.to %}


and status_waterfall = 1
and {{ locales.namdexDb }}.sales_order_item.product_brand = {% bind variables.spaced_name %}
and status_name not in ('canceled','test_invalid')

{% if variables.department %}
	and {{ locales.bobDb }}_ae.catalog_attribute_option_global_department.name = {% bind variables.department %}
{% else %}
	and {{ locales.bobDb }}_ae.catalog_attribute_option_global_department.name in ('Accessories', 'Bags', 'Clothing', 'Shoes')
{%endif%}

{% if variables.gender %}
and (case when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender = "Male" then "Boy"
		  when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ locales.namdexDb }}.sales_order_item.product_gender end) = {% bind variables.gender %}

{% else %}
		and (case when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender = "Male" then "Boy"
		 when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ locales.namdexDb }}.sales_order_item.product_gender end) in ('Boy' , 'Girl', 'Male', 'Female')
{% endif %}

{% if variables.category %}
	and {{ locales.bobDb }}_ae.catalog_attribute_option_global_category.name = {% bind variables.category %}
{%endif%}

and {{ locales.namdexDb }}.sales_order_item.status_waterfall = 1
group by {{ locales.namdexDb }}.sales_order_item.sku_config, {{ locales.namdexDb }}.sales_order_item.product_name
order by Revenue desc
limit 250;




