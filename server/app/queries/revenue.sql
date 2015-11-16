select sum(paid_price) as Revenue, product_brand, ordered_at, count(*) as UnitsSold
from namdex_dev.sales_order_item 
where ordered_at between ? and ?
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
and status_waterfall = 1
and status_name <> 'canceled'
group by product_brand
order by Revenue desc;