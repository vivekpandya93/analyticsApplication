select sum(paid_price) as Revenue, product_brand, count(*) as UnitsSold,
{{ bobDb }}_ae.catalog_attribute_option_global_department.name as Department,
{{ bobDb }}_ae.catalog_attribute_option_global_category.name as Category,
(case when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender ="Male" then "Boy"
			 when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
			 else {{ namdexDb }}.sales_order_item.product_gender end) as Gender
from {{ namdexDb }}.sales_order_item 

inner join {{ bobDb }}_ae.catalog_config
on {{ namdexDb }}.sales_order_item.sku_config = 
{{ bobDb }}_ae.catalog_config.sku

inner join {{ bobDb }}_ae.catalog_attribute_option_global_department 
on {{ bobDb }}_ae.catalog_attribute_option_global_department.id_catalog_attribute_option_global_department =
{{ bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_department

inner join {{ bobDb }}_ae.catalog_attribute_option_global_category 
on {{ bobDb }}_ae.catalog_attribute_option_global_category.id_catalog_attribute_option_global_category = 
{{ bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_category

inner join {{ bobDb }}_ae.catalog_attribute_option_global_gender_new 
on {{ bobDb }}_ae.catalog_attribute_option_global_gender_new.id_catalog_attribute_option_global_gender_new
= {{ bobDb }}_ae.catalog_config.fk_catalog_attribute_option_global_gender_new

where ({{ namdexDb }}.sales_order_item.id_sales_order_item, {{ namdexDb }}.sales_order_item.db) IN (SELECT {{ namdexDb }}.sales_order_item.id_sales_order_item, {{ namdexDb }}.sales_order_item.db FROM {{ namdexDb }}.sales_order_item WHERE {{ namdexDb }}.sales_order_item.ordered_at between ? and ?)


{% if gender %}
and (case when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender = "Male" then "Boy" 
		  when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ namdexDb }}.sales_order_item.product_gender end) = ?

{% else %} 
		(case when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender = "Male" then "Boy" 
		 when {{ namdexDb }}.sales_order_item.product_age_group <> "Adult" && {{ namdexDb }}.sales_order_item.product_gender ="Female" then "Girl"
     else {{ namdexDb }}.sales_order_item.product_gender end) in ('Boy' , 'Girl', 'Male', 'Female')
{%endif%}

{% if department %}
	and {{ bobDb }}_ae.catalog_attribute_option_global_department.name = ?
{% else %}
	{{ bobDb }}_ae.catalog_attribute_option_global_department.name in ('Accessories', 'Bags', 'Clothing', 'Shoes')
{%endif%}

{% if category %}
	and {{ bobDb }}_ae.catalog_attribute_option_global_category.name = ?
{%endif%}
and {{ namdexDb }}.sales_order_item.status_waterfall = 1
and {{ namdexDb }}.sales_order_item.status_name <> 'canceled'
group by product_brand, {{ bobDb }}_ae.catalog_attribute_option_global_department.name,
{{ bobDb }}_ae.catalog_attribute_option_global_category.name, Gender
order by Revenue desc
