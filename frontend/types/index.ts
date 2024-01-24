type IStudent = {
  grade_id: any;
  name: string;
  gender: string;
  religion: string;
  place_birth: string;
  id_or_passport: string;
  nationality: string;
  place_of_issue: string | null;
  date_birth?: string;
  date_exp?: string;
};

type IParent = {
  name: number;
  place_birth: string;
  religion: string;
  date_birth: string;
  occupation: string;
  company_name: string;
  company_address: string;
  home_address: string;
  telephone: string;
  mobilephone: string;
  id_or_passport: string;
  nationality: string;
  phone: string;
  email: string;
};

type IGrade = {
  id: number;
  name: string;
  class: string | null;
  created_at: string;
  updated_at: string | null;
};

type ILogout = {
  code: number;
  msg: string;
};

type RegisterState = {
  loading: boolean;
  error: string | null;
};
