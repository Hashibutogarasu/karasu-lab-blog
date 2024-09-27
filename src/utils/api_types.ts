import { Post, User } from "@prisma/client";
import { CamelToSnake } from "snake-camel-types";

export type CamelUser = CamelToSnake<Post>;