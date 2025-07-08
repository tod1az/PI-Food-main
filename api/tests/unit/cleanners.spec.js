const { expect } = require('chai')
const { dbRecipeCleaner, recipeCleaner } = require('../../src/Helpers/Cleanners')
const { getAllRecipesFromApi } = require('../../src/Helpers/Recipe')
const recipesFromApi = require('../../src/allApiRecipes')
describe("dbRecipeCleaner", () => {
  it("Should transform the diets to the correct structure ", () => {
    const input = {
      dataValues: {
        "diets": [
          {
            "name": "gluten free"
          },
          {
            "name": "dairy free"
          }
        ]
      }
    }
    const expectedOutput = {
      "diets": [
        "gluten free",
        "dairy free"
      ]
    }

    const output = dbRecipeCleaner(input)

    expect(output).to.deep.equal(expectedOutput)
  })
})

describe("recipeCleaner", () => {

  it("Should dispose all non relevant data", () => {
    const input = recipesFromApi[0]
    const expectedOutput = {
      "id": 782585,
      "name": "Cannellini Bean and Asparagus Salad with Mushrooms",
      "image": "https://spoonacular.com/recipeImages/782585-312x231.jpg",
      "summary": "Cannellini Bean and Asparagus Salad with Mushrooms requires approximately 45 minutes from start to finish. This main course has 482 calories, 31g of protein, and 6g of fat per serving. This gluten free, dairy free, lacto ovo vegetarian, and vegan recipe serves 6 and costs $1.35 per serving. 309 people were impressed by this recipe. Head to the store and pick up grain mustard, sea salt, lemon zest, and a few other things to make it today. It is brought to you by foodandspice.blogspot.com. Taking all factors into account, this recipe earns a spoonacular score of 70%, which is pretty good. Similar recipes are Cannellini Bean Salad, Refreshing Cannellini Bean Salad, and Cannellini-and-Green Bean Salad.",
      "healthScore": 100,
      "steps": [
        "Rinse the cannellini beans and soak for 8 hours or overnight in several inches of water.",
        "Drain and rinse, then transfer to a medium saucepan and cover with fresh water.",
        "Add the curry leaves or bay leaf and bring to a boil. Reduce heat to medium-low, cover, and simmer for 1 hour or until the beans are tender but not falling apart.",
        "Drain and transfer to a large salad bowl.Meanwhile, snap the woody ends off of the asparagus spears and steam the spears for 6 minutes or until just tender but still retaining their crunch.",
        "Transfer to the salad bowl.Now cook the mushrooms.",
        "Heat the oil in a large skillet over high heat. As soon as the oil is hot, drop in the mushrooms and cook, stirring constantly, for 5 minutes or until the mushrooms begin to brown and lose some of their liquid.",
        "Transfer to the bowl with the asparagus.To make the dressing, combine the tarragon, lemon zest, garlic, lemon juice, olive oil and mustard in a small food processor or blender. Process until smooth.",
        "Pour the dressing over the salad, season with salt and pepper, and toss.",
        "Serve at room temperature or chilled."
      ],
      "diets": [
        "gluten free",
        "dairy free",
        "lacto ovo vegetarian",
        "vegan",
        "vegetarian"
      ]
    }

    const output = recipeCleaner(input)

    expect(output).to.deep.equal(expectedOutput)

  })
})
