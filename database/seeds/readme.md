# Instruções

## Comando seed

**Supõe-se que você está com a conexão com seu BD funcionando.**

### Roda as seed

```shelscript
adonis seed
```

### Roda apenas uma seed

```shelscript
adonis seed --files 000018_CouponSeeder.js
```

## Padrão de escrita de arquivo

- O nome da `seed` deve estar no singular
- Toda `seed` deve começar com um número de 5 digitos, `_` e depois o nome da seed
- Os 5 digitos são em ordem crescente

O comando para criar um seed é

```shellscript
adonis make:seed nome
```
