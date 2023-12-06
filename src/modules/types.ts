export interface AdminRequestbody {
  username: string;
  lastname: string;
  password: string;
  newPassword: string;
}
export interface UserRequestbody {
  username: string;
  lastname: string;
  password: string;
  newPassword: string;
}
export interface ProductBody {
  [x: string]: any;
  productName: string;
  model: string;
  price: number;
  color: string;
  count: number;
  nfc: string;
  ekran_chastotasi: string;
  protsessor: string;
  old_kamera: string;
  orqa_kamera: string;
  sim_karta_formati: string;
  sim_kartalar_soni: number;
  operatsion_system_version: string;
  aloqa_standarti: string;
  bluetooth_standarti: string;
  vazn: string;
  batary_power: string;
  ekran_nisbati: string;
  ekran_texnologiyasi: string;
  ekran_size: string;
  doimiy_xotira: string;
  operativ_xotira: string;
  description: string;
}

export interface Order {
  sold_count: number,
  username: string, 
  phone_number: string,
  viloyat: string,
  tuman:string,
  yetkazish_narxi: string,
  aholi_punkti:string,
  manzil:string,
  moljal:string,
  description:string,
  enum: OrderStatus ,
}

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Completed = 'completed',
  Cancelled = 'cancelled', 
}




/*
ALTER TABLE "carts"
ADD CONSTRAINT "carts_userId_fkey1" FOREIGN KEY ("userId")
REFERENCES "users" (id) MATCH SIMPLE
ON DELETE CASCADE;




*/