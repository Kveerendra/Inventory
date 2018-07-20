export class User {
  username: string;
  role: string;
  password: string;

  name: string;
  pincode: string;
  location: string;
  district: string;
  partner: string;

  constructor(username = '', role = '', password= '', name= '', pincode= '', location= '', district= '', partner= '') {
    this.username = username;
    this.role = role;
    this.password = password;
    this.name = name;
    this.pincode = pincode;
    this.location = location;
    this.district = district;
    this.partner = partner;
  }
}
