import {
  autocompletion,
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import { cpp } from '@codemirror/lang-cpp';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';

import './style.css';

import { cppKeywords } from '../data/data';

export const CodeEditor = ({
  value: initialValue = '',
  onChange,
}: {
  value: string;
  onChange: (value: string, viewUpdate: ViewUpdate) => void;
}) => {
  // Функция для генерации подсказок
  function keywordCompletions(context: CompletionContext): CompletionResult | null {
    const wordBefore = context.matchBefore(/\w*/);

    // Если нет слова перед курсором — не показываем подсказки
    if (!wordBefore) return null;

    // Не предлагаем, если пользователь только что ввёл пробел
    if (wordBefore.from === wordBefore.to && !context.explicit) return null;

    // Фильтруем подсказки по введённому тексту
    const filterText = wordBefore.text.toLowerCase();
    const filtered = cppKeywords
      .filter((keyword) => keyword.toLowerCase().includes(filterText))
      .map((keyword) => ({
        label: keyword,
        type: keyword.startsWith('#') ? 'keyword' : 'variable',
        detail: 'C++ keyword',
      }));

    return {
      // Указываем, откуда начинается замена
      from: wordBefore.from,
      // Список подсказок
      options: filtered,
    };
  }

  return (
    <CodeMirror
      theme={'dark'}
      className={'w-fit'}
      value={initialValue}
      onChange={onChange}
      extensions={[
        cpp(),
        autocompletion({
          activateOnTyping: true,
          defaultKeymap: false,
          override: [keywordCompletions],
        }),
      ]}
    />
  );
};
