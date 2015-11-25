select sum(paid_price) as Revenue, product_brand, count(*) as UnitsSold,
namshi_dev_ae.catalog_attribute_option_global_department.name as Department,
namshi_dev_ae.catalog_attribute_option_global_category.name as Category,
(case when namdex_dev.sales_order_item.product_age_group <> "Adult" && namdex_dev.sales_order_item.product_gender ="Male" then "Boy"
			 when namdex_dev.sales_order_item.product_age_group <> "Adult" && namdex_dev.sales_order_item.product_gender ="Female" then "Girl"
			 else namdex_dev.sales_order_item.product_gender end) as Gender
from namdex_dev.sales_order_item 

inner join namshi_dev_ae.catalog_config
on namdex_dev.sales_order_item.sku_config = 
namshi_dev_ae.catalog_config.sku

inner join namshi_dev_ae.catalog_attribute_option_global_department 
on namshi_dev_ae.catalog_attribute_option_global_department.id_catalog_attribute_option_global_department =
namshi_dev_ae.catalog_config.fk_catalog_attribute_option_global_department

inner join namshi_dev_ae.catalog_attribute_option_global_category 
on namshi_dev_ae.catalog_attribute_option_global_category.id_catalog_attribute_option_global_category = 
namshi_dev_ae.catalog_config.fk_catalog_attribute_option_global_category

inner join namshi_dev_ae.catalog_attribute_option_global_gender_new 
on namshi_dev_ae.catalog_attribute_option_global_gender_new.id_catalog_attribute_option_global_gender_new
= namshi_dev_ae.catalog_config.fk_catalog_attribute_option_global_gender_new

where (namdex_dev.sales_order_item.id_sales_order_item, namdex_dev.sales_order_item.db) IN (SELECT namdex_dev.sales_order_item.id_sales_order_item, namdex_dev.sales_order_item.db FROM namdex_dev.sales_order_item WHERE namdex_dev.sales_order_item.ordered_at between ? and ?)


{% if gender %}
and (case when namdex_dev.sales_order_item.product_age_group <> "Adult" && namdex_dev.sales_order_item.product_gender = "Male" then "Boy" 
		  when namdex_dev.sales_order_item.product_age_group <> "Adult" && namdex_dev.sales_order_item.product_gender ="Female" then "Girl"
     else namdex_dev.sales_order_item.product_gender end) = ?

{% else %} 
		(case when namdex_dev.sales_order_item.product_age_group <> "Adult" && namdex_dev.sales_order_item.product_gender = "Male" then "Boy" 
		 when namdex_dev.sales_order_item.product_age_group <> "Adult" && namdex_dev.sales_order_item.product_gender ="Female" then "Girl"
     else namdex_dev.sales_order_item.product_gender end) in ('Boy' , 'Girl', 'Male', 'Female')
{%endif%}

{% if department %}
	and namshi_dev_ae.catalog_attribute_option_global_department.name = ?
{% else %}
	namshi_dev_ae.catalog_attribute_option_global_department.name in ('Accessories', 'Bags', 'Clothing', 'Shoes')
{%endif%}

{% if category %}
	and namshi_dev_ae.catalog_attribute_option_global_category.name = ?
{%endif%}
and namdex_dev.sales_order_item.status_waterfall = 1
and namdex_dev.sales_order_item.status_name <> 'canceled'
group by product_brand, namshi_dev_ae.catalog_attribute_option_global_department.name,
namshi_dev_ae.catalog_attribute_option_global_category.name, Gender
order by Revenue desc

