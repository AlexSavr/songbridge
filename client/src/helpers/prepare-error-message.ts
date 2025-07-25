const errorMessages = {
  ru: {
    'Failed to fetch': 'Произошла ошибка при получении данных',
    'fetch failed': 'Произошла ошибка при получении данных',
    'Failed to fetch room data': 'Произошла ошибка при получении данных комнаты',
    'An unknown error occurred': 'Произошла неизвестная ошибка',
    'The server is unavailable. Try again later': 'Сервер недоступен. Попробуйте позже.',
    'Room not found': 'Комната не найдена',
  },
  en: {}
} as const;

type Language = keyof typeof errorMessages;

function prepareErrorMessage(message: string, language?: Language): string {
  let lang = 'ru' as Language;
  if(language) {
    lang = (language in errorMessages ? language : 'ru') as keyof typeof errorMessages;
  }
  return (errorMessages[lang] as Record<string, string>)[message] || message;
}

export default prepareErrorMessage;