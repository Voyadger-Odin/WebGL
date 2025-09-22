# Команды GIT

---

## Переключить ветку и влить изменения в неё

```shell
git checkout -b feat/DIG-5535
```

```shell
git add -A
```

```shell
git commit -m "feat(DIG-5535): write new storybook stories"
```

```shell
git push -u origin HEAD
```

---

## Если надо внести изменения в комит

```shell
git add -A
```

```shell
git commit --amend --no-edit
```

```shell
git push -f
```

---

## Создать трубу

```shell
git checkout develop-next
```

```shell
git pull
```

```shell
git checkout test/qa-dev
```

```shell
git pull
```

```shell
git merge develop-next
```

```shell
git tag <целевая версия>-<номер новой сборки (посмотреть на номер предыдущей трубы и прибавить 1)>-dev (пример: git tag 1.22.0-200-dev)
```

```shell
git push -u origin HEAD
```

```shell
git push --tags
```

---

## Сделать ребейз

Сначала спулить свежую версию `develop`

```shell
checkout <your_branch»
```

```shell
git rebase develop
```

`fix conficts`

```shell
git add -A
```

```shell
git rebase --continue
```

```shell
git push origin PX-138 --force-with-lease
```

---

## Переиминовать ветку, даже если уже отправил

```shell
git branch -m <старое_название> <новое_название>
```

```shell
git push origin <старое_название> <новое_название>
```

---

## stash

### Если надо переключиться на другую ветку, но мешают текущие изменения

```shell
git stash
```

### Вернуть изменения после переключения на ветку

```shell
git stash apply
```

---

## Переименовать ветку

### Переименовать текущую локальную ветку

```shell
git branch -m <newname>
```

### Переименовать произвольную локальную ветку

```shell
git branch -m <oldname> <newname>
```

---

...
