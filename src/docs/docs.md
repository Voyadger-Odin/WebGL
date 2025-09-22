# Нотация написания кода

Свод рекомендаций по написанию кода

## Комментарии

Комментарии вообще следует не использовать, но есть некоторые исключения:

1. Если нужно пометить сложный блок кода
2. Если нужно временно закомментировать бблок кода. В таком случае необходимо написать `TODO`, в котором указать, когда следует раскомментировать этот код

```typescript
// TODO: раскомментировать, когда ...
// const a = 5;
```

3. Если надо пометить плохой блок кода

```typescript
// TODO: временное решение для отладки
console.log(data);
```

## TypeScript

1. Не использовать тип any
2. В конце каждой команды или блока ставить `;`

### Нейминг

1. Все типы начинать с заглавной `T`

```typescript
export type TSomeType = {
   ...
};
```

2. Все интерфейсы начинать с заглавной `I`

```typescript
export interface ISomeInterface {
   ...
};
```

3. Boolean переменные/константы начинать с префикса `is`

```typescript
const isShowButton = true;
```

## Стили

### Tailwind + cn

1. При использовании классов tailwind разделять на логические блоки одного типа классов.
   Группировать следующие типы: `width / height`, `стили текста`, `стили блока`, `position`, `padding / margin`, `flex / grid`

```typescript jsx
return (
   <div
      className={cn(
         'w-full h-full',
         'text-red font-bold',
         'rounded-full border bg-dark',
         'absolute top-0 left-0',
         'p-4 m-4',
         'flex flex-col gap-[0.375rem] justify-center items-center',
      )}
   >
    ...
   </div>
);

```

2. Для размеров использовать `rem`, а не `px` (1rem = 16px)

```typescript jsx
return (
   <div
      className={cn(
         'w-[5.5rem] h-[0.875rem]',
      )}
   >
    ...
   </div>
);
```
