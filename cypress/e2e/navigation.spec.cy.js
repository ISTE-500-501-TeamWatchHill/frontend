/// <reference types="cypress" />
//yarn run cypress open --> command to run Cypress

describe('Navigation', () => {

    //HOME --> TOURNAMENT ABOUT
    it('navigate from home to tournament about', () => {
        cy.visit('localhost:3000');

        cy.get('#tournament .dropdown').trigger('mouseenter')
        cy.get('#tournament .dropdown-items').invoke('show')

        cy.get('#tournament .dropdown-items #tournament_sub').click()
        cy.url().should('include', '/tournament')
    })


    //HOME --> TOURNAMENT SCHEDULE
    it('navigate from home to tournament schedule', () => {
        cy.visit('localhost:3000');

        cy.get('#tournament .dropdown').trigger('mouseenter')
        cy.get('#tournament .dropdown-items').invoke('show')

        cy.get('#tournament .dropdown-items #schedule_sub').click()
        cy.url().should('include', '/schedule')
    })


    //HOME --> TEAMS AND UNIVERSITIES
    it('navigate from home to teams and universities', () => {
        cy.visit('localhost:3000');

        cy.get('#teamsanduniversities').click()
        cy.url().should('include', '/teamsanduniversities')

        //TEAMS AND UNIVERSITIES --> TEAM
        //TEAMS AND UNIVERSITIES --> UNIVERSITY
    })


    //HOME --> AARDVARK GAMES ABOUT
    it('navigate from home to aardvark games about', () => {
        cy.visit('localhost:3000');

        cy.get('#aardvarkgames .dropdown').trigger('mouseenter')
        cy.get('#aardvarkgames .dropdown-items').invoke('show')

        cy.get('#aardvarkgames .dropdown-items #aardvarkgames_sub').click()
        cy.url().should('include', '/aardvarkgames')
    })


    //HOME --> AARDVARK GAMES BOARD GAME
    it('navigate from home to aardvark games board game', () => {
        cy.visit('localhost:3000');

        cy.get('#aardvarkgames .dropdown').trigger('mouseenter')
        cy.get('#aardvarkgames .dropdown-items').invoke('show')

        cy.get('#aardvarkgames .dropdown-items #boardgame_sub').click()
        cy.url().should('include', '/boardgame')
    })
})