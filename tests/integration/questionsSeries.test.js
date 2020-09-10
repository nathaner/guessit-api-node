const mongoose = require("mongoose");
const request = require("supertest");
const QuestionsSerie = require("../../models/questionsSerie");

let server;

describe("/api/questionsseries", () => {
  beforeEach(() => (server = require("../../index")));

  afterEach(async () => {
    await server.close();

    await QuestionsSerie.remove({});
  });

  describe("GET /", () => {
    it("should return all questionsSeries", async () => {
      const questionsSeries = [
        {
          id: 1,
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
          id: 2,
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

      await QuestionsSerie.insertMany(questionsSeries);

      const res = await request(server).get("/api/questionsseries");

      expect(res.status).toBe(200);
    });
  });
});
