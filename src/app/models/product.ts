import { FormGroup } from '../../../node_modules/@angular/forms';
import { Subcontractor } from './subcontractor';

export class Product {

  product_id: String;
  product_name: String;
  product_description: String;
  product_price: String;
  product_quantity: String;
  delivery_day: String;
  product_type: String;
  quantity_ordered: String;
  place_order_flag: boolean;
  wish_list_flag: boolean;
  product_delivery: String;
  sub_contractors: Subcontractor[];
  s_user_name: String;
  order_id: String;
  delivery_stauts:String;
  order_date:String;
  wish_status:String;
  wisher_id:String;
}
