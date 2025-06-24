// Interfaces de tipos
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  expires_in: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
  [key: string]: unknown;
}

// Configuración de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class AuthServiceClass {
  private token: string | null = null;

  constructor() {
    // Cargar token del localStorage al inicializar
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  // Verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return true;
      } else {
        // Token inválido, limpiar
        this.clearToken();
        return false;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
  }

  // Obtener usuario actual
  async getCurrentUser(): Promise<User | null> {
    if (!this.token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        this.clearToken();
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  // Iniciar sesión con Google
  async signInWithGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Cargar la biblioteca de Google
      if (typeof window === 'undefined') {
        reject(new Error('Google Sign-In solo funciona en el navegador'));
        return;
      }

      // Verificar si Google está disponible
      if (!window.google) {
        reject(new Error('Google SDK no cargado'));
        return;
      }

      // Inicializar Google Sign-In
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          try {
            await this.handleGoogleResponse(response.credential);
            resolve();
          } catch (error) {
            reject(error);
          }
        },
      });

      // Mostrar el prompt de Google
      window.google.accounts.id.prompt();
    });
  }

  // Manejar respuesta de Google
  private async handleGoogleResponse(googleToken: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (response.ok) {
        const authData: AuthResponse = await response.json();
        this.setToken(authData.token);
        
        // Emitir evento de login
        window.dispatchEvent(new CustomEvent('auth:login', { detail: authData }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en autenticación');
      }
    } catch (error) {
      console.error('Error en autenticación con Google:', error);
      window.dispatchEvent(new CustomEvent('auth:error', { detail: error }));
      throw error;
    }
  }

  // Cerrar sesión
  async signOut(): Promise<void> {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
      this.clearToken();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  }

  // Enviar mensaje al chatbot
  async sendMessage(message: string): Promise<{ message: string; [key: string]: unknown }> {
    if (!this.token) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error enviando mensaje');
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    }
  }

  // Obtener historial de chat
  async getChatHistory(limit: number = 50): Promise<ChatMessage[]> {
    if (!this.token) {
      return [];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/chat/history?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.messages || [];
      } else {
        console.error('Error obteniendo historial de chat');
        return [];
      }
    } catch (error) {
      console.error('Error obteniendo historial de chat:', error);
      return [];
    }
  }

  // Métodos privados para manejar el token
  private setToken(token: string): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Obtener token actual
  getToken(): string | null {
    return this.token;
  }
}

// Instancia singleton del servicio
export const authService = new AuthServiceClass();

// Tipos para Google Sign-In (para TypeScript)
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string | undefined; callback: (response: { credential: string }) => void }) => void;
          prompt: () => void;
        };
      };
    };
  }
} 