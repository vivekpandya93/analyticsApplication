select
{{ locales.bobDb }}_ae.catalog_attribute_option_global_department.name as Department,
{{ locales.bobDb }}_ae.catalog_attribute_option_global_category.name as Category,
(case when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender ="Male" then "Boy"
			 when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
			 else {{ locales.namdexDb }}.sales_order_item.product_gender end) as Gender,
sum(unit_price) as Revenue, product_brand, count(*) as UnitsSold

from {{ locales.namdexDb }}.sales_order_item

left join {{ locales.bobDb }}_ae.catalog_config
on {{ locales.namdexDb }}.sales_order_item.sku_config = {{ locales.bobDb }}_ae.catalog_config.sku

left join {{ locales.bobDb }}_ae.catalog_attribute_option_global_department
on {{ locales.bobDb }}_ae.catalog_attribute_option_global_department.id_catalog_attribute_option_global_department =
{{ locales.bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_department

left join {{ locales.bobDb }}_ae.catalog_attribute_option_global_category
on {{ locales.bobDb }}_ae.catalog_attribute_option_global_category.id_catalog_attribute_option_global_category =
{{ locales.bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_category

left join {{ locales.bobDb }}_ae.catalog_attribute_option_global_gender_new
on {{ locales.bobDb }}_ae.catalog_attribute_option_global_gender_new.id_catalog_attribute_option_global_gender_new
= {{ locales.bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_gender_new

WHERE {{ locales.namdexDb }}.sales_order_item.ordered_at between DATE_ADD({% bind variables.from %}, INTERVAL -4 HOUR) and DATE_ADD({% bind variables.to %}, INTERVAL - 4 HOUR) 

{% if variables.gender %}
and (case when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender = "Male" then "Boy"
		  when {{ locales.namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ locales.namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ locales.namdexDb }}.sales_order_item.product_gender end) = {% bind variables.gender %}
{% endif %}

{% if variables.department %}
	and {{ locales.bobDb }}_ae.catalog_attribute_option_global_department.name = {% bind variables.department %}
{%endif%}

{% if variables.category %}
	and {{ locales.bobDb }}_ae.catalog_attribute_option_global_category.name = {% bind variables.category %}
{% endif %}

and {{ locales.namdexDb }}.sales_order_item.status_waterfall = 1
group by product_brand
order by UnitsSold desc
limit 500;

