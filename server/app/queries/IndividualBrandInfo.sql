select  namdex_dev.sales_order_item.product_name as Name,
		namdex_dev.sales_order_item.sku_config as SKU,
		sum(namdex_dev.sales_order_item.paid_price) as Revenue,
        count(*) as UnitsSold
from namdex_dev.sales_order_item 
where namdex_dev.sales_order_item.ordered_at between ? and ?
and status_waterfall = 1
and namdex_dev.sales_order_item.product_brand = ?
and status_name not in ('canceled','test_invalid')
{% if categoryProvided %}
	and product_attrset = ?
{% else %}
	and product_attrset in ('Apparel', 'Shoes', 'Accessories')
{%endif%}
{% if genderProvided %}
and product_gender = ?
{% else %} 
and product_gender in ('Male', 'Female', 'Unisex')
{%endif%}
group by namdex_dev.sales_order_item.sku_config, namdex_dev.sales_order_item.product_name
order by Revenue desc;