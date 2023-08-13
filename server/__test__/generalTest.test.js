const request = require("supertest");
//const app=require('../server')

const baseURL = "http://127.0.0.1:3006";

describe("Login api test", () => {
  it("should return 200", async() => {
    const userCredential = { email: "abc@gmail.com", password: "12345aaa" };
    const response = await request(baseURL).post("/login").send(userCredential);
    const authenticationMsg = response.body.message;
    expect(response.statusCode).toBe(200);
    expect(authenticationMsg).toBe("Authentication Successful!");
    //done()
  });
});

// describe("Registeration api test", () => {
//     it("should return 200", async() => {
//       const newUserData={
//         first_name:"Rupali",
//         last_name:"Banerjee",
//         email:"rupali.banerjee.sb@gmail.com",
//         password:"pass@123",
//         address_1:"",
//         address_2:"",
//         contact_no:"12345678",
//         role:"student",
//         user_id:"2117280011"
//       }
//       const response = await request(baseURL).post("/createNewUser").send(newUserData);
//       expect(response.statusCode).toBe(200);
//       // const authenticationMsg = response.body.message;
//       // expect(authenticationMsg).toBe("Authentication Successful!");

//     });
//   });

/* Profile update api call test */
describe("profile update api test", () => {
  it("should return 200", async() => {
    const userInfo = {
      profileData: {
        first_name: "Rupali",
        last_name: "Banerjee",
        email: "rupali.banerjee@gmail.com",
        contact_no: "123456789",
        address_1: "TW148LH",
        address_2: "",
      },
    };
    const response = await request(baseURL)
      .post("/updateProfile/data")
      .send(userInfo);
    
    const msg = response.body.acknowledged;
    expect(response.statusCode).toBe(200);
    expect(msg).toBe(true);
    //done()
  });
});
