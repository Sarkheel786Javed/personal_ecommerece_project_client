export interface SignupModel {
    userName?: String,
    email?: String,
    password?: String,
    addressLine1?: String,
    phoneNumbber?: String,
    city?:String
    country?:String,
    answer: String,
}
export interface LoginModel {
    email?: String,
    password?: String,

}
export interface ForgetModel {
    answer: String,
    email?: String,
    password?: String,

}