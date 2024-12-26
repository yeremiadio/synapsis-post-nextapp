import Cookies from 'js-cookie'

// Define a type for the options object for cookie configuration
interface CookieOptions {
  expires?: number | Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

class CookieManager {
  // Add a single cookie
  addCookie(name: string, value: string, options?: CookieOptions): void {
    Cookies.set(name, value, options)
  }

  // Remove a single cookie
  removeCookie(name: string, options?: CookieOptions): void {
    Cookies.remove(name, options)
  }

  // Add multiple cookies with a generic type parameter
  addCookies<T extends Record<string, string>>(
    cookies: T,
    options?: CookieOptions,
  ): void {
    for (const [name, value] of Object.entries(cookies)) {
      this.addCookie(name, value, options)
    }
  }

  // Remove multiple cookies with a generic type parameter
  removeCookies<T extends keyof any>(
    names: T[],
    options?: CookieOptions,
  ): void {
    for (const name of names) {
      this.removeCookie(name as string, options)
    }
  }

  // Clear all cookies
  clearAllCookies(options?: CookieOptions): void {
    const allCookies = this.getAllCookies()
    for (const name in allCookies) {
      this.removeCookie(name, options)
    }
  }

  // Get a single cookie by name
  getCookie(name: string): string | undefined {
    return Cookies.get(name)
  }

  // Get multiple cookies by an array of names
  getCookies<T extends string>(names: T[]): Record<string, string | undefined> {
    const cookies: Record<string, string | undefined> = {}
    for (const name of names) {
      cookies[name] = this.getCookie(name)
    }
    return cookies
  }

  // Get all cookies
  getAllCookies(): Record<string, string> {
    return Cookies.get()
  }
}

export default CookieManager
