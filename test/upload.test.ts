import request from "supertest";
import path from "path";
import { app } from "../server";

describe("POST /upload", () => {
  it("should upload an image successfully", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("image", path.resolve(__dirname, "../public/product.jpg"))
      .attach("image", path.resolve(__dirname, "../public/product.jpg"));

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Images uploaded successfully");
  });
});
