import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private secretKey = 'techgeeknext';

  constructor() { }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  }
  getUsernameFromToken(token: string): string {
    const decodedToken: any = this.decodeToken(token);
    return decodedToken ? decodedToken.username : null;
  }

  removeToken(): void{
    sessionStorage.removeItem("token");
  }
}
