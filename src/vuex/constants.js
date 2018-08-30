/*公用常量*/

export const APP_PHONE_REG=/^1[3|4|5|7|8][0-9]{9}$/;//手机号正则
export const APP_EMAIL_REG=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//邮箱正则
export const APP_PWD_REG=/^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,12}$/;//密码正则
