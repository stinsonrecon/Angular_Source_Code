export class LoginRequest {
    username: string;
    password: string;
    // accountType: AccountType;
    // rememberMe: boolean;
}

enum AccountType {
    HeThong,
    Domain    
}
