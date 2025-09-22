import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { RGB } from '@/shared/lib/types';

import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnvironment = (): 'development' | 'github' | 'production' | string => {
  // Client
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    }
    if (hostname.endsWith('github.io')) {
      return 'github';
    }
    return 'production';
  }

  // Server / Production
  return process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV;
};

/**
 * Конвертирует HEX-цвет в объект с числами R, G, B.
 * Поддерживает форматы: #RRGGBB и #RGB
 *
 * @param hex - Строка с HEX-цветом (например, '#ff0000', '#f00')
 * @returns Объект с r, g, b значениями (0-255)
 * @throws Ошибка, если строка не является валидным HEX-цветом
 */
export const hexToRgb = (hex: string): RGB | null => {
  // Удаляем #, если есть
  const cleaned = hex.replace(/^#/, '');

  let r: number, g: number, b: number;

  // Формат #RGB (3 символа)
  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  }
  // Формат #RRGGBB (6 символов)
  else if (cleaned.length === 6) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  }
  // Неверный формат
  else {
    // throw new Error('Неверный формат HEX-цвета. Используйте #RGB или #RRGGBB');
    return null;
  }

  // Проверка на валидность
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    // throw new Error('HEX-строка содержит недопустимые символы');
    return null;
  }

  return { r, g, b };
};
