const { expect } = require('chai')
const sinon = require('sinon')
const { Recipe } = require('../../src/db')
const { addRecipe } = require('../../src/Helpers/Recipe')
const ERRORS = require('../../src/errors/errors')

describe("addRecipe", () => {
  afterEach(() => {
    sinon.restore()
  })
  it("Should throw a server error if created is false", async () => {
    sinon.stub(Recipe, "findOrCreate").resolves([undefined, false])
    try {
      const [recipe, created] = await addRecipe()
    } catch (err) {
      expect(err).to.deep.equal(ERRORS.serverError("something went wrong"))
    }
  })
})

