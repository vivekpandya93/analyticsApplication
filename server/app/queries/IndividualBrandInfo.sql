select  {{ namdexDb }}.sales_order_item.product_name as Name,
	{{ namdexDb }}.sales_order_item.sku_config as SKU,
	sum({{ namdexDb }}.sales_order_item.paid_price) as Revenue,
  sum({{ namdexDb }}_ae.catalog_stock.quantity) as Available_Stock,
  count(*) as UnitsSold
from {{ namdexDb }}.sales_order_item

inner join {{ bobDb }}_ae.catalog_config
on {{ namdexDb }}.sales_order_item.sku_config = {{ bobDb }}_ae.catalog_config.sku

inner join {{ bobDb }}_ae.catalog_attribute_option_global_department
on {{ bobDb }}_ae.catalog_attribute_option_global_department.id_catalog_attribute_option_global_department = {{ bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_department

inner join {{ bobDb }}_ae.catalog_attribute_option_global_gender_new
on {{ bobDb }}_ae.catalog_attribute_option_global_gender_new.id_catalog_attribute_option_global_gender_new = {{ bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_gender_new

inner join {{ bobDb }}_ae.catalog_attribute_option_global_category
on {{ bobDb }}_ae.catalog_attribute_option_global_category.id_catalog_attribute_option_global_category = {{ bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_category

right join {{ bobDb }}_ae.catalog_simple
on {{ bobDb }}_ae.catalog_simple.sku = namdex_dev.sales_order_item.sku

right join {{ bobDb }}_ae.catalog_source
on {{ bobDb }}_ae.catalog_source.fk_catalog_simple = {{ bobDb }}_ae.catalog_simple.id_catalog_simple

right join {{ bobDb }}_ae.catalog_stock
on {{ bobDb }}_ae.catalog_source.id_catalog_source = {{ bobDb }}_ae.catalog_stock.fk_catalog_source

where {{ bobDb }}.sales_order_item.ordered_at between "{{from}}" and "{{to}}"
and status_waterfall = 1
and {{ namdexDb }}.sales_order_item.product_brand = "{{spaced_name}}"
and status_name not in ('canceled','test_invalid')

{% if department %}
	and {{ bobDb }}_ae.catalog_attribute_option_global_department.name = "{{department}}"
{% else %}
	and {{ bobDb }}_ae.catalog_attribute_option_global_department.name in ('Accessories', 'Bags', 'Clothing', 'Shoes')
{%endif%}

{% if gender %}
and (case when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender = "Male" then "Boy"
		  when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ namdexDb }}.sales_order_item.product_gender end) = "{{gender}}"

{% else %}
		and (case when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender = "Male" then "Boy"
		 when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ namdexDb }}.sales_order_item.product_gender end) in ('Boy' , 'Girl', 'Male', 'Female')
{% endif %}

{% if category %}
	and {{ bobDb }}_ae.catalog_attribute_option_global_category.name = "{{category}}"
{%endif%}

and {{ namdexDb }}.sales_order_item.status_waterfall = 1
group by {{ namdexDb }}.sales_order_item.sku_config, {{ namdexDb }}.sales_order_item.product_name
order by Revenue desc;




