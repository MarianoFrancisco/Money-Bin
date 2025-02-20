export interface Admins {
    "id": number,
    "name": string,
    "role": string,
    "user_name": string,
    "email": string,
    "password": string,
    "phone": string,
    "age": number,
    "dpi_number": string,
    "complete_paperwork_path": string,
    "photo_path": string,
    "gender": string,
    "marital_status": string,
    "signature_path": string,
    "second_password_hash": string,
    "second_password_updated_at": number,
    "created_at": number
}

export interface Employees {
    "id_admin": number,
    "id_user": number,
    "reason": string,
    "created_at": number
}

export interface EliminaList {
    "id": number,
    "id_user": number,
    "reason": string,
    "signature_admin": string,
    "created_at": number,
    "status": string,
    "name_adm": string,
    "phone_adm": string,
    "email_adm": string
}

