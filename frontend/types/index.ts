type IStudent = {
  grade_id: string;
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
