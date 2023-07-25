<h1>Api Proteo (NodeJs y Socket.io) 
<img src="https://rocketraccoon.es/img/Iconos/proteo-icon.png" style="width:30px; heigth:30px"></h1>
<p align="left">
   <img src="https://img.shields.io/badge/Status-En%20Desarrollo-green">
</p>

Elaboracion de Una api con NodeJS y socket.io, esto es parte del conjunto de proyectos de la app Proteo.


## Autor

- [@FranchescoSR](https://www.github.com/FranchescoSR)


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
