/// <reference types="cypress" />

describe("Verify Conduit Homepage", () => {

    beforeEach(() => {

        cy.intercept({
            method : 'GET',
            url : "**/api/tags"
        }, 
        {
            fixture : "tags_response.json"
        }).as("tagsApi")

       cy.loginToApp("nimisha@abc.com", "abc@123")
    })

    it("Verify Tags on Homepage", ()=>{


        cy.get(".tag-list").should('contain', 'Cypress').and('contain', "Rest Assured").and('contain', "Selenium")

    })

    it("Add Article", () => {

        cy.contains("a", "New Article").click()

        cy.get('[placeholder="Article Title"]').type("Article on cypress via cypress")

        cy.get('[placeholder="What\'s this article about?"]').type("Article on cypress - Intercept")

        cy.get('[placeholder="Write your article (in markdown)"]').type("Article on cypress - Intercept")

        cy.contains("button", "Publish Article").click()


    })

    it("Verify article list", ()=>{

        cy.intercept({
            method: 'GET',
            url: "**/api/articles*"

        }, {
            fixture : "articles_response.json"
        }).as("getArticles")

        cy.contains("Global Feed").click()

        cy.wait("@getArticles")

        cy.get("@getArticles").then(xhr => {

            console.log(xhr)
        })
    })


    it.only("Verify add article and intercept", ()=>{

        cy.intercept({
            method: 'POST',
            url: "**/api/articles*"

        }, (req) => {
            req.body.article.description = "This is a request description"
        }
        
        ).as("postArticle")

        cy.contains("a", "New Article").click()

        cy.get('[placeholder="Article Title"]').type("Article on cypress via cypress")

        cy.get('[placeholder="What\'s this article about?"]').type("Article on cypress - Intercept")

        cy.get('[placeholder="Write your article (in markdown)"]').type("Article on cypress - Intercept")

        cy.contains("button", "Publish Article").click()

        cy.wait("@postArticle")

        cy.get("@postArticle").then(xhr => {
            console.log(xhr)

            expect(xhr.request.body.article.description).to.equal("This is a request description")
        })

        
    })

    it.only("Verify add article and intercept response", ()=>{

        cy.intercept({
            method: 'POST',
            url: "**/api/articles*"

        }, (req) => {

            req.reply(res => {
                res.body.article.description = "This is a response description"
            })
            
        }
        
        ).as("postArticle")

        cy.contains("a", "New Article").click()

        cy.get('[placeholder="Article Title"]').type("Article on cypress via cypress")

        cy.get('[placeholder="What\'s this article about?"]').type("Article on cypress - Intercept")

        cy.get('[placeholder="Write your article (in markdown)"]').type("Article on cypress - Intercept")

        cy.contains("button", "Publish Article").click()

        cy.wait("@postArticle")

        cy.get("@postArticle").then(xhr => {
            console.log(xhr)

            expect(xhr.response.body.article.description).to.equal("This is a response description")
        })

        
    })

})