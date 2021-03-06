const mongoose = require("mongoose");
const request = require("supertest");
const { QuestionsSerie } = require("../../models/questionsSerie");

let server;

const data = [
  {
    title: "questionsSerie1",
    author: "author1",
    questions: [
      {
        id: 1,
        question1: "question1",
        answer1: "answer1",
      },
      {
        id: 2,
        question2: "question2",
        answer2: "answer2",
      },
    ],
  },
  {
    title: "questionsSerie2",
    author: "author2",
    questions: [
      {
        id: 1,
        question1: "question1",
        answer1: "answer1",
      },
      {
        id: 2,
        question2: "question2",
        answer2: "answer2",
      },
    ],
  },
];

describe("/api/questionsseries", () => {
  beforeEach(() => (server = require("../../index")));

  afterEach(async () => {
    await server.close();

    await QuestionsSerie.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all questionsSeries", async () => {
      await QuestionsSerie.insertMany(data);

      const res = await request(server).get("/api/questionsseries");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((q) => q.title === "questionsSerie1")).toBeTruthy();
      expect(res.body.some((q) => q.title === "questionsSerie2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a questionsSerie if valid id is passed", async () => {
      const questionsSerie = new QuestionsSerie(data[0]);
      await questionsSerie.save();

      const res = await request(server).get(
        "/api/questionsseries/" + questionsSerie._id
      );

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("title", questionsSerie.title);
    });

    it("should return 404 if an invalid id is passed", async () => {
      const res = await request(server).get("/api/questionsseries/1");
      expect(res.status).toBe(404);
    });

    it("should return 404 if no questionsSeries exist with the given id", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/questionsseries/" + id);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let title;
    let author;
    let question;

    const exec = async () => {
      return await request(server)
        .post("/api/questionsSets")
        .set("x-auth-token", token)
        .send({ title, author, question });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      title = "questionsSet1";
      author = "author1";
      question = { question: "question1", answer: "answer1" };
    });

    it("sould return 401 is user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return the questionsSet if it is valid", () => {
      const res = exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("title", "questionsSet1");
    });
  });
});
