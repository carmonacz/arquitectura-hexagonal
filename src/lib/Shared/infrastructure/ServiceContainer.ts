import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserEdit } from "../../User/application/UserEdit/UserEdit";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { InMemoryUserRepository } from "../../User/infrastructure/InMemoryUserRepository";
import { TemaGetAll } from "../../Temas/aplicacion/TemaGetAll/TemaGetAll";
//import { InMemoryTemaRepository } from "../../Temas/infraestructure/InMemoryTemaRepository";
import { TemaGetOneById } from "../../Temas/aplicacion/TemaGetOneById/TemaGetOneById";
import { TemaCreate } from "../../Temas/aplicacion/TemaCreate/TemaCreate";
import { TemaEdit } from "../../Temas/aplicacion/TemaEdit/TemaEdit";
import { TemaDelete } from "../../Temas/aplicacion/TemaDelete/TemaDelete";
import { MysqlTemaRepository } from "../../Temas/infraestructure/MysqlTemaRepository";

const userRepository = new InMemoryUserRepository();
const temaRepository = new MysqlTemaRepository();

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    getOneById: new UserGetOneById(userRepository),
    create: new UserCreate(userRepository),
    edit: new UserEdit(userRepository),
    delete: new UserDelete(userRepository),
  },

  tema: {
    getAll: new TemaGetAll(temaRepository),
    getOneById: new TemaGetOneById(temaRepository),
    create: new TemaCreate(temaRepository),
    edit: new TemaEdit(temaRepository),
    delete: new TemaDelete(temaRepository),
  },
};
