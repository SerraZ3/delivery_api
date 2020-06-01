# Instruções

## Comando migrations

**Supõe-se que você está com a conexão com seu BD funcionando.**

### Roda as migrations

```shelscript
adonis migration:run
```

### Desfaz ultimo "migration:run"

```shelscript
adonis migration:rollback
```

### Reinicia BD

É como se ele rodasse o `run` e depois o `rollback`

```shelscript
adonis migration:refresh
```

### Reseta o BD

Ele desfaz todos os `run`

```shelscript
adonis migration:reset
```

### Mostra status do BD

Ele desfaz todos os `run`

```shelscript
adonis migration:status
```

### Force

Pode-se colocar o `--force` no final dos comandos para força aquele comando ignorando warning. A depender da alteração pode não funcionar

## Padrão de escrita de arquivo

- Todas as tabelas não criadas puras, ou seja, sem relacionamentos, elas não possuem coluna da foreign ou a sua constrain;
- Todo o relacionamento é criado após suas tabelas base estarem criadas;
- Todo relacionamento `N para N` é criado uma tabela após as tabelas bases estarem criadas

### Padrão de nome de tabela

O comando para gerar migrations é:

```shellscript
adonis make:migration nome <parametros>
```

- Todo o nome deve ser singular. O adonis deixa o nome dos arquivos em singular e o nome da tabela no plural.
- Nome compostos devem ser interligados por `_` Ex: `product category` => `product_category`
- Nomes compostos devem ser totalmente no singular. Quando eles forem convertidos para o nome da tabela eles ficarão somente com a segunda palavra no singular, assim `product_category` => `product_categories`
- Migrations para relacionamento de `1 para n` e `1 para 1` deve ser feitas com a `--action` de `select` e as demais com a de `create`. ex:

```schellscript
# Create
adonis make:migration order --action create

# Select
adonis make:migration order_product --action select
```

### Padrão de escrita do arquivo

Por padrão o Adonis geral o nome do arquivo da seguinte forma: `1535124124234_{nome_tabela}_schema.js`. Onde os primeiros números é o timestamp atual, seguido pelo nome da tabela e finalizando escrito por "schema.js".

Nosso padrão só altera os números do arquivo. Ao invés de por o timestamp colocamos nosso padrão.

O padrão é composto por 13 digitos. O 1º dígito representa o que aquela tabela significa. Ou seja, `0` para tabela puras (sem relacionamentos somente atributos), `1` para alteração por relacionamentos `1 para 1` ou `1 para N`, `2` para relacionamentos `N para N` e `3` para `Viwes`. Exemplo:

Migrations de tabelas puras:

```
0000000001000_user_schema.js
0000000001100_token_schema.js
0000000003000_person_schema.js
0000000004000_address_schema.js
0000000004100_city_schema.js
```

Elas são diferenciadas a partir do 4º digito da direita para esquerda. No 3º digito da direita para esquerda é usada para tabelas que so existem por conta de outra. Ou seja, os token fazem parte do usuário. O city faz parte do address. O person não depende de nenhum deles, por isso seu 3º digito permanece o mesmo.

Após o digito chegar ao 9, se for um diferenciador (digito 4º), anda-se para esquerda ficando dessa forma:

```
0000000001000_user_schema.js Antes
0000000010000_user_schema.js Depois
0000000011000_user_schema.js Depois
0000000100000_user_schema.js Depois
```

Após o digito chegar ao 9, se for um relacionador (digito 3º), anda-se para esquerda ficando dessa forma:

```
0000000001100_user_schema.js Antes
0000000001110_user_schema.js Depois
0000000001120_user_schema.js Depois
0000000001111_user_schema.js Depois
```

Migrations de relacionamento

```
1000000001000_person_user_schema.js
1000000001100_person_address_schema.js
1000000003000_address_city_schema.js
```

Migrations de relacionamento n para n

```
2000000001000_product_product_category_schema.js
2000000002000_product_image_schema.js
2000000003000_product_category_image_schema.js
```

Obs: Eles não possuem o 3º digito relacionador.

Migrations de View

```
3000000001000_total_price_schema.js
3000000002000_total_sold_schema.js
```

Obs: Eles não possuem o 3º digito relacionador.
