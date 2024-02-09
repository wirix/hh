import { Role } from "@prisma/client";

export class UserDto {
  email: string;
  id: string;
  role: Role;
  exp: number;
  iat: number;

  constructor(model: any) {
    this.email = model.email;
    this.id = model.id;
    this.role = model.role;
    this.exp = model.exp;
    this.iat = model.iat;
  }
}
