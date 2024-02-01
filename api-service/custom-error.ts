import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export class ResponseError {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  static BadRequest(message: string) {
    return new NextResponse(`Bad Request: ${message}`, {
      status: 400,
    });
  }

  static Unauthorized() {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  static NotMatchesRole(allowRole: Role | Role[]) {
    return new NextResponse(`Not correct role. This page allow: ${allowRole}`, {
      status: 403,
    });
  }

  static NotFound(message: string) {
    return new NextResponse(`Not Found: ${message}`, {
      status: 404,
    });
  }

  static AccountExistsAlready() {
    return new NextResponse("Email already exists", {
      status: 409,
    });
  }

  static InternalServer() {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
