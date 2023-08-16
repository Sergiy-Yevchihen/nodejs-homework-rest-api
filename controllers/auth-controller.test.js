

const request = require("supertest");
const app = require("../app"); 
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("Login Controller", () => {
    let user;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash("testpassword", 10);
        user = await User.create({
            email: "test@example.com",
            password: hashedPassword,
            subscription: "basic",
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it("should return a token and user information on successful login", async () => {
        const response = await request(app)
            .post("/users/login") 
            .send({
                email: "test@example.com",
                password: "testpassword",
            })
            .expect(200);

        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("email", "test@example.com");
        expect(response.body.user).toHaveProperty("subscription", "basic");

        const decodedToken = jwt.verify(
            response.body.token,
            process.env.SECRET_KEY
        );
        expect(decodedToken.id).toEqual(user._id.toString());
    });
});
//   it("should return 401 when email or password is wrong", async () => {
//     await request(app)
//       .post("/users/login") // Перевірте правильний шлях до вашого логін роуту
//       .send({
//         email: "test@example.com",
//         password: "wrongpassword",
//       })
//       .expect(401);
//   });

//   it("should return 400 when email or password is missing", async () => {
//     await request(app)
//       .post("/users/login") // Перевірте правильний шлях до вашого логін роуту
//       .send({})
//       .expect(400);

//     await request(app)
//       .post("/users/login") // Перевірте правильний шлях до вашого логін роуту
//       .send({
//         email: "test@example.com",
//       })
//       .expect(400);

//     await request(app)
//       .post("/users/login") // Перевірте правильний шлях до вашого логін роуту
//       .send({
//         password: "testpassword",
//       })
//       .expect(400);
//   });
// });

// const request = require("supertest");
// const app = require("../app"); // Шлях до вашого express додатку

// describe("Auth Controller", () => {
//   it("should return a valid token, user object, and status code 200 on successful login", async () => {
//     const userCredentials = {
//       email: "test@example.com",
//       password: "testpassword",
//     };

//     const response = await request(app)
//       .post("/users/login")
//       .send(userCredentials);

//     expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("token");
    // expect(response.body).toHaveProperty("user");
    // expect(response.body.user).toHaveProperty("email", userCredentials.email);
    // expect(response.body.user).toHaveProperty("subscription");

//     // You can also store the token for further authenticated requests
//     const token = response.body.token;

//     // You can then use the token for subsequent requests that require authentication
//     const authenticatedResponse = await request(app)
//       .get("/users/current")
//       .set("Authorization", `Bearer ${token}`);

//     expect(authenticatedResponse.status).toBe(200);
//     expect(authenticatedResponse.body).toHaveProperty(
//       "email",
//       userCredentials.email
//     );
//     expect(authenticatedResponse.body).toHaveProperty("subscription");
//   });

//   it("should return status code 401 on invalid login credentials", async () => {
//     const invalidUserCredentials = {
//       email: "test@example.com",
//       password: "wrongpassword",
//     };

//     const response = await request(app)
//       .post("/users/login")
//       .send(invalidUserCredentials);

//     expect(response.status).toBe(401);
//   });
// }, 20000);

