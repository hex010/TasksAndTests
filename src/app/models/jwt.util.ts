export class JwtUtils {

    private static extractToken(): string | null {
        return localStorage.getItem('token');
    }

    static extractIdFromToken(): number | null {
        const token = this.extractToken();
        if (!token) {
          return null;
        }
    
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          return null;
        }
    
        try {
          const payload = window.atob(tokenParts[1]);
          const parsedPaylod = JSON.parse(payload);
          return parsedPaylod.id || null;
        } catch (error) {
          console.error('Error parsing JWT payload:', error);
          return null;
        }
      }
}