type payloadLogin = {
  email: string;
  password: string;
};

type payloadRegister = {
  name: string;
  email: string;
  password: string;
  relation: string;
};

type payloadVerify = {
  otp: number;
};

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
  relation?: string;
  name: string;
  place_birth: string;
  religion: string;
  date_birth: string;
  occupation?: string;
  company_name?: string;
  company_address?: string;
  home_address: string;
  telephone?: string;
  mobilephone: string;
  id_or_passport: string;
  nationality: string;
  phone?: string;
  email: string;
};

type IBs = {
  brotherOrSisterName1: string;
  brotherOrSisterBirth_date1: string;
  brotherOrSisterGrade1: string;
  brotherOrSisterName2?: string;
  brotherOrSisterBirth_date2?: string;
  brotherOrSisterGrade2?: string;
  brotherOrSisterName3?: string;
  brotherOrSisterBirth_date3?: string;
  brotherOrSisterGrade3?: string;
  brotherOrSisterName4?: string;
  brotherOrSisterBirth_date4?: string;
  brotherOrSisterGrade4?: string;
  brotherOrSisterName5?: string;
  brotherOrSisterBirth_date5?: string;
  brotherOrSisterGrade5?: string;
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
