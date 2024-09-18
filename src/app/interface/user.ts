// old
// export interface RegisterFormData {
//   name: string;
//   email: string;
//   password: string | number;
//   type: string;
//   phone_number: number; // make it start with 0
//   //   add the profile pic
// }
export interface RegisterFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  mobileNumber: string;
  parentNumber: string;
  address: string;
  talent: string;
  reachMethod: string;
  artisticExperience: string;
  prevWorkLink?: string;
  photo: File;
}
export interface UserSignupResponse {
  name: string;
  email: string;
  type: string;
  phone_number: number;
  id: number;
  // might be adjusted later
}
export interface loginFormData {
  email: string;
  password: string;
}
export interface UserLoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    type: string;
    phone_number: number;
  };
}
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  type: string;
  phone_number: number;
}
export interface UserVideos {
  id: number;
  title: string;
  video_id: string;
  user_id: number;
  thumbnail_url: string;
  status: 'pending' | 'approved' | 'denied';
}
export interface UserPortfolioResponse {
  user: UserInfo;
  videos: UserVideos[];
}
